<?php
class Model_login_info extends MY_Model {
    
    public function __construct(){
       
       //資料庫實際資料表名稱 
        parent::__construct('login_info');
         date_default_timezone_set("Asia/Taipei");

    }

}