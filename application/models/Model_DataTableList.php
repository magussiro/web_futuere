<?php
class model_DataTableList extends MY_Model 
{
    
    public function __construct(){
        parent::__construct('account');
       date_default_timezone_set("Asia/Taipei");
    }

    public function getUserID ( $token, $flag = false )
    {
        $sql2 = 'select * from user_token where token= ? ';
        $user_token =  $this->mydb->queryRow($sql2, $token );

        //新增驗證
        if($user_token ==false)
            return false;
        
        if ( !$flag ) return $user_token['user_id'];
        
        return isset($user_token['ctl_uid']) && (int)$user_token['ctl_uid'] > 0 ? $user_token['ctl_uid'] : $user_token['user_id'];
    }

    public function getnewprice($code) {
        $strSQL= "SELECT * FROM `now_price` WHERE `product_code` LIKE '$code'";

        return $this->mydb->queryArray($strSQL);
    }
    

    public function getProductList($intStart,$intLength,$token)
    {
        $user_id = $this->getUserID($token);

        $strSQL	= "select a.id,a.name,a.open_time,a.day_time,a.close_time
                        ,a.open_time2,a.close_time2
                        ,a.open_time3,a.close_time3
                        ,a.code,a.source_from,b.is_show,a.source_place,a.code  
                    from product a
                    left join user_product b on(a.code = b.product_code && b.user_id= ? )
                   ";
	
        if ($intLength>=1) {
            $strSQL .= " LIMIT $intStart , $intLength ";
        }

        return $this->mydb->queryArray($strSQL, $user_id);
    }


    public function getPersonalInfoList($intStart,$intLength , $token)
    {
        $user_id = $this->getUserID($token);

        $strSQL	= "select * from user_product a
                    left join product b on(a.product_code = b.code)
                    where a.user_id =  " . $user_id . ' ';
       if ($intLength>=1) {
		  $strSQL .= " LIMIT $intStart , $intLength ";
		}
		return $this->mydb->queryArray($strSQL);
    }


    public function getDepositList()
    {
        $token = $this->input->get_post('token', TRUE);

         $sdate = $this->input->get_post('sdate', TRUE);
         $edate = $this->input->get_post('edate', TRUE);
        if($edate !=null)
        {
            $edate = str_replace('-', '/', $edate);
            $edate = date('Y-m-d',strtotime($edate . "+1 days"));
        }

        //datatable必傳參數
         $echo = $this->input->get_post('sEcho', TRUE);
		 $intStart = $this->input->get_post('iDisplayStart', TRUE); 
		 $intLength = $this->input->get_post('iDisplayLength', TRUE);


        $user_id = $this->getUserID($token);

        $strSQL	= "select * from bill_history 
                    where c_uid =  " . $user_id  ;

        if($sdate !=null)
        {
            $strSQL	.= ' and created_at >= UNIX_TIMESTAMP(\''. $sdate .'\') ';
        }
        if($edate !=null)
        {
            $strSQL	.= ' and created_at < UNIX_TIMESTAMP(\''. $edate .'\') ';
        }

        //echo $strSQL;

        //先取得不分頁總數量
        $pageResult =  $this->mydb->queryArray($strSQL);
        $total = count($pageResult);

        //取得分頁後資料
       if ($intLength>=1) {
		  $strSQL .= " LIMIT $intStart , $intLength ";
		}
        $aaData =  $this->mydb->queryArray($strSQL);
        if(!$aaData)
        {
            $aaData = array();
        } 
		//回傳dattable需要欄位
        $mapMerge = array();
		$mapMerge['sEcho']			= $echo;	
	    $mapMerge['iTotalRecords'] = $total;
		$mapMerge['iTotalDisplayRecords']	= $total;
		$mapMerge['aaData']		= $aaData;

        return $mapMerge;

    }



