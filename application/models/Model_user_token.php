<?php
class model_user_token extends MY_Model {
    
    public function __construct(){
       
       //資料庫實際資料表名稱 
        parent::__construct('user_token');
         date_default_timezone_set("Asia/Taipei");

    }

    public function insert( $mapData )
    {
        $date = date('Y-m-d H:i:s');
        $mapData['update_date'] = $date;
        $res = $this->mydb->queryRow('SELECT * FROM user_token WHERE user_id = '.$mapData['user_id']);
        if ( empty($res) ) return parent::insert($mapData);
        
        $sql = 'UPDATE user_token SET token = ?, ip = ?, enable = 1, update_date = ? WHERE user_id = ?';
        $this->mydb->update($sql,$mapData['token'],$mapData['ip'],$date,$mapData['user_id']);
    }

    public function disable($user_id,$arrMap)
    {
        $upResult = $this->_db->update('user_token',array('user_id'=>$user_id),$arrMap);

        //登出log
        $arrUp = array();
        $arrUp['user_id'] = $user_id;
        $arrUp['type'] = 'logout';
        $arrUp['type_ch'] = '登入登出';
        $arrUp['memo'] = '使用者登出';
        $arrUp['create_date'] = date('Y-m-d H:i:s');
        $this->_db->insert('user_action_log',$arrUp);
    }

    public function updateUserToken ( $uid, $mapData )
    {
        $res = $this->get($uid, 'user_id');
        $_date = date('Y-m-d H:i:s');

        if ( empty($res) ) {
            $mapData['user_id']     = $uid;
            $mapData['update_date'] = $_date;
            $this->insert($mapData);
            return;
        }

        $_ip = $mapData['ip'];
        $_token = $mapData['token'];

        if ( isset($mapData['ctl_uid']) && $mapData['ctl_uid'] > 0 ) {
            $_ctl_uid = $mapData['ctl_uid'];
            $sql = "UPDATE user_token SET update_date = ?, ip = ?, token = ?, enable = 1, ctl_uid = ? WHERE user_id = ?";
            return $this->mydb->update($sql, $_date, $_ip, $_token, $_ctl_uid, $uid);
        }

        $_enable = $mapData['enable'];
        $device = $mapData['device'];

        $sql = "UPDATE user_token SET update_date = ?, ip = ?, token = ?, enable = ? ,device = ? WHERE user_id = ?";
        return $this->mydb->update($sql, $_date, $_ip, $_token, $_enable,$device, $uid);
    }

    public function updateTokenFields($uid ,$mapData)
    {
        return $this->_db->update('user_token',array('user_id'=>$uid),$mapData);
    }



}