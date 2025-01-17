<?php
class model_operation extends MY_Model {
    
    public function __construct(){
        parent::__construct('account');
    }

    public function advicerList()
    {
        $sql = 'select * from advicer ';
        $result =  $this->mydb->queryArray($sql);
        return $result;
    }  

     public function getTeacherList()
    {
        $sql = ' select * from teacher ';
        $result =  $this->mydb->queryArray($sql );
        return $result;
    }

    public function save_pre_Limit($user_id,$pre_id,$loss ,$profit)
    {
        //寫入log
        $sql = ' select b.name,a.up_limit,a.down_limit 
                        from pre_orders a left join product b on(a.product_code=b.code) 
                        where a.pre_id='.$pre_id;
        $result2 =  $this->mydb->queryRow($sql );

        $new_profit = $result2['up_limit'];
        $new_loss = $result2['down_limit'];

        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $user_id;
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $user_id;
        }

        $mapData = array();
        if($profit !=0)
        {
            $mapData['up_limit'] = $profit;
            $new_profit =  $profit;
        }
        if($loss !=0)
        {
            $mapData['down_limit'] = $loss;
            $new_loss = $loss;
        }
        //$mapData['autoStore'] = 1;

        $result = $this->_db->update('pre_orders',array('pre_id'=>$pre_id),$mapData);


