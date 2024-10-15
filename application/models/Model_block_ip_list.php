<?php
class Model_block_ip_list extends MY_Model {
    
    public function __construct(){
       
       //資料庫實際資料表名稱 
        parent::__construct('block_ip_list');
         date_default_timezone_set("Asia/Taipei");
    }
    public function isBlockIp(){
        $ip = getRemoteIP();
        $res =  parent::get($ip,"ip");
        if(!$res){
            return true;
        }
        if($res['enable']==0){
            return true;
        }
        return false;
    }

}