    public function getLogList()
    {
         $token = $this->input->get_post('token', TRUE);

         //沒塞token可以全拿
         if($token == null)
             return false;
         $user_id = $this->getUserID($token);
         if($user_id == false)
             return false;
        $act = $this->input->get_post('action',true);
          $sdate = $this->input->get_post('sdate', TRUE);
         $edate = $this->input->get_post('edate', TRUE);
        if($edate !=null)
        {
            $edate = str_replace('-', '/', $edate);
            $edate = date('Y-m-d',strtotime($edate . "+1 days"));
        }

        //datatable必傳參數
         $echo = $this->input->get_post('sEcho', TRUE);
		 $intStart = $this->input->get_post('iDisplayStart', TRUE); 
		 $intLength = $this->input->get_post('iDisplayLength', TRUE);

         //查詢資料庫語法
        $strSQL	= "select a.id,a.user_id,b.name,a.create_date,a.memo,a.type_ch,b.account ,a.ip
                    from user_action_log a
                    left join user b on(a.user_id=b.user_id)
                    left join user_action c on ( a.type_ch = c.name )
                    where a.target_id =  " . $user_id . ' and c.grp = 1 and c.is_enable = 1';
        if($sdate !=null)
        {
            $strSQL	.= ' and a.create_date >= \''. $sdate .'\' ';
        }
        if($edate !=null)
        {
            $strSQL	.= ' and a.create_date < \''. $edate .'\' ';
        }
	if ( $act > 0 ) $strSQL .= " and c.id = $act";
        $strSQL .= ' order by a.create_date desc ';
        //先取得不分頁總數量
        $pageResult =  $this->mydb->queryArray($strSQL);
        $total = count($pageResult);

        //取得分頁後資料
       if ($intLength>=1) {
		  $strSQL .= " LIMIT $intStart , $intLength ";
		}
               // var_dump($strSQL);
        $aaData =  $this->mydb->queryArray($strSQL);
        if(!$aaData)
        {
            $aaData = array();
        }

        //1061213 magus
        //"除非下次登錄換IP  否則都以上次登入IP 顯示" =>拿上一次的row處理
        //目前沒有辦法改排序，如果要改要在另外處理
        //M1
        //會有初始IP的問題，先抓此用戶的第一筆有IP的來處理
        $sql = "select ip from user_action_log where user_id =".$user_id." and ip !=''";
        $tmp = $this->mydb->queryRow($sql);
        $ip = $tmp['ip'];
        usort($aaData,["Model_DataTableList",'cp_id']);
        foreach ($aaData as$k=> $row){

            if($aaData[$k]['ip']!=='' && $row['user_id']==$user_id){
                $ip = $aaData[$k]['ip'];
            }elseif ($aaData[$k]['ip']===''&& $row['user_id']==$user_id){
                $aaData[$k]['ip']=$ip;
            }

        }
        usort($aaData,["Model_DataTableList",'cp_rid']);

		//回傳dattable需要欄位
        $mapMerge = array();
		$mapMerge['sEcho']			= $echo;	
	    $mapMerge['iTotalRecords'] = $total;
		$mapMerge['iTotalDisplayRecords']	= $total;
		$mapMerge['aaData']		= $aaData;
        return $mapMerge;
    }
    //比較子
    private function cp_id($a,$b){

        if($a['id'] == $b['id'])
            return 0;
        return $a['id'] >$b['id']?1:-1;
    }
    private function cp_rid($a,$b){

        if($a['id'] == $b['id'])
            return 0;
        return $a['id'] >$b['id']?-1:1;
    }


    public function getAdvicerList($sdate,$edate,$teachers ,$advice_type) //查找老師
    {
        //把查詢結束日加一天，表示含當天
        if($edate !=null)
        {
            $edate = str_replace('-', '/', $edate);
            $edate = date('Y-m-d',strtotime($edate . "+1 days"));
        }

         $token = $this->input->get_post('token', TRUE);
         $user_id = $this->getUserID($token);

         //查詢資料庫語法
        $strSQL	= "select a.id,c.name as type,a.create_date,a.msg,b.name 
                    from advice a 
                    left join teacher b on(a.teacher_id=b.id)  
                    left join advice_type c on(a.type_id=c.id)
                        where a.deleted =0 ";


        if($sdate !=null)
        {
            $strSQL	.= ' and a.create_date >= \''. $sdate .'\' ';
        }
        if($edate !=null)
        {
         
            $strSQL	.= ' and a.create_date < \''. $edate .'\' ';
        }


        //有選擇老師
        $strSQL .= ' and b.id in ('. $teachers .')';
       

       if($advice_type !=null)
        {
                $strSQL .= ' and a.type_id  ='. $advice_type ;           
        }
        $strSQL .=' order by a.create_date desc ';

        return $this->addParam($strSQL);
    }
    
