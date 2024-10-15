<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class db
{
   
    private $_ip = "127.0.0.1",$_account = "root",$_password = "",$_dbName = "future",$primaryKey,$table;
    public $lastSQL = ''; 
    public function __construct ($ip,$account,$pass,$db)
    {
        $this->_ip = $ip;
        $this->_account = $account;
        $this->_password = $pass;
        $this->_dbName = $db;
    }  
    
    private function getConn()
    {
        $conn = mysqli_connect($this->_ip, $this->_account ,$this->_password , $this->_dbName);
        mysqli_set_charset($conn, "utf8");
       
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
        return $conn;
    }

    public function getSql()
    {
        return $lastSQL;
    }
    
    public function query($sql)
    {
        $conn = $this->getConn();
        $this->$lastSQL = $sql;
        
        $result = $conn->query($sql);
        //$result = mysqli_fetch_all($conn->query($sql), MYSQLI_ASSOC);  
        //var_dump($result);
        if ( $result ) {
           //return $result->fetch_array(MYSQLI_ASSOC);
           return mysqli_fetch_all($result, MYSQLI_ASSOC);  
        }
        else
        {
             echo "Error: " . $sql . "<br>" . mysqli_error($conn);
             exit;
        }
    }
    

    //取得資料庫資料
     public function execSql($sql)
    {
        $conn = $this->getConn();

        $this->$sql = $sql;
        
        $result = $conn->query($sql);
        
        // var_dump($sql);
        
        if ($result ) {
           return $result;
        }
        else
        {
             echo "Error: " . $sql . "<br>" . mysqli_error($conn);
             exit;
        }
    }   
    
    //新增
     public function insert($table ,$mapData)
    {
        $values = '';
        $columns = '';
        foreach($mapData  as $k=>$v)    
        {
            $columns .=    $k . ',';
            if(is_int($v))
                $values .=    $v .",";
            else 
                $values .=   "'" . $v ."',";
            
        }
        $columns = substr($columns, 0 , strlen($columns) -1);
        $values = substr($values, 0 , strlen($values) -1);
        

        $sql  = 'insert into `'. $table . '` (' . $columns . ')'.
                ' values('. $values .');';
        
        
        $result = $this->execSql($sql);        
        return $result;
    }
    
    //更新
     public function update($table,$where,$mapData)
    {
        
        $columns = '';
        foreach($mapData  as $k=>$v)
        {
            if(is_int($v))
                $columns .=    $k . '='  . $v . ',';
            else 
                $columns .=    $k . '= \'' . $v . '\',';
        }
        $columns = substr($columns, 0 , strlen($columns) -1);
        //$values = substr($values, 0 , strlen($values) -1);
        
        
        $strWhere = '';
        
        //hash table
        if(is_array($where))
        {
            foreach($where as $k=>$v)
            {
                $strWhere .= $k . ' = \'' . $v . '\'' . ' and ';
            }
            $strWhere  = substr($strWhere, 0 , strlen($strWhere) -4);
        }
        
        //int
        if(is_int($where))
        {
             
        }
        
        // string
        if(is_string($where))
        {
            $strWhere = $where;
        }
        

        $sql  = 'update  `'. $table . '` set ' .$columns . ' where ' . $strWhere;
        
        $result = $this->execSql($sql); 

       return $sql;

        return $result;
    }
    
    
    //刪除
    static private function delete($table,$column ,$id)
    {
        
    }
}


