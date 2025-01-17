<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class login extends MY_Controller {

    function __construct() {
        parent::__construct();

        $this->load->model('model_user');
        $this->load->model('model_user_token');
        $this->load->model('model_operation');
        $this->load->model('model_login_info');
        $this->load->model('model_block_ip_list');
        $this->load->helper('url');
        $this->load->driver('cache');
    }

    public function index() {
        $mapData = array();
        if (isset($_SESSION['acc'])) {
            $mapData['acc'] = $_SESSION['acc'];
        }
        if (isset($_SESSION['pass'])) {
            $mapData['pass'] = $_SESSION['pass'];
        }
        $this->View('login_black_front', $mapData);

        /*
          echo '<script>
          var webroot = "'. base_url() .'";
          </script>';
          //載網站根目錄，for js path
          $header['base_url'] = base_url();
          $this->load->view('admin/admin_header',$header);
          $this->load->view('login_black_front',$mapData);
          $this->load->view('admin/admin_footer');
         */
    }
    function noauto(){
        $mapData = array();
        if (isset($_SESSION['acc'])) {
            $mapData['acc'] = $_SESSION['acc'];
        }
        if (isset($_SESSION['pass'])) {
            $mapData['pass'] = $_SESSION['pass'];
        }
        $this->View('login_black_front_no_auto', $mapData);

    }

    public function token() {
//        if ( !isset($_SESSION['user']) ) return ;
        $token = $this->input->get_post('token', TRUE);
        $admin = $this->input->get_post('admin', TRUE);
        $si = $this->input->get_post('si', true);
        $user = $this->model_operation->getUser($token);
        //這裡作後台使用者操作前台使用者的事情
        //2017/10/30 by Magus
        $control_id = $user['control_uid'];
        if ($user['inherit_id'] > 0) {
            $adm_uid = $user['adm_uid'];
            $user = $this->model_operation->getUserFromUID($user['inherit_id']);
            $user['adm_uid'] = $adm_uid;
        }


        $_SESSION['end_user'] = $user;

        /* echo site_url('<html>
          <script>
          window.location="http://52.192.187.45/dev_future/operation?admin=1&token='.$token.'";
          </script>
          </html>'); */
        $reData = array();
        //$reData['url'] = base_url()  +"/operation?admin=1&token=".$token;
        $reData['redirectURL'] = base_url() . "/operation?admin={$admin}&token=" . $token . "&si=$si&ctl_id=$control_id";
//        $reData['redirectURL'] = base_url()  ."/operation?admin=1&token=". $token;
        $this->View('view_token', $reData);
    }

    //登入
    public function doLogin() {

        $account = $this->input->get_post('account', true);
        $password = $this->input->get_post('password', true);
        $remAccount = $this->input->get_post('rememberAccount', true);
        $remPass = $this->input->get_post('rememberPass', true);
        $server = $this->input->get_post('server', true);

        $user = $this->model_user->doLogin($account, $password);
        $msg = 'success';
        if (!$user) {
            $msg = '帳號或密碼錯誤';
            $this->jsonView($msg);
        }
        if ($user['status'] == 0) {  //|| $user['status']== 2
            $this->jsonView("帳號停用");
        }

        if ($user['user_group'] != 1) {
            $this->jsonView("無登入權限");
        }
        if($this->model_block_ip_list->isBlockIp()===false){
            $this->jsonView("IP被封鎖，請聯絡管理人員");
        }


        //
        //var_dump($remAccount);



        if ($remAccount == 'on') {
            $_SESSION['acc'] = $user['account'];
            //$this->jsonView($_COOKIE['acc']);
        }

        if ($remPass == 'on') {
            $_SESSION['pass'] = $user['password'];
        }

        $user['adm_uid'] = 0;
        $_SESSION['end_user'] = $user;
        $_SESSION['server'] = $server;
        //新增token
        $newToken = getGuid();
        $mapData['user_id'] = $user['user_id'];
        $mapData['token'] = $newToken;
        $ip = getRemoteIP();
        if ($ip == '13.113.3.240' || $ip == '54.178.128.123') {
            $mapData['ip'] = '';
        } else {
            $mapData['ip'] = $ip;
        }
        //$mapData['ip'] = getIp();
        $mapData['enable'] = 1;
        //$mapData['create_date'] =  date("Y-m-d H:i:s");
        $this->model_user_token->insert($mapData);
        //取得IP資訊
        $info = $this->model_user->getIPInfo($mapData['ip']);
        //更新登入資訊
        $this->model_user->updateLoginInfo($user['user_id'], $user['parent_user_id'], $mapData['ip'], 1, $user, $info);

        //寫入header
        $this->insertLoginInfo($user['account'],$user['user_id']);

        //登入log
        $this->model_user->log($user['user_id'], $mapData['ip']);

        //回傳值
        $reData['token'] = $newToken;
        $reData['msg'] = $msg;
        $reData['server'] = $server;
        $reData['token'] = $newToken;



        $this->jsonView($reData);
    }

    //登出
    public function logout() {
        $user = $_SESSION['end_user'];

        $_SESSION['end_user'] = null;

        //更新token狀態
        $mapData = array();
        $mapData['enable'] = 0;
        $this->model_user_token->disable($user['user_id'], $mapData);


        //刪除目前選擇的cookie
//        $loginObj = json_decode( $_COOKIE["loginObj"],true);
//        var_dump($_COOKIE["loginObj"]);
//        if(empty($loginObj)){
//            $loginObj=[];
//        }
//        unset($loginObj[$loginObj['now_select']]);
//        $loginObj['now_select'] = '';
//        setcookie("loginObj",json_encode($loginObj),time()+3600*24*365);
        //從 cache 中移除使用者
        $arrUser = $this->cache->memcached->get('user_online_time');
        if ($arrUser) {
            unset($arrUser[$user['user_id']]);
            $this->cache->memcached->save('user_online_time', $arrUser, 10);
        }
        $url = $this->config->item('base_url') . 'login/';
        redirect($url, 'refresh');
    }

    public function logoutNoauto() {
        $user = $_SESSION['end_user'];

        $_SESSION['end_user'] = null;

        //更新token狀態
        $mapData = array();
        $mapData['enable'] = 0;
        $this->model_user_token->disable($user['user_id'], $mapData);


        //從 cache 中移除使用者
        $arrUser = $this->cache->memcached->get('user_online_time');
        if ($arrUser) {
            unset($arrUser[$user['user_id']]);
            $this->cache->memcached->save('user_online_time', $arrUser, 10);
        }
        $url = $this->config->item('base_url') . 'login/noauto';
        redirect($url, 'refresh');
    }

    private function insertLoginInfo($account,$user_id){
        $mapData['account'] = $account;
        $mapData['user_id'] = $user_id;
        $mapData['header'] = json_encode(getallheaders());
        $mapData['remote_ip'] = getRemoteIP();
        $this->model_login_info->insert($mapData);
    }

}
