<?php
class model_user_action_log extends MY_Model {
    
    public function __construct(){
       
       //資料庫實際資料表名稱 
        parent::__construct('user_action_log');
         date_default_timezone_set("Asia/Taipei");

    }

    public function Insert( $mapData )
    {
        parent::Insert($mapData);
    }




}