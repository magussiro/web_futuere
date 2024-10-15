<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class popup extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('model_user');
        $this->load->model('model_DataTableList');
        $this->load->model('model_popup');
        $this->load->model('model_user_product');
        $this->load->model('model_product');


        $this->load->model('model_popup');

        $this->load->driver('cache');
    }

    function test() {
        $data = array();

        $this->popupView($data, 'popup/test');
    }

    function index() {
        //$this->cache->memcached->save('testKey', 'christophe', 28800);
        $memProduct = $this->cache->memcached->get('user_online_time');

        $this->cache->memcached->save('user_online_time', null, 10);
        var_dump($memProduct);


        /* $arrData = array();

          $arrData['name'] = 'chris';
          $arrData['phone'] = '0933';

          foreach($arrData as $k=>$v)
          {
          echo '<br> k = ' . $k . " , v= ". $v;
          } */



        $log_path = '/var/www/future/application/logs';
        $folder = $log_path . '/amount_price';
        if (!is_dir($folder)) {
            $isSuccess = mkdir($folder);
        }

        $folder = $log_path . '/amount_price' . '/' . date('Ymd');
        if (!is_dir($folder)) {
            mkdir($folder);
        }

        foreach ($memProduct as $k => $v) {
            echo $k;
            $item = json_encode($memProduct[$k], true);
            echo $item;

            $fileName = $k . '.txt';
            //log_file($folder,$fileName, $item);
        }




        $data = array();
        $this->popupView($data, 'view_operation');
    }

    function action() {
        $data = array();

        $this->popupView($data, 'popup/popup_action');
    }

    function deposit() {
        $data = array();
        //$this->load->view('popup/popup_deposit',$data);
        $this->popupView($data, 'popup/popup_deposit');
    }

    function depositList() {
        $result = $this->model_DataTableList->getDepositList();
        $this->jsonView($result);
    }

    function historyProfit() {
        $data = array();
        $isReport = $this->input->get_post('isReport', TRUE);
        $sdate = $this->input->get_post('sdate', TRUE);
        $edate = $this->input->get_post('edate', TRUE);

        $user_id = $_SESSION['end_user']['user_id'];

        if ($isReport == 'true') {
            $result = $this->model_popup->getProfit($sdate, $edate, $user_id);
            $data['list'] = $result;
        }
        //var_dump($data);
        $data['sdate'] = $sdate;
        $data['edate'] = $edate;
        //$this->load->view('popup/popup_history_profit',$data);
        $this->popupView($data, 'popup/popup_history_profit');
    }

    function historyQuote() {
        $product = $this->model_product->getList();

        $data = array();
        $data['product'] = $product;
        //$this->load->view('popup/popup_history_quote',$data);
        $this->popupView($data, 'popup/popup_history_quote');
    }

    function historyQuoteList() {
        $product_code = $this->input->get_post('product', TRUE);
        $date = $this->input->get_post('date', TRUE);
        $echo = $this->input->get_post('sEcho', TRUE);

        if ($date == null)
            $date = date('Y-m-d');

        $arrDate = explode('-', $date);

        $conditionType = $this->input->get_post('conditionType', TRUE);
        $sHour = $this->input->get_post('sHour', TRUE);
        $sMin = $this->input->get_post('sMin', TRUE);
        $sSec = $this->input->get_post('sSec', TRUE);
        $eHour = $this->input->get_post('eHour', TRUE);
        $eMin = $this->input->get_post('eMin', TRUE);
        $eSec = $this->input->get_post('eSec', TRUE);
        $price_point = $this->input->get_post('price_point', TRUE);

        $strTime1 = str_pad($sHour, 2, "0", STR_PAD_LEFT) . ':' . str_pad($sMin, 2, "0", STR_PAD_LEFT) . ':' . str_pad($sSec, 2, "0", STR_PAD_LEFT);
        $strTime2 = str_pad($eHour, 2, "0", STR_PAD_LEFT) . ':' . str_pad($eMin, 2, "0", STR_PAD_LEFT) . ':' . str_pad($eSec, 2, "0", STR_PAD_LEFT);

        //var_dump($strTime1);


        $sTime = trim($date) . ' ' . $strTime1;
        $eTime = trim($date) . ' ' . $strTime2;

        //var_dump($sTime);

        $time1 = strtotime($sTime);
        $time2 = strtotime($eTime);

        //var_dump($time1);

        $intStart = $this->input->get_post('iDisplayStart', TRUE);
        $intLength = $this->input->get_post('iDisplayLength', TRUE);

        if ($intLength == '-1')
            $intLength = 10;
        //var_dump($intStart);


        $path = '/var/www/future/application/logs/product_price/' . str_pad($arrDate[0], 2, "0", STR_PAD_LEFT) . str_pad($arrDate[1], 2, "0", STR_PAD_LEFT) . str_pad($arrDate[2], 2, "0", STR_PAD_LEFT) . '/' . $product_code . '.txt';
        //var_dump($path);
        if (!file_exists($path)) {
            $mapMerge = array();
            $mapMerge['sEcho'] = $echo;
            $mapMerge['iTotalRecords'] = 0;
            $mapMerge['iTotalDisplayRecords'] = 0;
            $mapMerge['aaData'] = array();
            $this->jsonView($mapMerge);
            return;
        }
        $file = fopen($path, "r");
        if (!$file) {
            $mapMerge = array();
            $mapMerge['sEcho'] = $echo;
            $mapMerge['iTotalRecords'] = 0;
            $mapMerge['iTotalDisplayRecords'] = 0;
            $mapMerge['aaData'] = array();
            $this->jsonView($mapMerge);
            return;
        }
        $allData = array();
        $i = 0;
        while (!feof($file)) {
            $value = fgets($file);
            $json = json_decode($value, true);

            //條件
            $nowTime = strtotime($json['create_date']);

            if ($price_point != '') {
                if ($price_point != $json['new_price']) {
                    continue;
                }
            }
            if ($nowTime < $time1 || $nowTime > $time2) {
                continue;
            }
            $priceData = array();
            $priceData['new_price'] = $json['new_price'];
            $priceData['now_amount'] = $json['now_amount'];
            $priceData['price_time'] = $json['price_time'];
            $priceData['product_code'] = $json['product_code'];
            $priceData['date'] = date('Y-m-d', $nowTime);
            $allData[] = $priceData;
            $i++;
        }
        fclose($file);

        $finalData = array();
        $j = 0;
        foreach ($allData as $item2) {
            $start = $intStart;
            $end = $start + $intLength;

            if ($j >= $end) {
                break;
            }

            if ($j >= $start && $j < $end) {
                $finalData[] = $item2;
            }
            $j++;
        }
        //var_dump($finalData);
        $mapMerge = array();
        $mapMerge['sEcho'] = $echo;
        $mapMerge['iTotalRecords'] = $i;
        $mapMerge['iTotalDisplayRecords'] = $i;
        $mapMerge['aaData'] = $finalData;
        $this->jsonView($mapMerge);
    }

    function history() {
        $data = array();
        //$this->load->view('popup/popup_history',$data);
        $this->popupView($data, 'popup/popup_history');
    }

    function layout() {
        $data = array();
        //$this->load->view('popup/popup_layout',$data);
        $this->popupView($data, 'popup/popup_layout');
    }

    function login() {
        $data = array();
        //$this->load->view('popup/popup_login',$data);
        $this->popupView($data, 'popup/popup_login');
    }

    function notOpen() {
        $data = array();
        //$this->load->view('popup/popup_notopen',$data);
        $this->popupView($data, 'popup/popup_notopen');
    }

    function order() {
        $data = array();
        //$this->load->view('popup/popup_order',$data);
        $this->popupView($data, 'popup/popup_order');
    }

    function password() {
        $data = array();
        $mapData = array();
        //$mapData['account'] = $this->input->get_post('account', TRUE);	
        $mapData['token'] = $this->input->get_post('token', TRUE);
        $mapData['oldPass'] = $this->input->get_post('oldPass', TRUE);
        $mapData['newPass'] = $this->input->get_post('newPass', TRUE);
        $mapData['confirmPass'] = $this->input->get_post('confirmPass', TRUE);

        if ($mapData['oldPass'] != null) {
            $data['msg'] = $this->model_user->changePassword($mapData);
        }

        $this->popupView($data, 'popup/popup_password');
    }

    function personalInfo() {
        $data = array();
        $token = $this->input->get_post('token', TRUE);
        $user_id = $this->model_DataTableList->getUserID($token);

        $data['product'] = $this->model_user_product->getUserProduct($user_id);


        $sql = 'select * from user_config where user_id=\'' . $user_id . '\' ';
        $user_config = $this->mydb->queryRow($sql);

        $data['config'] = $user_config;



        //$this->load->view('popup/popup_personalInfo',$data);
        $this->popupView($data, 'popup/popup_personalInfo');
    }

    //============================================
    //想觀看的商品
    //============================================
    function product() {
        $data = array();
        //$this->load->view('popup/popup_product',$data);
        $this->popupView($data, 'popup/popup_product');
    }

    function productList() {
        $mapMerge = array();
        $total = 10;
        $intStart = $this->input->get_post('iDisplayStart', TRUE);
        $intLength = $this->input->get_post('iDisplayLength', TRUE);
        $token = $this->input->get_post('token', TRUE);
        $aaData = $this->model_DataTableList->getProductList($intStart, $intLength, $token);


        //var_dump($aaData);
//        foreach ($aaData as $key => $value) {
//            if ($value['day_time'] == 1) {
//                $value['open_time'] = date("Y-m-d H:i:s", strtotime($value['open_time'] . "+1 hour"));
//                $value['close_time'] = date("Y-m-d H:i:s", strtotime($value['close_time'] . "+1 hour"));
//                $value['open_time2'] = date("Y-m-d H:i:s", strtotime($value['open_time2'] . "+1 hour"));
//                $value['close_time2'] = date("Y-m-d H:i:s", strtotime($value['close_time2'] . "+1 hour"));
//                $value['open_time3'] = date("Y-m-d H:i:s", strtotime($value['open_time3'] . "+1 hour"));
//                $value['close_time3'] = date("Y-m-d H:i:s", strtotime($value['close_time3'] . "+1 hour"));
//            }
//        }
        //var_dump($aaData);
        for ($i = 0; $i < count($aaData); $i++) {
            if ($aaData[$i]['day_time'] == 1) {
                if ($aaData[$i]['open_time'] == '00:00:00') {
                    
                } else {
                    $aaData[$i]['open_time'] = date("H:i:s", strtotime($aaData[$i]['open_time'] . "+1 hour"));
                }
                
                if ($aaData[$i]['close_time'] == '00:00:00') {
                    
                } else {
                    $aaData[$i]['close_time'] = date("H:i:s", strtotime($aaData[$i]['close_time'] . "+1 hour"));
                }
                
                if ($aaData[$i]['open_time2'] == '00:00:00') {
                    
                } else {
                    $aaData[$i]['open_time2'] = date("H:i:s", strtotime($aaData[$i]['open_time2'] . "+1 hour"));
                }
                
                
                if ($aaData[$i]['close_time2'] == '00:00:00') {
                    
                } else {
                    $aaData[$i]['close_time2'] = date(" H:i:s", strtotime($aaData[$i]['close_time2'] . "+1 hour"));
                }
                
                
                if ($aaData[$i]['open_time3'] == '00:00:00') {
                    
                } else {
                    $aaData[$i]['open_time3'] = date("H:i:s", strtotime($aaData[$i]['open_time3'] . "+1 hour"));
                }
                
                
                if ($aaData[$i]['close_time3'] == '00:00:00') {
                    
                } else {
                    $aaData[$i]['close_time3'] = date("H:i:s", strtotime($aaData[$i]['close_time3'] . "+1 hour"));
                }
            }
        }



        $mapMerge['sEcho'] = $this->input->get_post('sEcho', TRUE);
        $mapMerge['iTotalRecords'] = $total;
        $mapMerge['iTotalDisplayRecords'] = $total;
        $mapMerge['aaData'] = $aaData;

        $this->jsonView($mapMerge);
        //success('', 'success', $mapMerge);
    }

    function productSave() {
        $token = $this->input->get_post('token', TRUE);
        $arrID = $this->input->get_post('ids', TRUE);

        $user_id = $this->model_DataTableList->getUserID($token);

        $this->model_product->hideAllProduct($user_id);
        if ($arrID != null) {
            foreach ($arrID as $id) {
                $data = array();
                $data['is_show'] = 1;
                $productCode = $this->model_product->get($id);
                $sql = 'select * from user_product where  product_code = \'' . $productCode['code'] . '\' and user_id=\'' . $user_id . '\' ';
                $userP = $this->mydb->queryRow($sql);
                //找不到使用者商品設定
                if (!$userP) {
                    $mapData = array();
                    $mapData['user_id'] = $user_id;
                    $mapData['product_code'] = $productCode['code'];
                    $mapData['is_show'] = '1';
                    $this->model_user_product->insert($mapData);
                    //$this->model_user_product->update($userP['id'],$data);
                } else {
                    $this->model_user_product->update($userP['id'], $data);
                }
            }
        }

        $this->jsonView($arrID);
    }

    function website() {
        $data = array();
        //$this->load->view('popup/popup_website',$data);
        $this->popupView($data, 'popup/popup_website');
    }

    function popupView($data, $view) {
        $data['webroot'] = base_url();
        $this->load->view($view, $data);
    }

    function notice() {
        $data = array();
        $this->popupView($data, 'popup/notice');
    }

    /*
      function log()
      {
      $data =  array();
      $this->popupView($data,'popup/popup_log');

      } */

    function log() {
        //$types  = $this->model_popup->getActionTypes(1);
        //$amount = count($result);
        $types = $this->model_popup->getActionTypes(1);
        $mapData = array('types' => $types);
        $this->popupView($mapData, 'popup/popup_log');
        //$this->jsonView($mapData);
    }

    function logList() {
        $result = $this->model_DataTableList->getLogList();
        $this->jsonView($result);
        $amount = count($result);
        $types = $this->model_popup->getActionTypes(1);
        $mapData = array("amount" => $amount, "childs" => $result, 'types' => $types);
        //$this->popupView($mapData,'popup/popup_log');
        //$this->jsonView($mapData);
    }

    function advicerList() {
        $data = array();
        $result = $this->model_popup->getTeacherList();
        $data['list'] = $result;
        $this->popupView($data, 'popup/advicerList');
    }

    function amount_price() {

        $data = array();

        $code = $this->input->get_post('code', TRUE);

        $sdate = $this->input->post("sdate");
        $edate = $this->input->post("edate");

        if (!$sdate)
            $sdate = date("Y-m-d");
        if (!$edate)
            $edate = date("Y-m-d");

        $data["sdate"] = $sdate;
        $data["edate"] = $edate;

        //不是今天就先不丟資料
        $nowDate = date("Y-m-d");
        if ($nowDate == $sdate && $nowDate == $edate) {
            $product_amount = $this->cache->memcached->get('product_amount');

            if (isset($product_amount[$code])) {
                $arr = [];
                $product_obj = $product_amount[$code];
                krsort($product_obj);

                foreach ($product_obj as $key => $val) {
                    $arr[$key] = $val;
                }

                $data['data'] = $arr;
            }
        }
        $this->popupView($data, 'popup/popup_amount_price');
    }

    function announce() {
        $data = array();
        $this->popupView($data, 'popup/popup_announce');
    }

    function announceList() {
        $result = $this->model_DataTableList->getAnnounceList();
        $this->jsonView($result);
    }

}
