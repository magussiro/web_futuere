<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
* 名稱:    底層 controller -> 定義所有預設變數/方法
* 路徑:    core/MY_Controller
* 開發人員: Sean@2015/12/30
*/

class MY_PriceController extends CI_Controller
{
    // 預設指定模版
    protected $tpl = '';

    // 預設 Smarty View
    protected $view = NULL;

    function __construct()
    {
        parent::__construct();
        putenv("TZ=Asia/Taipei");
        header('P3P: CP="CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR"');
        header('Content-type: text/html; charset=utf-8');
        header('Cache-control: private');

        // Smarty View 初始化
        require THIRD_PARTY_PATH.'smarty/libs/Smarty.class.php';
        $this->view = new Smarty;
        $this->view->left_delimiter  = TPL_LEFT_DELIMITER;
        $this->view->right_delimiter = TPL_RIGHT_DELIMITER;
        $this->view->caching         = TPL_CACHING;
        $this->view->cache_lifetime  = TPL_CACHE_LIFETIME;
        $this->view->cache_dir       = TPL_CACHE;
        $this->view->template_dir    = TPL_TEMPLATE;
        $this->view->compile_dir     = TPL_COMPILE;
        $this->view->compile_check   = TPL_COMPILE_CHECK;

        // 後台選單
        $this->menu_admin = array();
        $menu_admin       = array();
        $admin_user       = $this->session->userdata('admin_user');

        if(!empty($admin_user)){

            $menu_admin = $this->t_menu_admin->exec("SELECT * FROM `menu_admin`
                                                      WHERE id IN (".$admin_user['menu_admin_parent_ids'].")
                                                        AND is_enable='1'
                                                        AND parent_id='0'
                                                      ORDER BY sort DESC");

            if(!empty($menu_admin)){
                foreach($menu_admin as $k=>$v){

                    $this->menu_admin[$k] = $v;
                    $menu_admin_child     = array();
                    $menu_admin_child     = $this->t_menu_admin->exec("SELECT * FROM `menu_admin`
                                                                        WHERE id IN (".$admin_user['menu_admin_child_ids'].")
                                                                          AND is_enable='1'
                                                                          AND parent_id='".$v['id']."'
                                                                        ORDER BY sort DESC");

                    $this->menu_admin[$k]['menu_admin_child'] = array();

                    if(!empty($menu_admin_child)){
                        $this->menu_admin[$k]['menu_admin_child'] = $menu_admin_child;
                    }
                }
            }
        }

        // 前台功能
    }

    // 後台管理者是否登入
    function is_admin_login()
    {
        $result = false;

        $admin_user = $this->session->userdata('admin_user');

        if(!empty($admin_user)){
            $result = true;
        }

        return $result;
    }

    // 前台使用者是否登入
    function is_login()
    {
        $result = false;

        $user = $this->session->userdata('user');

        if(!empty($user)){
            $result = true;
        }

        return $result;
    }

    // 覆寫 Smarty 的 display 方法
    function display($tpl='',$theme_tpl='',$is_exit=true)
    {
        if(!empty($tpl)){
            $this->tpl = $tpl;
        }

        // 模版自動赋值
        $this->put(get_object_vars($this));

        $tpl = $this->tpl($tpl);

        // 指定使用共用版型
        if(!empty($theme_tpl)){
            if(is_object($this->view)){
                $this->main_content = $this->view->fetch($tpl);
                $this->put(get_object_vars($this));
                $theme_tpl = $this->tpl($theme_tpl);
                $this->view->display($theme_tpl);
            }

            // 結束是否加上exit;
            if($is_exit){
                exit;
            }
        }

        // 顯示view
        if(is_object($this->view))$this->view->display($tpl);

        // 結束是否加上exit;
        if($is_exit){
            exit;
        }
    }

    // 覆寫 Smarty 的 fetch 方法
    function fetch($tpl='')
    {
        // 模版自動赋值
        $this->put(get_object_vars($this));
        $tpl = $this->tpl($tpl);
        return $this->view->fetch($tpl);
    }


    ### 底層方法 ###

    // 自動執行
    function _output()
    {
        // 未指定模版 - display 對應路徑模板
        if(empty($this->tpl)){
           $this->display();
        }
    }

    // Smarty 設定變數1
    private function put($array)
    {
        if(!is_array($array))
        {
            return false;
        }
        foreach($array as $k=>$v)
        {
            $this->assign($k,$v);
        }
    }

    // Smarty 設定變數2
    private function assign($name, $value)
    {
        if(is_object($this->view))$this->view->assign($name, $value);
    }

    // 取得 view 實體路徑
    private function tpl($tpl='')
    {
        if(!empty($tpl))return $tpl.'.html';
        $tpl = $this->router->fetch_class().'.'.$this->router->fetch_method().'.html';
        return $tpl;
    }
}