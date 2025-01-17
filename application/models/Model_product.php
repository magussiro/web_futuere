<?php

class model_product extends MY_Model {

    public function __construct() {

        //資料庫實際資料表名稱 
        parent::__construct('product');
    }

    public function getShowProduct($user_id) {
        $sql = 'select a.* ,b.is_show from product a
                left join user_product b on(a.code=b.product_code)
                where b.user_id= ? order by sort';
        $result = $this->mydb->queryArray($sql, $user_id);

//        array_push($result, [
//        'id' => (string) '16' ,
//        'code' => (string) 'TXA' ,
//        'price_code' => (string) 'TXA',
//        'code_date' => (string) '0' ,
//        'name' => (string) '台指全' ,
//        'last_order_date' => (string) '2100-04-12' ,
//        'open_time' => (string) '09:00:00' ,
//        'close_time' => (string) '17:00:00' ,
//        'open_time2' => (string) '00:00:00' ,
//        'close_time2' => (string) '00:00:00' ,
//        'open_time3' => (string) '00:00:00' ,
//        'close_time3' => (string) '00:00:00',
//        'price_rate' => (string) '100',
//        'memo' => (string) '參考用' ,
//        'sort' => (string) '1' ,
//        'is_enable' => (string) '1' ,
//        'create_date' => (string) '0000-00-00 00:00:00',
//        'price' => (string) '0' ,
//        'price_large' => (string) '200' ,
//        'price_med' => (string) '100' ,
//        'price_small' => (string) '50',
//        'price_mini' => (string) '20',
//        'max_change_rate' => (string) '0',
//        'max_change_rate_per_amount' => (string) '0' ,
//        'buy_charge' => (string) '0',
//        'sell_charge' => (string) '0' ,
//        'offline_count' => (string) '0' ,
//        'max_order_amount' => (string) '0' ,
//        'max_online_amount' => (string) '0',
//        'max_offline_amount' => (string) '0' ,
//        'deny_new_order_rate' => (string) '10' ,
//        'system_offset_rate' => (string) '5' ,
//        'buy_condition_rate' => (string) '0' ,
//        'sell_condition_rate' => (string) '0' ,
//        'source_from' => (string) '',
//        'source_place' => (string) '' ,
//        'day_time' => (string) '0' ,
//        'day_time_date' => (string) '0000-00-00 00:00:00',
//        'day_time_date2' => (string) '0000-00-00 00:00:00',
//        'can_take' => (string) '1',
//        'update_date' => (string) '2017-07-31 15:30:22' ,
//        'is_show' => (string) '1',
//        ]);

//        var_dump($result);
//
//        die;

        return $result;
    }

    public function hideAllProduct($user_id) {
        $sql = ' select id from user_product where user_id = ? ';
        $result = $this->mydb->queryArray($sql, $user_id);

        foreach ($result as $item) {
            $data = array();
            $data['is_show'] = 0;
            $this->model_user_product->update($item['id'], $data);
        }
    }

}
