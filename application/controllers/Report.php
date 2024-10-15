<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class report extends MY_Controller {
    
    function __construct()
    {
      parent::__construct(); 
      $this->load->model( 'model_user_config');
      /*$this->load->model( 'model_product');
      $this->load->model( 'model_operation');
      $this->load->model( 'model_DataTableList');
      $this->load->model( 'model_advice_type');*/
      $this->load->driver('cache');
    }



    function index()
    {
        $account =  $this->input->get_post('id', TRUE);
         $list = array();

        if(isset($account))
        {

            $parent = $this->mydb->queryRow('select * from user where account=\''.$account . '\'' );


            $sql = 'select * from user where parent_user_id =\''. $parent['user_id'] .'\' and user_group in(1,2) order by user_group';

            $user_result = $this->mydb->queryArray($sql);

            foreach($user_result as $user)
            {
                $user_config =  $this->mydb->queryRow('select * from user_config where user_id='.$user['user_id']);


                //使用者抓使用者帳單
                if($user['user_group'] ==1)
                {
                    $sql_bill = 'select * from user_bill where user_id ='. $user['user_id'] . ' and pay_status=0 ';
                    $user_bill = $this->mydb->queryArray($sql_bill);
                    foreach($user_bill as $bill)
                    {

                        //新增一筆資料
                        $item = array();
                        $item['user_group'] = $user['user_group'];
                        $item['parent'] = $parent['name'] ;
                        $item['user_id'] = $user['user_id'];
                        $item['name'] = $user['name'] . '('.  $user['account']  .')';
                        $item['total_profit'] = $bill['total_profit'];
                        $item['total_charge'] = $bill['total_charge'];
                        $item['total_amount'] = $bill['total_amount'];
                        $item['percentage'] = 100;


                        $item['date'] = $bill['date'];
                    
                        $list[] = $item;
                    }
                }

                //代理抓代理帳單
                if($user['user_group'] == 2)
                {
                    $sql_bill = 'select * from agent_bill where user_id ='. $user['user_id'] . ' and pay_status = 0 ';
                    $user_bill = $this->mydb->queryArray($sql_bill);
                    foreach($user_bill as $bill)
                    {

                        //新增一筆資料
                        $item = array();
                        $item['user_group'] = $user['user_group'];
                        $item['parent'] = $parent['name'];
                        $item['user_id'] = $user['user_id'];
                        $item['name'] = $user['name'] . '('.  $user['account']  .')';
                        $item['total_profit'] = $bill['total_profit'];
                        $item['total_charge'] = $bill['total_charge'];
                        $item['total_amount'] = $bill['total_amount'];
                        $item['percentage'] = $user_config['tax'];
                        
                        $item['date'] = $bill['date'];
                    
                        $list[] = $item;

                    }
                    
                }

            }
        }


        $mapData = array();
        $mapData['list'] = $list;
        $this->View('view_report', $mapData); 
    }


  



}


