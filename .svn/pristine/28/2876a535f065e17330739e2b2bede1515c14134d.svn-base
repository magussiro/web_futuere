<?php
class model_user_product extends MY_Model {
    
    public function __construct(){
       
       //資料庫實際資料表名稱 
        parent::__construct('user_product');
    }

    public function getUserProduct($user_id)
    {
        $sql = "select  
                    a.user_id,
                    a.product_code,
                    b.name,
                    b.price,
                    b.price_large,
                    b.price_med,
                    b.price_small,
                    b.price_mini,

                    a.charge_type,
                    a.is_deny_new_system_offset,

                    b.buy_charge,
                    a.buy_charge_large,
                    a.buy_charge_med,
                    a.buy_charge_small,
                    a.buy_charge_mini,
                    a.sell_charge_large,
                    a.sell_charge_med,
                    a.sell_charge_small,
                    a.sell_charge_mini,
                  
                    c.max_online_amount_single,
                    c.max_hand_amount_single,
                    c.max_offline_amount_single,
	
		    b.source_place,	    
                    b.offline_count,
                    a.stop_profit,
                    a.stop_loss,

                    a.max_profit_rate,
                    a.max_profit_rate_per_amount,

                    
                    b.open_time ,
                    b.close_time,
                    b.open_time2 ,
                    b.close_time2,
                    b.open_time3 ,
                    b.close_time3,
                    b.is_enable,
                    a.deny_new_order_rate,
                    a.system_offset_rate,

                    b.deny_new_order_rate deny_new_order_rate2,
                    b.system_offset_rate system_offset_rate2,
               	    b.day_time 
                from user_product a
                inner join product b on(a.product_code=b.code) 
                left join user_config c on(a.user_id=c.user_id)
                where a.user_id = ? ";
        $result = $this->mydb->queryArray($sql, $user_id);


        $new_result = array();
        foreach($result as $item)
        {
            $price = 0;
            $buy_charge = 0;
            $sell_charge = 0;
            switch($item['charge_type'])
            {
                case 0:
                        $price = $item['price'];
                        $buy_charge = $item['buy_charge'];
                        $sell_charge = $item['sell_charge'];

                        break;
                case 1:
                        $price = $item['price_large'];
                        $buy_charge = $item['buy_charge_large'];
                        $sell_charge = $item['sell_charge_large'];
                        break;
                case 2:
                        $price = $item['price_med'];
                        $buy_charge = $item['buy_charge_med'];
                        $sell_charge = $item['sell_charge_med'];
                        break;
                case 3:
                        $price = $item['price_small'];
                        $buy_charge = $item['buy_charge_small'];
                        $sell_charge = $item['sell_charge_small'];
                        break;
                case 4:
                        $price = $item['price_mini'];
                        $buy_charge = $item['buy_charge_mini'];
                        $sell_charge = $item['sell_charge_mini'];
                        break;
            }

            $denyNew = 0;
            $offset = 0;

            if($item['is_deny_new_system_offset'] ==1)
            {
                 $denyNew = $item['deny_new_order_rate'];
                $offset = $item['system_offset_rate'];
            }
            else
            {
                $denyNew = $item['deny_new_order_rate2'];
                $offset = $item['system_offset_rate2'];
            }

            if($item["day_time"] == 1)
            {
                $tmp = array('','2','3');

                for ( $i=0; $i<3; $i++ )
                {
                    $key1 = 'open_time' . $tmp[$i];
                    $key2 = 'close_time' . $tmp[$i];
                    
                    if ( ($item[$key1] == $item[$key2]) && ($item[$key1] == '00:00:00') ) continue;
                    
                    $item[$key1] = date('H:i:s',strtotime($item[$key1])+3600);
                    $item[$key2] = date('H:i:s',strtotime($item[$key2])+3600);
                }
            }
            

            $newItem = array();
            $newItem['name'] = $item['name'];
            $newItem['price'] = $price;
            $newItem['buy_charge'] = $buy_charge . '/'. $sell_charge;
	
            $newItem['max_full_amount_single'] = $item['max_hand_amount_single'];
            $newItem['max_online_amount_single'] = $item['max_online_amount_single'];
            $newItem['max_offline_amount_single'] = $item['max_offline_amount_single'];
            /*
            $amount = '0';
            $usql = 'select sum(amount) amt from orders_preserve_money where product_code=\''. $item['product_code'] .'\' and status=0 and user_id='.$item['user_id'];
            $uResult = $this->mydb->queryRow($usql);
            if($uResult['amt']!= null )
            {
                $amount = $uResult['amt'];
            }*/
	    //這邊其實是每口預扣點數
            $per_preserve_money = $item['max_profit_rate'] *  $price;
	    //$newItem['amt'] = $amount;
	    $newItem['amt'] = $per_preserve_money;	
            //$newItem['offline_count'] = $item['offline_count'];
            $newItem['max_profit_rate'] = $item['max_profit_rate'];
            $newItem['max_profit_rate_per_amount'] = $item['max_profit_rate_per_amount'];
            $newItem['stop_profit'] = $item['stop_profit' ]  .' ~ ' . $item['stop_loss'];
            $newItem['open_time'] = $item['open_time'];
            $newItem['close_time'] = $item['close_time'];
            $newItem['open_time2'] = $item['open_time2'];
            $newItem['close_time2'] = $item['close_time2'];
            $newItem['open_time3'] = $item['open_time3'];
            $newItem['close_time3'] = $item['close_time3'];
            //$newItem['day_time']= $item['day_time'];
	    $newItem['is_enable'] = $item['is_enable'];
            $newItem['deny_new_order_rate'] = $denyNew .'%';
            $newItem['system_offset_rate'] = $offset .'%';
	    //$newItem['source_place'] = $item['source_place'];
	    $new_result[] = $newItem;
        }

        return  $new_result;
        /*$allData = array();
        foreach($new_result as $index=>$row)
        {
           foreach($row as $k=>$v)
           {
               $allData[$k][]  = $v;
           }
        }*/
       // return $result;
        //var_dump($allData['product_code']);
        //return $allData;
    }
   
    
    
}