        $this->log($adm_uid,$user_id,getIp(),'saveLimit','修改損利',"修改掛單,".$result2['name'].'，序號:'.$pre_id.'，損:'.$new_loss . '，利:'.$new_profit);

    }

    public function save_close_Limit($user_id,$pre_id,$loss ,$profit)
    {   
        //寫入log
        $sql = ' select b.name,a.up_limit,a.down_limit 
                        from close_order a left join product b on(a.product_code=b.code) 
                        where a.id='.$pre_id;
        $result2 =  $this->mydb->queryRow($sql );
        
        $new_profit = $result2['up_limit'];
        $new_loss = $result2['down_limit'];
        
        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $user_id;
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $user_id;
        }
        
        $mapData = array();
        if($profit !=0)
        {   
            $mapData['up_limit'] = $profit;
            $new_profit =  $profit;
        }
        if($loss !=0)
        {   
            $mapData['down_limit'] = $loss;
            $new_loss = $loss;
        }
        //$mapData['autoStore'] = 1;
        
        $result = $this->_db->update('close_order',array('id'=>$pre_id),$mapData);

        
        $this->log($adm_uid,$user_id,getIp(),'saveLimit','修改損利','修改收單,'.$result2['name'].'，序號:'.$pre_id.'，損:'.$new_loss . '，利:'.$new_profit);
    
    }

    public function savereverseLimit($user_id,$pre_id,$limit)
    {
	$sql = 'select b.name,a.up_limit,a.down_limit,a.price ,a.up_down,c.new_price,d.accept_stop_order,a.reverse_up_limit 
                        from orders a 
                        left join product b on(a.product_code=b.code) 
                        left join now_price c on(a.product_code = c.product_code) 
                        left join user_product d on(a.user_id = d.user_id and a.product_code = d.product_code)
                        where a.order_id='.$pre_id;
        $result2 =  $this->mydb->queryRow($sql );
	
	$new_reverse_up_limit = $result2['reverse_up_limit'];
	if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $user_id;
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $user_id;
        }
	if($limit != 0)
	{
		$new_reverse_up_limit = $limit;
		$mapData['reverse_up_limit'] = $new_reverse_up_limit;
	} 
        $mapData['autoStore'] = 1;
        $result = $this->_db->update('orders',array('order_id'=>$pre_id),$mapData);

        $this->log($adm_uid,$user_id,getIp(),'saveLimit','修改倒限',$result2['name'].'，序號:'.$pre_id.'，倒限點數:'.$new_reverse_up_limit );

        return 0;

    }


    public function saveLimit($user_id,$pre_id,$loss ,$profit)
    {
        //寫入log
        /*
	$sql = ' select b.name,a.up_limit,a.down_limit,a.price 
                        from orders a left join product b on(a.product_code=b.code) 
                        where a.order_id='.$pre_id;
        */
	$sql = 'select b.name,a.up_limit,a.down_limit,a.price ,a.up_down,c.new_price,d.accept_stop_order 
			from orders a 
			left join product b on(a.product_code=b.code) 
			left join now_price c on(a.product_code = c.product_code) 
			left join user_product d on(a.user_id = d.user_id and a.product_code = d.product_code)
			where a.order_id='.$pre_id;
	$result2 =  $this->mydb->queryRow($sql );

        $new_profit = $result2['up_limit'];
        $new_loss = $result2['down_limit'];
 	/*
	if($result2['accept_stop_order'] == 0){	
		if($result2['up_down'] == 'up'){
			if(((int)$result2['new_price'] - $result2['price']) > $profit) return 1;
			if(($result2['price'] - (int)$result2['new_price']) > $loss) return 1;
		}else if($result2['up_down'] == 'down'){
			if(($result2['price'] - (int)$result2['new_price']) > $profit) return 1;
                	if(((int)$result2['new_price'] - $result2['price'] > $loss)) return 1;
		}
	}
	*/
        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $user_id;
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $user_id;
        }

        $mapData = array();
        if($profit !=0)
        {
            $mapData['up_limit'] = $profit;
            $new_profit =  $profit;
        }
        if($loss !=0)
        {
            $mapData['down_limit'] = $loss;
            $new_loss = $loss;
        }
        $mapData['autoStore'] = 1;

        $result = $this->_db->update('orders',array('order_id'=>$pre_id),$mapData);

      
        $this->log($adm_uid,$user_id,getIp(),'saveLimit','修改損利',$result2['name'].'，序號:'.$pre_id.'，損:'.$new_loss . '，利:'.$new_profit);

	return 0;

        /*if($profit!= 0 && $loss !=0)
        {
        }
        else if($loss !=0)
        {
             $this->log($user_id,getIp(),'saveLimit','修改損利',$result2['name'].'，序號:'.$pre_id.'，損:'.$new_loss . '，利:'.$new_profit);
        }
        else if ($profit !=0)
        {
            $this->log($user_id,getIp(),'saveLimit','修改損利',$result2['name'].'，序號:'.$pre_id.'，損:'.$new_loss . '，利:'.$new_profit);
        }
        else
        {}*/
    }

    public function saveLimitMulti($arrID,$loss ,$profit ,$user_id)
    {
        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $user_id;
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $user_id;
        }
        
        foreach($arrID as $id)
        {
            $mapData = array();
            if($profit !=0)
            {
                $mapData['up_limit'] = $profit;
            }
            if($loss !=0)
            {
                $mapData['down_limit'] = $loss;
            }
            $mapData['autoStore'] = 1;
            $result = $this->_db->update('orders',array('order_id'=>$id),$mapData);
            //寫入log

            $this->log($adm_uid,$user_id,getIp(),'saveLimitMulti','多選停損利','多項商品停損停利，停利：'.$profit . ',停損：'.$loss);
        }
    }

    //寫 LOG檔
    function log($user_id,$target_id = null,$ip,$type,$type_ch,$memo)
    {
	if($target_id == null )$target_id = '';
        $mapData = array();
        $mapData['user_id'] = $user_id;
        $mapData['target_id'] = $target_id;
        if($ip == '13.113.3.240' || $ip == '54.178.128.123'){
		$mapData['ip'] = '';
	}else{
		$mapData['ip'] = $ip;
	}
        $mapData['type'] = $type;
        $mapData['type_ch'] = $type_ch;
        $mapData['memo'] = $memo;
        $mapData['create_date'] = date('Y-m-d H:i:s');
        $newStoOrderID = $this->_db->Insert('user_action_log',$mapData);
    }

    public function load_pre_Limit($order_id ,$user_id)
    {
        $sql = 'select * from pre_orders where pre_id=' . $order_id;
	$result = $this->mydb->queryRow($sql);

        $sql2 = 'select * from user_product where user_id=' . $user_id . ' and product_code=\''. $result['product_code'] .'\'';
	$result2 = $this->mydb->queryRow($sql2);
        $result['stop_profit'] = $result2['stop_profit'];
        $result['stop_loss'] = $result2['stop_loss'];
        $result['max_profit_rate_per_amount'] = $result2['max_profit_rate_per_amount'];

        $sql3 = 'select last_close_price from now_price where product_code=\''. $result['product_code'] .'\'';
        $result3 = $this->mydb->queryRow($sql3);
        $result['last_close_price'] = $result3['last_close_price'];


        $sql4 = 'select deny_new_order_rate,
                        system_offset_rate 
                    from product where code=\''. $result['product_code'] .'\'';
        $result4 = $this->mydb->queryRow($sql4);
        $result['deny_new_order_rate'] = $result4['deny_new_order_rate'];
        $result['system_offset_rate'] = $result4['system_offset_rate'];

        return $result;
    }

    public function load_close_Limit($order_id ,$user_id)
    {   
        $sql = 'select * from close_order where id=' . $order_id;
        $result = $this->mydb->queryRow($sql);
        $sql2 = 'select * from user_product where user_id=' . $user_id . ' and product_code=\''. $result['product_code'] .'\'';
        $result2 = $this->mydb->queryRow($sql2);
        $result['stop_profit'] = $result2['stop_profit'];
        $result['stop_loss'] = $result2['stop_loss'];
        $result['max_profit_rate_per_amount'] = $result2['max_profit_rate_per_amount'];
        
        $sql3 = 'select last_close_price from now_price where product_code=\''. $result['product_code'] .'\'';
        $result3 = $this->mydb->queryRow($sql3);
        $result['last_close_price'] = $result3['last_close_price'];

        
        $sql4 = 'select deny_new_order_rate,
                        system_offset_rate 
                    from product where code=\''. $result['product_code'] .'\'';
        $result4 = $this->mydb->queryRow($sql4);
        $result['deny_new_order_rate'] = $result4['deny_new_order_rate'];
        $result['system_offset_rate'] = $result4['system_offset_rate'];
        
        return $result;
    }


    public function loadLimit($order_id ,$user_id)
    {
	$sql = 'select * from orders where order_id=' . $order_id;
        $result = $this->mydb->queryRow($sql);

        $sql2 = 'select * from user_product where user_id=' . $user_id . ' and product_code=\''. $result['product_code'] .'\'';
        $result2 = $this->mydb->queryRow($sql2);
	$result['stop_profit'] = $result2['stop_profit'];
        $result['stop_loss'] = $result2['stop_loss'];
        $result['max_profit_rate_per_amount'] = $result2['max_profit_rate_per_amount'];

        $sql3 = 'select new_price,last_close_price from now_price where product_code=\''. $result['product_code'] .'\'';
        $result3 = $this->mydb->queryRow($sql3);
        $result['last_close_price'] = $result3['last_close_price'];
        $result['new_price'] = $result3['new_price'];

        $sql4 = 'select deny_new_order_rate,
                        system_offset_rate 
                    from product where code=\''. $result['product_code'] .'\'';
        $result4 = $this->mydb->queryRow($sql4);
        $result['deny_new_order_rate'] = $result4['deny_new_order_rate'];
        $result['system_offset_rate'] = $result4['system_offset_rate'];

        return $result;
    }

    public function getLastAnn($user_id)
    {
        $sql_u = 'select * from user where user_id='.$user_id;
        $user = $this->mydb->queryRow($sql_u);


        $sql = 'select content,id,create_date from system_message order by create_date desc';
        $result = $this->mydb->queryArray($sql);

       
        $sql2 = 'select * from announce where user_id='.$user['parent_user_id'];
        $result2 = $this->mydb->queryArray($sql2);


        $newResult = array();
        foreach($result as $item)
        {
            $newItem = array();
            $newItem['id'] = $item['id'];
            $newItem['content'] = $item['content'];
            $newItem['create_date'] = $item['create_date'];

            $newResult[] = $newItem;
        }

        foreach($result2 as $item)
        {
            $newItem = array();
            $newItem['id'] = $item['id'];
            $newItem['content'] = $item['content'];
            $newItem['create_date'] = $item['time'];

            $newResult[] = $newItem;
        }

        /*$last_user_id = $user_id;
        for($i=0 ;$i<4;$i++)
        {
            $sql_u = 'select parent_user_id,account from user where user_id= '.$last_user_id;
            $uResult = $this->mydb->queryRow($sql_u);

            if($uResult)
            {
                $arrAccount[] = $uResult['account'];
                if($uResult['parent_user_id']==0)
                {
                    break;
                }
                else
                {
                    $last_user_id = $uResult['parent_user_id'];
                }
            }
            else
            {
                break;
            }
        }*/
        return $newResult;
    }


    //一鍵全平
    public function storeProduct($adm_uid,$user_id,$product_code,$product_name)
    {
        $sql = 'select * from orders where
                                        status =0
                                        and is_delete=0 
                                        and user_id= '.$user_id. ' 
                                        and product_code=\''.$product_code . '\'';
        $result = $this->mydb->queryArray($sql);

        if(count($result)>0){
            //$user_id,$target_id = null,$ip,$type,$type_ch,$memo
            $this->log($adm_uid,$user_id , getIp() ,'product_store','一般平倉','商品:'.$product_name . '做全平 ');
        }

        foreach($result as $item)
        {
            $mapData = array();
            $mapData['status'] = 2;
            $upResult = $this->_db->update('orders',array('order_id'=>$item['order_id']),$mapData);
        }
        return $result;

    }

     //一鍵全平
    public function storeOrder($user_id,$order_id)
    {
        $sql = 'select * from orders where
                                        order_id ='. $order_id .'
                                        ';
        $result = $this->mydb->queryArray($sql);
        foreach($result as $item)
        {
            $mapData = array();
            $mapData['status'] = 2;
            $upResult = $this->_db->update('orders',array('order_id'=>$item['order_id']),$mapData);
        }

    }

    public function savePreOrder($user_id,$pre_id,$price,$amount,$type)
    {
        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $user_id;
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $user_id;
        }
        

        //先抓回掛單
        $sql = 'select * from pre_orders where pre_id=\''. $pre_id .'\'';
        $preOrder = $this->mydb->queryRow($sql);


        $sql3 = 'select * from product where code=\''. $preOrder['product_code'] .'\'';
        $product = $this->mydb->queryRow($sql3);

        $where = array();
        $where['pre_id'] = $pre_id;
        $where['user_id'] = $user_id;

        $mapData = array();
        $mapData['type'] = $type;
        $mapData['limit_price'] = $price;
        $mapData['amount'] = $amount;
        date_default_timezone_set('Asia/Taipei');
        $action_time= date("Y/m/d H:i:s");
        $mapData['action_time'] = $action_time;

        $upResult = $this->_db->update('pre_orders',$where,$mapData);

        $strMemo = '';
        if($preOrder['limit_price']!= $price)
        {
            $strMemo = $product['name'] . '，掛單號:'.$preOrder['pre_id'].'，原價:'. $preOrder['limit_price'] .'新價:'. $price;
             //修改log 
            $arrUp = array();
            $arrUp['user_id'] = $adm_uid;
            $arrUp['target_id'] = $user_id;
            $arrUp['type'] = 'update_limit_order';
            $arrUp['type_ch'] = '單據修改';
            $arrUp['ip']   = getIp();
            $arrUp['memo'] = $strMemo;
            $arrUp['create_date'] = date('Y-m-d H:i:s');
            $this->_db->insert('user_action_log',$arrUp);
        }

        if($preOrder['amount']!= $amount)
        {
            $strMemo = $product['name'] . '，掛單號:'.$preOrder['pre_id'].'，原口數:'. $preOrder['amount'] .'新口數:'. $amount;
             //修改log 
            $arrUp = array();
            $arrUp['user_id'] = $adm_uid;
            $arrUp['target_id'] = $user_id;
            $arrUp['type'] = 'update_limit_order';
            $arrUp['type_ch'] = '單據修改';
            $arrUp['ip']   = getIp();
            $arrUp['memo'] = $strMemo;
            $arrUp['create_date'] = date('Y-m-d H:i:s');
            $this->_db->insert('user_action_log',$arrUp);
        }

        if($preOrder['type']!= $type)
        {
            $strMemo = $product['name'] . '，掛單號:'.$preOrder['pre_id'].'，修改為市價單';
             //修改log 
            $arrUp = array();
            $arrUp['user_id'] = $adm_uid;
            $arrUp['target_id'] = $user_id;
            $arrUp['type'] = 'update_limit_order';
            $arrUp['type_ch'] = '單據修改';
            $arrUp['ip']   = getIp();
            $arrUp['memo'] = $strMemo;
            $arrUp['create_date'] = date('Y-m-d H:i:s');
            $this->_db->insert('user_action_log',$arrUp);
        }

       
        return $upResult; 
    }

    public function getUser($token)
    {
        $sql = 'select * from user_token where token=\''. $token .'\'';
        $tokenResult  = $this->mydb->queryRow($sql);


        $sql2 = 'select * from user where user_id='.$tokenResult['user_id'] ;
        $user = $this->mydb->queryRow($sql2);
        $user['adm_uid'] = $tokenResult['ctl_uid'];
        $user['control_uid'] = $tokenResult['ctl_uid'];
        return $user;

    }

    public function getUserFromUID ( $user_id )
    {
        $user = $this->mydb->queryRow('SELECT * FROM user WHERE user_id = '.$user_id);
        return $user;
    }

    //檢查能不能收盤全平
    public function canCloseOffset($product_code, $user_id)
    {
        $sql = 'select count(id) amt from close_order 
                        where status=0 
                                and is_delete=0 
                                and product_code=\''. $product_code .'\' 
                                and user_id=\''.$user_id .'\'';
        //var_dump($sql);
        $result = $this->mydb->queryRow($sql);
        if( $result['amt'] >0 )
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    //使用者選取多筆做平倉
    public function close_offset($product_code ,$user_id)
    {
	
	if($_SESSION['end_user']['adm_uid'] > 0){
		$_targer_id = $_SESSION['end_user']['adm_uid'];
	}else{
		$_targer_id = $user_id;	
	}
	$sql = 'update user_product set close_offset =1 where user_id ='. $_targer_id .' and product_code =\''. $product_code .'\'';
    
        $upResult = $this->_db->execSql($sql);

        $sql_p = 'select * from product where code=\''. $product_code .'\'';
        $product = $this->mydb->queryRow($sql_p);
        $this->log($user_id,$_targer_id,getIp(),'close_store','系統提示',$product['name'] .'勾選收盤全平');

        //var_dump($sql);
        return $upResult;
    }
     
    public function cancel_close_offset($product_code ,$user_id)
    {
	if($_SESSION['end_user']['adm_uid'] > 0){
                $_targer_id = $_SESSION['end_user']['adm_uid'];
        }else{  
                $_targer_id = $user_id;
        }
        $sql = 'update user_product set close_offset =0 where user_id ='. $_targer_id .' and product_code =\''. $product_code .'\'';
        $upResult = $this->_db->execSql($sql);

        $sql_p = 'select * from product where code=\''. $product_code .'\'';
        $product = $this->mydb->queryRow($sql_p);
        $this->log($user_id,$_targer_id,getIp(),'close_store','系統提示',$product['name'] .'取消收盤全平');

        return $upResult;
    }


    //使用者選取多筆做平倉
    public function storeMulti($arrID)
    {
        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $_SESSION['end_user']['user_id'];
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $_SESSION['end_user']['user_id'];
        }
        
        $rtn = false;
        foreach($arrID as $id)
        {
            if ( !is_numeric($id) ) continue;
            
            $sql = 'select * from orders where status=0 and order_id='.$id;
            $result = $this->mydb->queryRow($sql);

            $mapData = array();
            $mapData['status'] = 2;
            $upResult = $this->_db->update('orders',array('order_id'=>$id),$mapData);


            //記錄log
            $sql2 = 'select * from product where code=\''. $result['product_code'] .'\'';
            $product = $this->mydb->queryRow($sql2);
            $this->log($adm_uid,$result['user_id'],getIp(),'multi_store','多筆平倉',$product['name'].'，訂單編號:'.$id);
            $rtn = true;
        }
        
        return $rtn;
    }

    public function deleteCloseorder($id)
    {
        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $_SESSION['end_user']['adm_uid'];
            $user_id = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid = $_SESSION['end_user']['user_id'];
        }
        
        $sql2 = 'select * from close_order where id=\''. $id .'\'';
        $closeOrder = $this->mydb->queryRow($sql2);

        $sql3 = 'select * from product where code=\''. $closeOrder['product_code'] .'\'';
        $product = $this->mydb->queryRow($sql3);
	

        $mapData = array();
        $mapData['is_delete'] = 1;
        $upResult = $this->_db->update('close_order',array('id'=>$id),$mapData);
	$admin_name = $closeOrder['is_admin'].'' == '0' ? '' : $closeOrder['is_admin'];
        $strMemo = '';
        /*if($closeOrder['type']==4)
        {
            $strMemo = $product['name'] . '，限價單，單號:'. $closeOrder['id'];
        }*/
        if($closeOrder['type']==3)
        {
            $strMemo = $admin_name.$product['name'] .'，收盤單，單號:'. $closeOrder['id'];
        }

        //刪除log
        $arrUp = array();
        $arrUp['user_id'] = $adm_uid;
        $arrUp['target_id'] = $closeOrder['user_id'];
        $arrUp['type'] = 'cancel_closeorder';
        $arrUp['type_ch'] = '取消掛單';
        $arrUp['memo'] = $strMemo;
        $arrUp['ip']   = getIp();
        $arrUp['create_date'] = date('Y-m-d H:i:s');
        $this->_db->insert('user_action_log',$arrUp);

        return $upResult ;
    }

      public function deletePreorder($id)
    {
        if ( isset($_SESSION['end_user']['adm_uid']) && $_SESSION['end_user']['adm_uid'] > 0 ) {
            $adm_uid = $_SESSION['end_user']['adm_uid'];
        } else {
            $adm_uid =  $_SESSION['end_user']['user_id'];
        }
        
        $sql2 = 'select * from pre_orders where pre_id=\''. $id .'\'';
        $preOrder = $this->mydb->queryRow($sql2);

        $sql3 = 'select * from product where code=\''. $preOrder['product_code'] .'\'';
        $product = $this->mydb->queryRow($sql3);

        $mapData = array();
        $mapData['is_delete'] = 1;
        $mapData['status'] = 1;
        $upResult = $this->_db->update('pre_orders',array('pre_id'=>$id),$mapData);

        $strMemo = '';
        if($preOrder['type']==4)
        {
            $strMemo = $product['name'] . '，限價單，單號:'. $preOrder['pre_id'];
        }
        /*
        if($preOrder['type']==3)
        {
            $strMemo = $product['name'] . '，收盤單，單號:'. $preOrder['pre_id'];
        }*/

        //刪除log
        $arrUp = array();
        $arrUp['user_id'] = $adm_uid;
        $arrUp['target_id'] = $preOrder['user_id'];
        $arrUp['type'] = 'cancel_limitorder';
        $arrUp['type_ch'] = '取消掛單';
        $arrUp['memo'] = $strMemo;
        $arrUp['ip']   = getIp();
        $arrUp['create_date'] = date('Y-m-d H:i:s');
        $this->_db->insert('user_action_log',$arrUp);

         return $upResult ;
    }
    
}