    public function getBillList ( $user_id ,$sdate, $edate )
    {
        $data_output = true;
        if(is_null($sdate) && is_null($edate)) $data_output = false;
        
        //把查詢結束日加一天，表示含當天
        if($edate !=null)
        {
//            $edate = str_replace('-', '/', $edate);
            $edate = date('Y-m-d',strtotime($edate . "+1 days"));
        }

        $token = $this->input->get_post('token', TRUE);
        $user_id = $this->getUserID($token,true);

        //datatable必傳參數
        $echo = $this->input->get_post('sEcho', TRUE);
        $intStart = $this->input->get_post('iDisplayStart', TRUE); 
        $intLength = $this->input->get_post('iDisplayLength', TRUE);

         //查詢資料庫語法
        $strSQL	= "select * from user_bill where user_id= ? ";
       
        if($sdate !=null)
        {
            $strSQL	.= ' and date >= \''. $sdate .'\' ';
        }
        if($edate !=null)
        {
            $strSQL	.= ' and date < \''. $edate .'\' ';
        }

        //不執行查詢
        if(! $data_output){
            $total = 0;
            $newArray = [];
        }else{
            //先取得不分頁總數量
            $pageResult =  $this->mydb->queryArray($strSQL ,$user_id);
            $total = count($pageResult);
    
            //取得分頁後資料
            if ($intLength>=1) {
                $strSQL .= " LIMIT $intStart , $intLength ";
    		}
            $aaData =  $this->mydb->queryArray($strSQL,$user_id);
            if(!$aaData )
            {
                $aaData = array();
            }
    
    
            $newArray = array();
            foreach($aaData as $item)
            {
                $newItem = array();
                $newItem = $item;
                /*
    	    $sql2 = 'SELECT distinct c.money,c.orders_id 
                            FROM user_bill_detail a
                            left join orders_rel b on(a.rel_id=b.rel_id)
                            left join orders_preserve_money c on(c.orders_id = b.user_order_id ) 
                                where a.bill_id= \''. $item['id'] .'\' and c.id IS NOT NULL';
    	    */
    	    //$sql2 = 'SELECT preserve_money FROM `user_bill` WHERE `id` = \''. $item['id'] .'\'';
                
                $sql2 = 'SELECT 
                            sum(case when b.code="negative" then b.money else 0 end) as adj_money, 
                            sum(case when b.code="max_win" then b.money else 0 end) as max_win ,
                            a.preserve_money 
                        FROM user_bill as a 
                            LEFT JOIN user_billing_adjust as b ON (b.bill_id = a.id) 
                        WHERE a.id = \''. $item['id'] .'\'';
    	    
                $bill_preserve_money = 0;
                $max_win = 0;
                $adj_money = 0;
                $result =  $this->mydb->queryArray($sql2);
                
                foreach($result as $preserve)
                {
                    if(isset($preserve['preserve_money']) && $preserve['preserve_money'] != null)
                    {
                        $bill_preserve_money += $preserve['preserve_money'];
                    }
                    
                    if(isset($preserve['adj_money']) && $preserve['adj_money'] != null)
                    {
                        $adj_money += $preserve['adj_money'];
                    }
                    
                    if(isset($preserve['max_win']) && $preserve['max_win'] != null)
                    {
                        $max_win += $preserve['max_win'];
                    }
                }
                
                $newItem['money'] = $bill_preserve_money ;
                $newItem['adj_money'] = $adj_money ;
                $newItem['max_win'] = $max_win ;
        	    $newArray[] =  $newItem;
            } 
        }

		//回傳dattable需要欄位
        $mapMerge = array();
		$mapMerge['sEcho']         = $echo;	
	    $mapMerge['iTotalRecords'] = $total;
		$mapMerge['iTotalDisplayRecords']	= $total;
		$mapMerge['aaData']		= $newArray;
        return $mapMerge;
    }

    public function historyQuoteList()
    {
         $token = $this->input->get_post('token', TRUE);
         $user_id = $this->getUserID($token);

        //datatable必傳參數
         $echo = $this->input->get_post('sEcho', TRUE);
		 $intStart = $this->input->get_post('iDisplayStart', TRUE); 
		 $intLength = $this->input->get_post('iDisplayLength', TRUE);

         //查詢資料庫語法
        $strSQL	= "select * from user_action_log a
                    left join user b on(a.user_id=b.user_id)
                    where a.user_id =  " . $user_id . ' ';


        //先取得不分頁總數量
        $pageResult =  $this->mydb->queryArray($strSQL);
        $total = count($pageResult);

        //取得分頁後資料
       if ($intLength>=1) {
		  $strSQL .= " LIMIT $intStart , $intLength ";
		}
        $aaData =  $this->mydb->queryArray($strSQL);
        if(!$aaData)
        {
            $aaData = array();
        } 

		//回傳dattable需要欄位
        $mapMerge = array();
		$mapMerge['sEcho']			= $echo;	
	    $mapMerge['iTotalRecords'] = $total;
		$mapMerge['iTotalDisplayRecords']	= $total;
		$mapMerge['aaData']		= $aaData;
        return $mapMerge;
    }

