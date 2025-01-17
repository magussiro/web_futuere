<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class operation extends MY_Controller {

    function __construct() {
        parent::__construct();
        $this->load->model('model_user_config');
        $this->load->model('model_product');
        $this->load->model('model_operation');
        $this->load->model('model_DataTableList');
        $this->load->model('model_advice_type');
        $this->load->driver('cache');
    }

    public function index() {
        $user = $_SESSION['end_user'];
        if (isset($_SESSION['server'])) {
            $server = $_SESSION['server'];
        } else {
            $server = ""; //
        }


        if (isset($user['adm_uid']) && (int) $user['adm_uid'] > 0) {
            $user_id = $user['adm_uid'];
            $is_adm = true;
        } else {
            $user_id = $user['user_id'];
            $is_adm = false;
        }

        $config = $this->model_user_config->get($user_id, 'user_id');
        $product = $this->model_product->getShowProduct($user_id);
        $teacher = $this->model_operation->getTeacherList();
        $adviceType = $this->model_advice_type->getList();
        $announce = $this->model_operation->getLastAnn($user_id);

        //var_dump($announce);
        //$_setting = require(__DIR__ . "/../config/socket.php");
        //$url = $_setting["url"];
        $url = $this->config->item('jsSocket');

        $mapData = array();
        $mapData['is_adm'] = $is_adm;
        $mapData['user'] = $user;
        $mapData['product'] = $product;
        $mapData['config'] = $config;
        $mapData['teacher'] = $teacher;
        $mapData['advice_type'] = $adviceType;
        $mapData['ann'] = $announce;
        $mapData['url'] = $url;
        $mapData['server'] = $server;
        $this->View('index_black', $mapData);
    }

    //量價分佈
    function loadPriceAmount() {
        //$token =   $this->input->get_post('token', TRUE);	
        $code = $this->input->get_post('product', TRUE);
        $product_amount = $this->cache->memcached->get('product_amount');

         //var_dump($product_amount);
        // die;
        //$today = date('Ymd');
        //$product_amount = $allData[$today];
        //if( isset( $product_amount[$code] ) )
        //{
        //krsort( $product_amount[$code],SORT_NUMERIC);
        if (isset($product_amount[$code])) {
            //$arr = array();
            //for($i= count($product_amount)-1 ;$i>0 ;$i--)
            //{
            //    $arr[] = $product_amount[$i];
            //}
            //$result = array_reverse($product_amount[$code],true);
            foreach (array_reverse($product_amount[$code], true) as $item) {
                //echo sprintf("< li> %s< /li> ", $account);
                $arr[] = $item;
            }

            $this->jsonView($product_amount[$code]);
        } else {
            $emptyObj = Array();
            $this->jsonView($emptyObj);
        }
        //}
        //else {
        //     $this->jsonView('error');
        //}
    }

    //儲存掛單停損停利
    function savePreLimit() {
        $user = $_SESSION['end_user'];
        $pre_id = $this->input->get_post('pre_id', TRUE);
        $loss = $this->input->get_post('loss', TRUE);
        $profit = $this->input->get_post('profit', TRUE);
        $msg = '';

        //要修改多筆訂單的停損利
        if (strpos($pre_id, ',') !== false) {
            //先檢查上限範圍
            $arrPreID = explode(',', $pre_id);
            foreach ($arrPreID as $pid) {
                $msg = $this->checkValue($pid, $user['user_id'], $profit, $loss);
                if ($msg != '') {
                    $this->jsonView($msg);
                }
            }
            //都在範圍內，繼續更新
            foreach ($arrPreID as $pid2) {
                //echo '更新ID='. $pid2;
                $resutl = $this->model_operation->save_pre_Limit($user['user_id'], $pid2, $loss, $profit);
            }
        } else {
            $msg = $this->checkValue($pre_id, $user['user_id'], $profit, $loss);
            if ($msg != '') {
                $this->jsonView($msg);
            }
            $resutl = $this->model_operation->save_pre_Limit($user['user_id'], $pre_id, $loss, $profit);
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();
        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id'], 0) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        $this->jsonView('success');
    }

//儲存收盤單停損停利
    function saveCloseLimit() {
        $user = $_SESSION['end_user'];
        $pre_id = $this->input->get_post('pre_id', TRUE);
        $loss = $this->input->get_post('loss', TRUE);
        $profit = $this->input->get_post('profit', TRUE);
        $msg = '';

        //要修改多筆訂單的停損利
        if (strpos($pre_id, ',') !== false) {
            //先檢查上限範圍
            $arrPreID = explode(',', $pre_id);
            foreach ($arrPreID as $pid) {
                $msg = $this->checkValue($pid, $user['user_id'], $profit, $loss);
                if ($msg != '') {
                    $this->jsonView($msg);
                }
            }
            //都在範圍內，繼續更新
            foreach ($arrPreID as $pid2) {
                //echo '更新ID='. $pid2;
                $resutl = $this->model_operation->save_close_Limit($user['user_id'], $pid2, $loss, $profit);
            }
        } else {
            $msg = $this->checkValue($pre_id, $user['user_id'], $profit, $loss);
            if ($msg != '') {
                $this->jsonView($msg);
            }
            $resutl = $this->model_operation->save_close_Limit($user['user_id'], $pre_id, $loss, $profit);
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();
        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id'], 0) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        $this->jsonView('success');
    }

    //儲存停損停利
    function saveLimit() {
        $user = $_SESSION['end_user'];
        $pre_id = $this->input->get_post('pre_id', TRUE);
        $loss = $this->input->get_post('loss', TRUE);
        $profit = $this->input->get_post('profit', TRUE);
        $msg = '';

        //要修改多筆訂單的停損利
        if (strpos($pre_id, ',') !== false) {
            //先檢查上限範圍
            $arrPreID = explode(',', $pre_id);
            foreach ($arrPreID as $pid) {
                $msg = $this->checkValue($pid, $user['user_id'], $profit, $loss);
                if ($msg != '') {
                    $this->jsonView($msg);
                }
            }
            //都在範圍內，繼續更新
            foreach ($arrPreID as $pid2) {
                //echo '更新ID='. $pid2;
                $resutl = $this->model_operation->saveLimit($user['user_id'], $pid2, $loss, $profit);
            }
        } else {
            $msg = $this->checkValue($pre_id, $user['user_id'], $profit, $loss);
            if ($msg != '') {
                $this->jsonView($msg);
            }
            $resutl = $this->model_operation->saveLimit($user['user_id'], $pre_id, $loss, $profit);
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();
        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id'], 0) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        if ($resutl == 0) {
            $this->jsonView('success');
        } else if ($resutl == 1) {
            $this->jsonView('倒限未開啟');
        }
    }

    function checkValue($id, $user_id, $profit, $loss) {
        return '';
        $sql_order = 'select * from orders where order_id= \'' . $id . '\'';

        //var_dump($sql_order);
        $order = $this->mydb->queryRow($sql_order);
        $sql = 'select * from user_product where
                                        user_id =\'' . $user_id . '\'
                                        and product_code = \'' . $order['product_code'] . '\'';
        $user_product = $this->mydb->queryRow($sql);

        if ($profit != 0) {
            if ($profit < $user_product['max_profit_rate_per_amount']) {
                $checkStop = true;
                //$checkStop = checkStopValue($id,$user_product['accept_stop_order']);
                if ($orde['type'] == 4 && $checkStop == false)
                    return '單號' . $order['order_id'] . '，禁止倒限';
                return '單號' . $order['order_id'] . '，停利需大於等於' . $user_product['max_profit_rate_per_amount'];
            }
        }

        if ($loss != 0) {
            if ($loss < $user_product['max_profit_rate_per_amount']) {
                return '單號' . $order['order_id'] . '，停損需大於等於' . $user_product['max_profit_rate_per_amount'];
            }
        }
    }

    //倒現檢查
    function checkStopValue($id, $accept_stop) {
        global $memcache;
        $cacheData = $memcache->get('user_money_list');
        $ord_key = array_search($id, $cacheData['orderID']);
        $profit = $cacheData['orderMoney'][$ord_key];
        if ($profit > 0 && $accept_stop == 0) {
            return false;
        } else {
            return true;
        }
    }

    //選多項商品，設定停損利
    /*
      function saveLimitMulti()
      {
      $user = $_SESSION['end_user'];
      $arrID = $this->input->get_post('arrID', TRUE);
      $loss =   $this->input->get_post('loss', TRUE);
      $profit =   $this->input->get_post('profit', TRUE);


      foreach($arrID as $pre_id)
      {
      $sql_order = 'select * from orders where pre_id= \''. $pre_id .'\'';
      $order =  $this->mydb->queryRow($sql_order);
      $sql = 'select * from user_product where
      user_id =\''. $user['user_id'] .'\'
      and product_code = \''. $order['product_code'] .'\'';
      $user_product = $this->mydb->queryRow($sql);

      if( $profit < $user_product['max_profit_rate_per_amount']  )
      {
      $this->jsonView('單號'. $order['order_id'].'停利需大於等於'.$user_product['max_profit_rate_per_amount'] );
      }

      if( $loss < $user_product['max_profit_rate_per_amount']  )
      {
      $this->jsonView('單號'. $order['order_id'].'停損需大於等於'.$user_product['max_profit_rate_per_amount'] );
      }
      }


      $result = $this->model_operation->saveLimitMulti($arrID,$loss,$profit,$user['user_id']);
      if(!$result)
      {
      $this->jsonView('處理失敗');
      }

      $this->jsonView('success');
      } */

    //收盤全平
    function close_offset() {
        $user = $_SESSION['end_user'];
        $product_code = $this->input->get_post('product_code', TRUE);
        //檢查是不是有這個商品的收盤單
        $canSet = $this->model_operation->canCloseOffset($product_code, $user['user_id']);
        if (!$canSet) {
            $this->jsonView('有收盤單，不允許設定收盤全平。');
        }

        //設定收盤全平
        $result = $this->model_operation->close_offset($product_code, $user['user_id']);
        if (!$result) {
            $this->jsonView('收盤全平設定失敗');
        } else {
            $arrUser = $this->cache->memcached->get('user_reload_list');
            if (empty($arrUser))
                $arrUser = array();

            $arrUser[] = $user['adm_uid'] > 0 ? array($user['user_id'], $user['adm_uid']) : $user['user_id'];
            $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
            $this->jsonView('success');
        }
    }

    //取消收盤全平
    function cancel_close_offset() {
        $user = $_SESSION['end_user'];
        $product_code = $this->input->get_post('product_code', TRUE);
        $result = $this->model_operation->cancel_close_offset($product_code, $user['user_id']);
        if (!$result) {
            $this->jsonView('取消收盤全平設定失敗');
        } else {
            $arrUser = $this->cache->memcached->get('user_reload_list');
            if (empty($arrUser))
                $arrUser = array();

            $arrUser[] = $user['adm_uid'] > 0 ? array($user['user_id'], $user['adm_uid']) : $user['user_id'];
            $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
            $this->jsonView('success');
        }
    }

    //刪除收盤單
    function deleteCloseorder() {
        $user = $_SESSION['end_user'];

        $id = $this->input->get_post('id', TRUE);

        $result = $this->model_operation->deleteCloseOrder($id);

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);

        if (!$result) {
            $this->jsonView('刪除收盤單失敗');
        } else {
            $this->jsonView('success');
        }
    }

    //刪除掛單
    function deletePreorder() {
        if (!isset($_SESSION['end_user']))
            return;

        $user = $_SESSION['end_user'];
        $id = $this->input->get_post('id', TRUE);

        $result = $this->model_operation->deletePreorder($id);
        if (!$result) {
            $this->jsonView('刪除掛單失敗');
        } else {
            $arrUser = $this->cache->memcached->get('user_reload_list');
            if (empty($arrUser))
                $arrUser = array();

            $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id']) : $user['user_id'];
            $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
            $this->jsonView('success');
        }
    }

    function load_pre_Limit() {
        $user = $_SESSION['end_user'];
        $order_id = $this->input->get_post('pre_id', TRUE);
        $result = $this->model_operation->load_pre_Limit($order_id, $user['user_id']);
        if (!$result) {
            $this->jsonView('讀取失敗');
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        //$result['msg'] = 'success';
        $this->jsonView($result);
    }

    function load_close_Limit() {
        $user = $_SESSION['end_user'];
        $order_id = $this->input->get_post('pre_id', TRUE);
        $result = $this->model_operation->load_close_Limit($order_id, $user['user_id']);
        if (!$result) {
            $this->jsonView('讀取失敗');
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        //$result['msg'] = 'success';
        $this->jsonView($result);
    }

    function loadLimit() {
        $user = $_SESSION['end_user'];
        $order_id = $this->input->get_post('pre_id', TRUE);
        $result = $this->model_operation->loadLimit($order_id, $user['user_id']);
        if (!$result) {
            $this->jsonView('讀取失敗');
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        //$result['msg'] = 'success';
        $this->jsonView($result);
    }

    function loadreverseLimit() {
        $user = $_SESSION['end_user'];
        $order_id = $this->input->get_post('pre_id', TRUE);
        $result = $this->model_operation->loadLimit($order_id, $user['user_id']);
        if (!$result) {
            $this->jsonView('讀取失敗');
        }
        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        //$result['msg'] = 'success';
        $this->jsonView($result);
    }

    function savereverseLimit() {
        $user = $_SESSION['end_user'];
        $pre_id = $this->input->get_post('pre_id', TRUE);
        $limit = $this->input->get_post('up_limit', TRUE);
        //$profit =   $this->input->get_post('profit', TRUE);
        $msg = '';
        $resutl = $this->model_operation->savereverseLimit($user['user_id'], $pre_id, $limit);

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();
        $arrUser[] = $user['adm_uid'] > 0 ? array($user['adm_uid'], $user['user_id'], 0) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        if ($resutl == 0) {
            $this->jsonView('success');
        } else if ($resutl == 1) {
            $this->jsonView('倒限未開啟');
        }
    }

    //投顧訊息 列表
    function loadAdvicerList() {
        $sdate = $this->input->get_post('advicer_sdate', TRUE);
        $edate = $this->input->get_post('advicer_edate', TRUE);
        $arrTeacher = $this->input->get_post('teacher', TRUE);

        //var_dump($arrTeacher);
        //var_dump($arrTeacher[0]);

        $teachers = 0;
        if ($arrTeacher != null) {
            $teachers = implode(',', $arrTeacher);
        }
        $advice_type = $this->input->get_post('advice_type', TRUE);

        //var_dump($teachers);
        $result = $this->model_DataTableList->getAdvicerList($sdate, $edate, $teachers, $advice_type);
        $this->jsonView($result);
    }

    // 列表
    function loadBillList() {
        if (!isset($_SESSION['end_user'])) {
            $this->load->view('index.html', array());
            return;
        }

        $usr = $_SESSION['end_user'];
        $uid = $usr['user_id'];
//        $uid   = isset($usr['adm_uid']) && (int)$usr['adm_uid'] > 0 ? $usr['adm_uid'] : $usr['user_id'];
        $sdate = $this->input->get_post('bill_sdate', TRUE);
        $edate = $this->input->get_post('bill_edate', TRUE);
        $stime = strtotime($sdate);
        $etime = strtotime($edate);
        $sdate = $stime ? date('Y-m-d', $stime) : null;
        $edate = $etime ? date('Y-m-d', $etime) : null;
        $result = $this->model_DataTableList->getBillList($uid, $sdate, $edate);

        //print_r($result);
        $this->jsonView($result);
    }

    function storeOrder() {
        $user = $_SESSION['end_user'];
        $order_id = $this->input->get_post('order_id', TRUE);
        $result = $this->model_operation->storeOrder($user['user_id'], $order_id);
        if (!$result) {
            $this->jsonView('處理失敗');
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['user_id'], $user['adm_uid']) : $user['user_id'];
        //寫log
        $user_id = $user['adm_uid'] > 0 ? $user['adm_uid'] : $user['user_id'];
        $this->log($user_id, getIp(), 'single_store', '指定平倉', '使用者對' . $order_id . '做平倉 ', $user['user_id']);
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        $this->jsonView('success');
    }

    //讀取單一商品是不是收盤全平
    function load_closeOffset() {
        $user = $_SESSION['end_user'];
        $product_code = $this->input->get_post('product_code', TRUE);

        $sql = 'select * from user_product where
                                        user_id =' . $user['user_id'] . '
                                        and product_code = \'' . $product_code . '\'';
        $user_product = $this->mydb->queryRow($sql);
        $mapData = array();
        $mapData['isCloseOffset'] = $user_product['close_offset'];
        $this->jsonView($mapData);
    }

    function loadPreOrder() {
        $user = $_SESSION['end_user'];
        $pre_id = $this->input->get_post('pre_id', TRUE);
        $sql = 'select * from pre_orders where pre_id=' . $pre_id;

        $pre_order = $this->mydb->queryRow($sql);
        $mapData = array();
        $mapData['pre_order'] = $pre_order;

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['user_id'], $user['adm_uid']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        $this->jsonView($mapData);
    }

    function savePreOrder() {
        $user = $_SESSION['end_user'];
        $pre_id = $this->input->get_post('pre_id', TRUE);
        $price = $this->input->get_post('price', TRUE);
        $amount = $this->input->get_post('amount', TRUE);
        $type = $this->input->get_post('type', TRUE);

        $sql2 = 'select * from pre_orders where pre_id=' . $pre_id;
        $pre_order = $this->mydb->queryRow($sql2);


        if ($amount > $pre_order['amount']) {
            $this->jsonView('設定口數需<=原口數');
        }

        if ($amount <= 0) {
            $this->jsonView('設定口數需>0');
        }


        $result = $this->model_operation->savePreOrder($user['user_id'], $pre_id, $price, $amount, $type);
        if (!$result) {
            $this->jsonView('處理失敗');
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['user_id'], $user['adm_uid']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        $this->jsonView('success');
    }

    //使用者按一鍵全平
    function storeProduct() {

        $user = $_SESSION['end_user'];
        //print_r($user);
        $product_code = $this->input->get_post('product_code', TRUE);
        $key = 'future_:product_' . $product_code;
        $product = $this->cache->memcached->getNotCiCache($key);
        $product_name = $product['name'];
        if ($user['adm_uid'] != 0) {
            $result = $this->model_operation->storeProduct($user['user_id'], $user['adm_uid'], $product_code, $product_name);
        } else {
            $result = $this->model_operation->storeProduct($user['user_id'], $user['user_id'], $product_code, $product_name);
        }
        //$result = $this->model_operation->storeProduct($user['user_id'],$product_code);
        if (!$result) {
            $this->jsonView('處理失敗');
        }


        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['user_id'], $user['adm_uid']) : $user['user_id'];


        //寫log
//        $sql2 = 'select * from product where code=\''. $product_code .'\'';
//        $product = $this->mydb->queryRow($sql2);

        $user_id = $user['adm_uid'] > 0 ? $user['adm_uid'] : $user['user_id'];

        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        $this->jsonView('success', false);
    }

    function storeMulti() {
        $user = $_SESSION['end_user'];

        $arrID = $this->input->get_post('arrID', TRUE);
        if (empty($arrID) || !is_array($arrID)) {
            $this->jsonView('處理失敗');
            return;
        }

        $result = $this->model_operation->storeMulti($arrID);
        if (!$result) {
            $this->jsonView('處理失敗');
            return;
        }

        $arrUser = $this->cache->memcached->get('user_reload_list');
        if (empty($arrUser))
            $arrUser = array();

        $arrUser[] = $user['adm_uid'] > 0 ? array($user['user_id'], $user['adm_uid']) : $user['user_id'];
        $this->cache->memcached->save('user_reload_list', $arrUser, 28800);
        //寫log
        //$this->log($preOrder['user_id'] , getIp() ,'store_all','使用者對'. $product_code . '做全平 ');
        $this->jsonView('success');
    }

    //未成交單設定停損畫面
    function pre_stop_loss() {
        $mapData = array();
        $this->View('view_pre_stop_loss', $mapData);
    }

    //未成交單設定停損畫面
    function pre_stop_profit() {
        $mapData = array();
        $this->View('view_pre_stop_profit', $mapData);
    }

    //未成交收盤單設定停損畫面
    function close_stop_loss() {
        $mapData = array();
        $this->View('view_close_stop_loss', $mapData);
    }

    //未成交收盤單設定停損畫面
    function close_stop_profit() {
        $mapData = array();
        $this->View('view_close_stop_profit', $mapData);
    }

    //設定停損畫面
    function stop_loss() {
        $mapData = array();
        $this->View('view_stop_loss', $mapData);
    }

    //設定停損畫面
    function stop_profit() {
        $mapData = array();
        $this->View('view_stop_profit', $mapData);
    }

    //設定停損畫面
    function reverse_up_limit() {
        $mapData = array();
        $this->View('view_reverse_up_limit', $mapData);
    }

    function log($user_id, $ip, $type, $type_ch, $memo, $target_id = '') {
        $this->load->model('model_user_action_log');

        $mapData = array();
        $mapData['user_id'] = $user_id;
        $mapData['target_id'] = $target_id;
        if ($ip == '13.113.3.240' || $ip == '54.178.128.123') {
            $mapData['ip'] = '';
        } else {
            $mapData['ip'] = $ip;
        }
        //$//mapData['ip'] = $ip;
        $mapData['type'] = $type;
        $mapData['type_ch'] = $type_ch;
        $mapData['memo'] = $memo;
        $mapData['create_date'] = date('Y-m-d H:i:s');
//        $newStoOrderID =$this->mydb->queryRow('user_action_log',);
//        $this->_db->Insert('user_action_log',$mapData);

        $this->model_user_action_log->Insert($mapData);
    }

    function setUserProfit() {

        $profit = $this->input->get_post('profit', TRUE);
        $token = $this->input->get_post('token', TRUE);
        $result = [];
//        $token = "9BB68000-9FCD-F882-4D66-953F8D3D2D6B";
//        $profit =123;
        if (!is_numeric($profit)) {
            $result['isSuccess'] = false;
            $this->jsonView($result);
        }


        if (isset($_SESSION['end_user'])) {
            $user = $_SESSION['end_user'];
        }

//        var_dump($user);
        if (!isset($user)) {
            $user = $this->model_operation->getUser($token);
        }
        if (!$user) {
            $result['isSuccess'] = false;
            $this->jsonView($result);
        }
        $_SESSION['user'] = $user;
//            return false;
        $strSQL = "SELECT * FROM user_token WHERE token  = '$token'";
        $data = $this->db->query($strSQL)->result();
        if (empty($data)) {
            $result['isSuccess'] = false;
            $this->jsonView($result);
        }
        $uid = $data[0]->user_id;
        $_date = date('Y-m-d H:i:s');

        $strSQL = "SELECT * FROM user_profit WHERE user_id  = $uid";
        $data = $this->db->query($strSQL)->result();

        if (empty($data)) {

//$strSQL = "INSERT INTO `user_profit` (`user_id`, `user_profit`, `create_date`) VALUES ('$uid', '$profit', '$_date')";

            $arrData = [];
            $arrData['user_id'] = $uid;
            $arrData['user_profit'] = $profit;
            $arrData['create_date'] = $_date;
            $result['isSuccess'] = $this->db->Insert('user_profit', $arrData);
        } else {

            $result['isSuccess'] = $this->db->Update("user_profit", array("update_date" => $_date, 'user_profit' => $profit), "user_id=$uid");

//            $strSQL = "Update user_profit set user_profit = $profit, update_date = '$_date'  WHERE user_id  = '$uid'";
        }
        $this->jsonView($result);
    }

    function get_order() {
        ini_set("display_errors", 0);
        $this->load->model('model_user_token');

        $token = $this->input->get_post('token', true);
        $strSQL = "SELECT * FROM user_token WHERE token  = '$token'";
        $data = $this->db->query($strSQL)->result();
        if (empty($data)) {
            // $this->jsonView('失敗');
        }

        $sql_time = 'select * from system where `key` =\'bill_time\'';
        $result_time = $this->db->query($sql_time)->result();
        $bill_time = $result_time[0]->value;

        $sdate = date('Y-m-d') . ' ' . $bill_time;
        $edate = date('Y-m-d H:i:s', strtotime($sdate . "+1 days"));

        if (time() < strtotime(date('Y-m-d') . ' ' . $bill_time)) {
            $sdate = (int) date('w') == 1 ? date('Y-m-d H:i:s', strtotime("-3 day", strtotime($sdate))) : date('Y-m-d H:i:s', strtotime("-1 day", strtotime($sdate)));
            $edtat = date('Y-m-d H:i:s', strtotime("-1 day", strtotime($edate)));
        }
//增價後台操作取得訂單邏輯 1070223 magus
if($data[0]->ctl_uid!=0){
            $user_id = $data[0]->ctl_uid;
}else{
        $user_id = $data[0]->user_id;
}

        if (empty($user_id)) {
            return;
        }


        $strSQL_M = "select * from (
            select 
                    a.id pre_id, 
                    '' order_id,
                    a.amount,
                    '' price,
                    a.up_down,
                    a.status,
                    a.action_time ,
                    a.finish_time,
                    b.code,
                    b.name,
                    b.last_order_date,
                    c.user_id,
                    'close_order' type,
                    a.type order_type,
                    a.now_price,
                    0 isStore,
                    a.product_code,
                    a.amount remaining_amount,
                    a.up_limit,
                    a.down_limit,
                    a.create_date,
                    '' limit_price,
		    '' isFast,
                    '' is_trans_order,
   		     a.is_admin,
		    '' memo,
		    '' reverse_up_limit	
                from close_order a
                left join product b on(a.product_code=b.code)
                left join user c on(a.user_id=c.user_id)
		where a.status = 0
                    and is_delete=0
                
                    and a.user_id in(" . $user_id . ")
        union 
                SELECT
                    a.pre_id, 
                    a.order_id,
                    a.amount,
                    a.price,
                    a.up_down,
                    a.status,
                    a.action_time,
                    a.finish_time,
                    b.code,
                    b.name,
                    b.last_order_date,
                    c.user_id,
                    'orders' type,
                    a.type order_type,
                    a.now_price,
                    a.isStore,
                    a.product_code,
                    a.remaining_amount,
                    a.up_limit,
                    a.down_limit,
                    a.create_date,
                    a.price limit_price,
		    a.isFast,
		    a.is_trans_order,
            	    a.is_admin,
		    a.memo,
		    a.reverse_up_limit
	    FROM orders a
            left join product b on(a.product_code = b.code)
            left join user c on(c.user_id = a.user_id) 
	    where a.status !=1 and a.is_delete =0
                    
                    and a.user_id in(" . $user_id . ")
                        
        union 
                SELECT
                    a.pre_id, 
                    a.order_id,
                    a.amount,
                    a.price,
                    a.up_down,
                    a.status,
                    a.action_time,
                    a.finish_time,
                    b.code,
                    b.name,
                    b.last_order_date,
                    c.user_id,
                    'delete_order' type,
                    a.type order_type,
                    a.now_price,
                    a.isStore,
                    a.product_code,
                    a.remaining_amount,
                    a.up_limit,
                    a.down_limit,
                    a.create_date,
                    a.price limit_price,
		    a.isFast,
		    a.is_trans_order,
            	    a.is_admin,
		    a.memo,
		    a.reverse_up_limit
	    FROM orders a
            left join product b on(a.product_code = b.code)
            left join user c on(c.user_id = a.user_id) 
	    where a.status !=1 and a.is_delete =1 and a.user_id in(" . $user_id . ")

        union 
                select 
                    a.pre_id, 
                    '' order_id,
                    a.amount,
                    '' price,
                    a.up_down,
                    a.status,
                    a.action_time ,
                    a.finish_time,
                    b.code,
                    b.name,
                    b.last_order_date,
                    c.user_id,
                    'pre_orders' type,
                    a.type order_type,
                    a.now_price,
                    0 isStore,
                    a.product_code,
                    a.amount remaining_amount,
                    a.up_limit,
                    a.down_limit ,
                    a.create_date,
                    a.limit_price,
		    '' isFast,
		    '' is_trans_order,
		    a.is_admin,
		    '' memo,
		    '' reverse_up_limit
                from pre_orders a
                left join product b on(a.product_code=b.code)
                left join user c on(a.user_id=c.user_id)
		where a.status = 0

                    and a.user_id in(" . $user_id . ")
        union 
                select 
                    a.pre_id,
                    a.order_id,
                    a.amount,
                    a.price,
                    a.up_down,
                    a.status,
                    a.action_time,
                    a.finish_time,
                    b.code,
                    b.name,
                    b.last_order_date,
                    c.user_id,
                    'sto_orders' type,
                    a.type order_type,
                    '' now_price,
                    a.isStore,
                    a.product_code,
                    a.amount remaining_amount,
                    a.up_limit ,
                    a.down_limit ,
                    a.create_date,
                    a.price limit_price,
		    '' isFast,
		    '' is_trans_order, 
		    a.is_admin,
     		    d.memo,
		    d.reverse_up_limit
                from sto_orders a 
                    left join product b on(a.product_code=b.code)
                    left join user c on(a.user_id=c.user_id)
                    left join orders d on(a.order_id = d.order_id)
		    where a.status = 0 and a.pay_status=0
                            and a.user_id in(" . $user_id . ")
        ) a 
            where a.create_date >='" . $sdate . "' and a.create_date <'" . $edate . "'
            order by a.action_time desc";
        $get_array_oder = $this->db->query($strSQL_M)->result();



        $user_product = "select a.*,b.code_date from user_product as a join product as b on (b.code = a.product_code) where a.user_id =$user_id";
        $user_product = $this->db->query($user_product)->result();
        $user_product_tmp = [];
        foreach ($user_product as $key => $value) {
            array_push($user_product_tmp, [
                'id' => $value->id,
                'user_id' => $value->user_id,
                'show_order_limit_price_profit' => $value->show_order_limit_price_profit,
                'show_order_market_price_profit' => $value->show_order_market_price_profit,
                'show_order_minute_price_profit' => $value->show_order_minute_price_profit,
                'accept_stop_order' => $value->accept_stop_order,
                'product_code' => $value->product_code,
                'stop_loss' => $value->stop_loss,
                'stop_profit' => $value->stop_profit,
            ]);
        }

        $reData['user_product'] = $user_product_tmp;
        $reData['array_oder'] = $get_array_oder;
        $this->jsonView($reData);
    }

    function get_unorder() {
        ini_set("display_errors", 0);
        $this->load->model('model_user_token');

        $token = $this->input->get_post('token', true);
        $strSQL = "SELECT * FROM user_token WHERE token  = '$token'";
        $data = $this->db->query($strSQL)->result();
        if (empty($data)) {
            // $this->jsonView('失敗');
        }

        $sql_time = 'select * from system where `key` =\'bill_time\'';
        $result_time = $this->db->query($sql_time)->result();
        $bill_time = $result_time[0]->value;

        $sdate = date('Y-m-d') . ' ' . $bill_time;
        $edate = date('Y-m-d H:i:s', strtotime($sdate . "+1 days"));

        if (time() < strtotime(date('Y-m-d') . ' ' . $bill_time)) {
            $sdate = (int) date('w') == 1 ? date('Y-m-d H:i:s', strtotime("-3 day", strtotime($sdate))) : date('Y-m-d H:i:s', strtotime("-1 day", strtotime($sdate)));
            $edtat = date('Y-m-d H:i:s', strtotime("-1 day", strtotime($edate)));
        }


        $user_id = $data[0]->user_id;
        if (empty($user_id)) {
            return;
        }


        $strSQL_M = "select 
                        a.order_id,
                        a.up_down,
                        a.price,
                        a.amount,
                        a.type,
                        a.status,
                        a.action_time,
                        a.finish_time,
                        a.remaining_amount,
                        a.pre_id,
                        a.close_price,
                        a.is_trans_order,
                        a.offline_day,
                        b.name,
                        b.code,
                        
                        b.price price_agent ,
                        b.price_large,
                        b.price_med,
                        b.price_small,
                        b.price_mini,

                        c.user_id,

                        g.charge_type,
                        g.buy_charge,
                        g.buy_charge_large,
                        g.buy_charge_med,
                        g.buy_charge_small,
                        g.buy_charge_mini,

                        g.sell_charge,
                        g.sell_charge_large,
                        g.sell_charge_med,
                        g.sell_charge_small,
                        g.sell_charge_mini,

                        a.product_code,
                        a.remaining_amount,

                        a.up_limit,
                        a.down_limit,
					
                        (select money from orders_preserve_money h where h.orders_id = a.order_id and h.status=0 order by h.create_date desc limit 0,1 ) money,
                    
                        a.create_date,
                    	a.isFast,
			a.memo,
    			a.reverse_up_limit	
                    from orders a
                    left join product b on(a.product_code=b.code)
                    left join user c on(a.user_id=c.user_id)
                    left join user_product g on(a.user_id=g.user_id and b.code=g.product_code)
            
                    where a.status in(0,1,2)
                            and a.is_delete=0
                            and a.user_id in(" . $user_id . ")
                        
                          and a.create_date >='" . $sdate . "' and a.create_date <'" . $edate . "'";
        $get_array_oder = $this->db->query($strSQL_M)->result();


        $strSQL_L = "select
                    a.profit_loss,
                    a.total_charge,
                    e.name, 
                    a.rel_id,
                    b.order_id newID,
                    c.order_id stoID,
                    b.type type1,
                    c.type type2,
                    b.amount,
                    a.amount sto_amount,
                    b.remaining_amount,

                    b.price,
                    c.price stoPrice,
                    b.create_date buyTime,
                    c.create_date sellTime,
                    e.price price_agent ,
                    e.price_large,
                    e.price_med,
                    e.price_small,
                    e.price_mini,
                    e.code,

                    b.up_down,
                    a.user_id,
                    g.charge_type,
                    g.buy_charge,
                    g.buy_charge_large,
                    g.buy_charge_med,
                    g.buy_charge_small,
                    g.sell_charge,
                    g.sell_charge_large,
                    g.sell_charge_med,
                    g.sell_charge_small,
		    b.isFast,
		    b.reverse_up_limit	
                    from orders_rel a
                        left join orders b on(a.user_order_id= b.order_id and b.is_delete =0)
                        left join orders c on(a.store_order_id= c.order_id and c.is_delete =0)
                        left join product e on(b.product_code=e.code)
                        left join user f on(a.user_id=f.user_id)
                        left join user_product g on(a.user_id=g.user_id and e.code=g.product_code)

                    where a.pay_status=0 and a.is_delete =0  and  ( b.create_date >='" . $sdate . "' and b.create_date <'" . $edate . "'
                            
                        )
                    and a.user_id in(" . $user_id . ")
                    order by newID,stoID";
        $get_array_oder_list = $this->db->query($strSQL_L)->result();
        
        $user_product = "select a.*,b.code_date from user_product as a join product as b on (b.code = a.product_code) where a.user_id =$user_id";
        $user_product = $this->db->query($user_product)->result();
        $user_product_tmp = [];
        foreach ($user_product as $key => $value) {
            array_push($user_product_tmp, [
                'id' => $value->id,
                'user_id' => $value->user_id,
                'show_order_limit_price_profit' => $value->show_order_limit_price_profit,
                'show_order_market_price_profit' => $value->show_order_market_price_profit,
                'show_order_minute_price_profit' => $value->show_order_minute_price_profit,
                'accept_stop_order' => $value->accept_stop_order,
                'product_code' => $value->product_code,
                'stop_loss' => $value->stop_loss,
                'stop_profit' => $value->stop_profit,
            ]);
        }

        $reData['user_product'] = $user_product_tmp;
        $reData['array_oder'] = $get_array_oder;
        $reData['list'] = $get_array_oder_list;
        $this->jsonView($reData);
    }

    function updateToken() {
//        $user = $_SESSION['user'];
        $this->load->model('model_user_token');

        $token = $this->input->get_post('token', true);
        $strSQL = "SELECT * FROM user_token WHERE token  = '$token'";
        $data = $this->db->query($strSQL)->result();
        if (empty($data)) {
            $msg = [];
            $msg['isSuccess'] = false;
            $msg['msg'] = '登入過期或重複登入!';
            $this->jsonView($msg);
        }
        $user = null;
        if (isset($_SESSION['end_user'])) {
            $user = $_SESSION['end_user'];
        }

//        var_dump($user);
        if (!$user) {
            $user = $this->model_operation->getUser($token);
        }
        $device = check_mobile() == true ? 2 : 1;
        if (!$user) {
            $result['isSuccess'] = false;
            $this->jsonView($result);
        }
        $_SESSION['user'] = $user;
//        var_dump($_SESSION['user']);


        $uid = $data[0]->user_id;
        $_date = date('Y-m-d H:i:s');

        $mapData = array();
        $mapData['token'] = $token;
        $mapData['update_date'] = $_date;
        $mapData['ip'] = getIp();
        $mapData['enable'] = 1;
        $mapData['device'] = $device;
        $this->model_user_token->updateUserToken($uid, $mapData);
        $reData = array();
        $reData['msg'] = "success";
        $reData['token'] = $token;
        $this->jsonView($reData);
    }

    function userReport() {
        $token = $this->input->get_post('token', TRUE);
        $strSQL = "SELECT * FROM user_token WHERE token  = '$token'";
        $data = $this->db->query($strSQL)->result();
        if (empty($data)) {
            $this->jsonView('失敗');
        }
        $user_id = $data[0]->user_id;
        $date = $this->input->get_post('date', TRUE);
        $sdate = $this->input->get_post('po_sdate', TRUE);
        $edate = $this->input->get_post('po_edate', TRUE);
        $time = strtotime($date);

        /*
          if ( $time > 0 ) {
          $sdate = date('Y-m-d',$time);
          $edate = date('Y-m-d',$time+86400);
          } else {
          $sdate = null;
          $edate = null;
          }
         */
//        $sdate = $this->input->get_post('bill_sdate', TRUE);
//        $edate = $this->input->get_post('bill_edate', TRUE);

        $result = $this->model_DataTableList->getUserReport($user_id, $sdate, $edate);
        //print_r($result);
        $this->jsonView($result);
    }

    function getUserMoney() {
        $token = $this->input->get_post('token', TRUE);
        $strSQL = "SELECT * FROM user_token WHERE token  = '$token'";
        $data = $this->db->query($strSQL)->result();
        if (empty($data)) {
            $this->jsonView('失敗');
        }
        $user_id = $data[0]->user_id;

        $uids = [$user_id];
        //先拿cache的值
        $tmp = $this->cache->memcached->get('user_money_list');
//        echo json_encode($tmp);
        $result = [];
        $notFoundUids = [];
        foreach ($uids as $uid) {

            if (isset($tmp[$uid])) {

                $result[$uid] = $tmp[$uid]['money'];
            } else {
                $notFoundUids[] = $uid;
            }
        }

        if (count($notFoundUids) > 1)
            $uidsStr = implode(",", $notFoundUids);
        else if (count($notFoundUids) == 1)
            $uidsStr = $notFoundUids[0];
        else
            $uidsStr = "";

        if (!empty($notFoundUids)) {
            $strSQL = "SELECT (user_money +money_deposit) as user_money ,user_id FROM user_config WHERE user_id  in  ($uidsStr)";
            $data = $this->db->query($strSQL)->result();

            foreach ($notFoundUids as $uid) {
                foreach ($data as $row) {
                    if ($row->user_id == $uid) {
                        $result[$uid] = $row->user_money;
                    }
                }
            }

//            foreach ($notFoundUids as $uid) {
//                if (array_key_exists($uid, $result) == false) {
//                    $result[$uid] = 0;
//                }
//            }
        }
        $ret = [];
        $ret['user_money'] = $result[$user_id];
        $ret['msg'] = 'success';
//array(3) { [1441]=> int(69200) [1001]=> int(20000) [123]=> int(0) } uid=>money
        $this->jsonView($ret);
    }

    function testMagus() {
//        $this->load->model( 'model_login_info');
//        $account = $_SESSION['end_user']['account'];
//        $user_id = $_SESSION['end_user']['user_id'];
//        $this->insertLoginInfo($account,$user_id);
    }

}
