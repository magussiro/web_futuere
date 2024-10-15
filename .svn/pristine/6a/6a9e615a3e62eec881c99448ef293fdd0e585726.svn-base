<?php
class model_user extends MY_Model {
    
    public function __construct(){
       
       //資料庫實際資料表名稱 
        parent::__construct('user');

    }
    
    
    public function doLogin($account ,$pass)
    {
        $sql = 'select * from user where  account= ? and password = ? ';
        $result =  $this->mydb->queryRow($sql,$account,$pass); 
	return $this->catchError($result);
    }

    public function changePassword($mapData)
    {
        //var_dump($mapData);

        $sql2 = 'select * from user_token where token= ? ' ; 
        $result2 =  $this->mydb->queryRow($sql2,$mapData['token']);

        
        if($result2 ==null)
        {
            return "can not find token. ";
        }
        $sql = 'select * from user where user_id= ? ' ; 
        $user =  $this->mydb->queryRow($sql,$result2['user_id']);

      
        

        $index = false;
        if($user['password']== $mapData['oldPass'])
        {
            $index = true;
        }
       

        if($index)
        {
            $data = array();
            $data['password'] = $mapData['newPass'];
            $this->update($user['user_id'] , $data);
            return "success";
        }
        else {
            return "Wrong Password.";
        }

    }

    public function updateLoginInfo ( $user_id, $tid, $ip, $type, $user_data, $ipinfo )
    {
        date_default_timezone_set('Asia/Taipei');
        $_date = date('Y-m-d H:i:s');
        $sql = "UPDATE user SET last_login_date = ?, update_date = ?, last_login_ip= ?, login_info = ? WHERE user_id = ?";
        return $this->mydb->update($sql, $_date, $_date, $ip, $ipinfo, $user_id);
    } 

    public function getIPInfo ( $ip )    
    {
        $_browser = $this->getBrower();        
//        if ( substr($ip,0,7) == '192.168' ) 
        return json_encode(array('bs'=>$_browser,'c'=>'unknow','city'=>'unknow','isp'=>'unknow'));
        
        $host = 'http://ip-api.com/json/'.$ip;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $host);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($curl);
        $info = json_decode($result,true);
        if ( !$info['status'] ) return json_encode(array('bs'=>$_browser,'c'=>'unknow','city'=>'unknow','isp'=>'unknow'));

        return json_encode(array('bs'=>$_browser,'c'=>$info['country'],'city'=>$info['city'],'isp'=>$info['isp']));    
    }
    
    public function getBrower ()    
    {        
        $info = $_SERVER['HTTP_USER_AGENT'];        

        if ( strpos($info,'Edge') ) return 'Edge';
        if ( strpos($info,'Firefox') ) return 'Firefox';        
        if ( strpos($info,'OPR') ) return 'OPR';        
        if ( strpos($info,'Chrome') ) return 'Chrome';        
        if ( strpos($info,'Safari') ) return 'Safari';    
        
        return $info;
    }

    public function log($user_id , $ip = null , $str = null)
    {
        if($str == null) $str = '登入登出';
	$arrMap = array();
        $arrMap['user_id'] = $user_id;
	$arrMap['target_id'] = $user_id;
        $arrMap['ip'] = $ip;
        $arrMap['type'] = 'login';
        $arrMap['type_ch'] = $str;
        $arrMap['memo'] = '登入';
        $arrMap['create_date'] = date('Y-m-d H:i:s');

        $new_id = $this->_db->Insert('user_action_log',$arrMap);
    }
}
