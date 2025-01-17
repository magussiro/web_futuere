<?php
class model_popup extends MY_Model {
    
    public function __construct(){
        
        parent::__construct('account');
       // $this->load->helper(array('unit'));
       
    }
    
    
    
    public function productSave()
    {
        
    }


    //歷史損益
    public function getProfit($sdate ,$edate ,$user_id)
    {
        //取得結算時間
        $sql2 = 'select * from system where `key`=\'bill_time\'';
        $resultT = $this->mydb->queryRow($sql2);
        
        $sql = "select
                    e.code ,e.name, b.order_id newID, c.order_id stoID,
                	b.type type1, c.type type2, a.charge_type, a.up_down,
                	a.buy_charge, a.amount stoAmount, a.buy_price, a.sell_price,  
                	b.is_trans_order, a.sell_charge, a.profit_loss ,
                	b.create_date buyTime, c.create_date sellTime
                from orders_rel a
                    left join orders b on(a.user_order_id= b.order_id and b.is_delete = 0)
                    left join orders c on(a.store_order_id= c.order_id and c.is_delete = 0)
                    left join product e on(b.product_code=e.code)
                where  a.user_id ='". $user_id . "' and a.pay_status=1  and a.is_delete = 0" ;
        
        //起始日需往前一日
        $sdate = date('Y-m-d',strtotime($sdate . "-1 days"));
        
        //判斷起始日修改後是否為六日
        $week_s = date("w",strtotime($sdate));
        if($week_s==0){     //星期日,在-2天
            $sdate = date('Y-m-d',strtotime($sdate . "-2 days"));
        }else if($week_s==6){   //星期六,在-1天
            $sdate = date('Y-m-d',strtotime($sdate . "-1 days"));
        }
        
        $sdate = date('Y-m-d ',strtotime($sdate)) . $resultT['value'];
        $sql .= " and c.create_date > '$sdate'";

        //結束日
        $edate = date('Y-m-d ',strtotime($edate)).$resultT['value'];
        $sql .= " and c.create_date <= '$edate'";

        $sql .= ' order by e.id ,c.create_date desc';
        
        
       // var_dump($sql);
        
        $result = $this->mydb->queryArray($sql );

        return $result;
    }
    
    public function getActionTypes ( $group )
    {
        if ( $group > 0 ) {
            $grp_str = "and grp = $group";
        } else {
            $grp_str = '';
        }

        $result = $this->mydb->queryArray("SELECT id,name FROM user_action WHERE is_enable = 1 $grp_str");
        $arr = array();

        foreach ( $result as $idx => $row )
        {
            $arr[$row['id']] = $row['name'];
        }

        return $arr;
    }

}