    function addParam($sql)
    {
        //datatable必傳參數
        $echo = $this->input->get_post('sEcho', TRUE);
		$intStart = $this->input->get_post('iDisplayStart', TRUE); 
		$intLength = $this->input->get_post('iDisplayLength', TRUE);

        //先取得不分頁總數量
        $pageResult =  $this->mydb->queryArray($sql);
        $total = count($pageResult);

        //取得分頁後資料
        if ($intLength>=1) {
		  $sql .= " LIMIT $intStart , $intLength ";
		}
        $aaData =  $this->mydb->queryArray($sql);
        if(!$aaData)
        {
            $aaData = array();
        } 
		//回傳dattable需要欄位
        $mapMerge = array();
		$mapMerge['sEcho']			= $echo;	
	    $mapMerge['iTotalRecords'] = $total;
		$mapMerge['iTotalDisplayRecords']	= $total;
		$mapMerge['aaData']		= $aaData;
        return $mapMerge;
    }

    function getAnnounceList()
    {
        $sdate = $this->input->get_post('sdate', TRUE);
        $edate = $this->input->get_post('edate', TRUE);
        if($edate !=null)
        {
            //$edate = str_replace('-', '/', $edate);
            $edate = date('Y-m-d',strtotime($edate . "+1 days"));
        }


         $token = $this->input->get_post('token', TRUE);
         $user_id = $this->getUserID($token);

        //datatable必傳參數
         $echo = $this->input->get_post('sEcho', TRUE);
		 $intStart = $this->input->get_post('iDisplayStart', TRUE); 
		 $intLength = $this->input->get_post('iDisplayLength', TRUE);


         $sql_u = 'select * from user where user_id='.$user_id;
         $user = $this->mydb->queryRow($sql_u);

         //查詢資料庫語法
        $strSQL	= "select content,create_date,id,'公告' as type from system_message where 1=1 ";
        $strSQL .= " union select content,time,id,'上層公告' as type from announce where type != 1 and user_id= " .$user['parent_user_id'];

        //$strSQL .=' union select response,' 
        if($sdate !=null)
        {
            $strSQL	.= ' and create_date >= \''. $sdate .'\' ';
        }
        if($edate !=null)
        {
            $strSQL	.= ' and create_date < \''. $edate .'\' ';
        }

        //先取得不分頁總數量
        $pageResult =  $this->mydb->queryArray($strSQL);
        $total = count($pageResult);

        //取得分頁後資料
       if ($intLength>=1) {
		  $strSQL .= " LIMIT $intStart , $intLength ";
		}
        $aaData =  $this->mydb->queryArray($strSQL);
        if(!$aaData)
        {
            $aaData = array();
        } 

		//回傳dattable需要欄位
        $mapMerge = array();
		$mapMerge['sEcho']			= $echo;	
	    $mapMerge['iTotalRecords'] = $total;
		$mapMerge['iTotalDisplayRecords']	= $total;
		$mapMerge['aaData']		= $aaData;
        return $mapMerge;
    }



    public function getUserReport($user_id, $sdate, $edate) {



        //把查詢結束日加一天，表示含當天
        if ($edate != null||strtotime($sdate) ==strtotime($edate)) {
            $edate = str_replace('-', '/', $edate);
            $edate = date('Y-m-d', strtotime($edate . "+1 days"));
        }
        //106 12 19 Magus
        //增加結算判斷時間條件
        $bill_time = $this->mydb->queryArray("select s.* from system as s where s.key = 'bill_time'")[0]['value'];
        $sdate .= ' ' . $bill_time;
        $edate .= ' ' . $bill_time;
        $sttamp = strtotime($sdate);
        $week = date('w', $sttamp);
        //增加如果初始日期是星期一，往回抓到禮拜五
        if ($week == '1') {
            $sttamp -= 86400 * 2;
            $sdate = date('Y-m-d', $sttamp);
        }

        $token = $this->input->get_post('token', TRUE);
        //$user_id = $this->getUserID($token);
        //datatable必傳參數
        $echo = $this->input->get_post('sEcho', TRUE);
        $intStart = $this->input->get_post('iDisplayStart', TRUE);
        $intLength = $this->input->get_post('iDisplayLength', TRUE);


        //基本下單資訊:會員
        $strSQLUser = "SELECT (a.large_charge + a.med_charge +a.small_charge + a.mini_charge) as order_amount,
			b.user_id, a.default_money, a.user_money,a.preserve_money, a.parent_account, a.account, b.name,a.create_date ,a.report_type,  a.user_group, a.bill_range_money,
			a.large_charge, a.med_charge,a.small_charge,a.mini_charge,a.total_profit,a.profit
		FROM
			report_history as a LEFT JOIN user as b ON (a.account = b.account)
		WHERE
			b.user_id = '$user_id' and (b.user_group = 1 or b.user_group =31)  ";

        if ($sdate != null) {
            $strSQLUser .= ' and a.update_time >= \'' . $sdate . '\' ';
        }
        if ($edate != null) {
            $strSQLUser .= ' and a.update_time <= \'' . $edate . '\' ';
        }
        $strSQLUser.='ORDER BY a.rh_id desc';
        $aaData = $this->mydb->queryArray($strSQLUser); //全部對帳單，下部的全部資料





        //查詢資料庫語法
//        $strSQL = "select a.*,b.account,b.name,c.default_money,d.money as preserve_money
//			from report_history as a
//			left join user as b on (b.account = a.account)
//			left join user_config as c on(b.user_id = c.user_id)
//			left join orders_preserve_money as d on (d.user_id = b.user_id  and d.create_date >= '$sdate'  and a.create_date < '$edate' )
//			where b.user_id= $user_id
//			GROUP by a.account";
//        if ($sdate != null) {
//            $strSQL .= ' and a.create_date >= \'' . $sdate . '\' ';
//        }
//        if ($edate != null) {
//            $strSQL .= ' and a.create_date < \'' . $edate . '\' ';
//        }
//        //106 12 19 magus
//        //改成依據report_type分兩次要，要完後merge
//        $strSQL = "select a.*,b.account,b.name,c.default_money,c.user_money,d.money as preserve_money "
//                . "from report_history as a left join user as b on (b.account = a.account) "
//                . "left join user_config as c on(b.user_id = c.user_id) "
//                . "left join orders_preserve_money as d on (d.user_id = b.user_id and d.create_date >= '" . $sdate . "' and a.create_date < '" . $edate . "' ) "
//                . "where a.report_type = 1 and b.user_id= " . $user_id . " and a.create_date >= '" . $sdate . "' and a.create_date < '" . $edate . "' GROUP by a.create_date";
//        $aaData = $this->mydb->queryArray($strSQL);
//        $strSQL = "select a.*,b.account,b.name,c.default_money,c.user_money,d.money as preserve_money "
//                . "from report_history as a left join user as b on (b.account = a.account) "
//                . "left join user_config as c on(b.user_id = c.user_id) "
//                . "left join orders_preserve_money as d on (d.user_id = b.user_id and d.create_date >= '" . $sdate . "' and a.create_date < '" . $edate . "' ) "
//                . "where a.report_type = 2 and b.user_id= " . $user_id . " and a.create_date >= '" . $sdate . "' and a.create_date < '" . $edate . "' GROUP by a.create_date";
//        $aaData2 = $this->mydb->queryArray($strSQL);
//        $aaData = array_merge($aaData, $aaData2);

//        var_dump($aaData);
//        var_dump($aaData2);
//
//        die;
        //先取得不分頁總數量
        //$pageResult =  $this->mydb->queryArray($strSQL ,$user_id);
        //$total = count($pageResult);
        //print_r($pageResult);
        /*
          //取得分頁後資料
          if ($intLength>=1) {
          $strSQL .= " LIMIT $intStart , $intLength ";
          }
         */
//        var_dump($strSQL);
        //  var_dump($aaData);
        $total = count($aaData);
        if (!$aaData) {
            $aaData = array();
        }





        //  var_dump($aaData);
        //回傳dattable需要欄位
        $mapMerge = array();
        $mapMerge['sEcho'] = $echo;
        $mapMerge['iTotalRecords'] = $total;
        $mapMerge['iTotalDisplayRecords'] = $total;
        $mapMerge['aaData'] = $aaData;
        //print_r($mapMerge);
        return $mapMerge;
    }

    private function cp_date($a, $b) {
        $a_stamp = strtotime($a['create_date']);
        $b_stamp = strtotime($b['create_date']);

        if ($a_stamp == $b_stamp)
            return 0;
        return $a_stamp > $b_stamp ? -1 : 1;
    }




}



