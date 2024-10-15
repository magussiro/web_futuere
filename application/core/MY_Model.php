<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * 自定義基本Model
 *
 * 自定義CI Model 處理資料 method
 *
 * @author      chris
 * @copyright   Copyright © 2015 - 2021  rights reserved.
 * @created     2015-03-25
 * @updated     2016-03-21
 * @version     1.0
 */

class MY_Model extends CI_Model
{
	public $_tableName = '';	//資料表名稱
	public $_columns = array();	//所有欄位
	public $_keyColumn = '';	//主鍵欄位名稱
	public $_length = 10;		//每頁長度
	
	 //初始化參數，去資料庫抓欄位名稱和KEY欄位名稱
	 public function __construct($tableName) {        
	 	 parent::__construct();	 
		 $this->load->library(array('mydb'));	
		 $this->load->helper('tool');

		 $this->load->helper("db");
		 $this->load->database();
		 if ( !isset($this->_db) ) $this->_db = new db($this->db->hostname, $this->db->username , $this->db->password, $this->db->database);

		 
		//var_dump($tableName);
		 if(  $tableName !=null)
		 {
			$this->_tableName = $tableName;
			
			//取得TABLE 欄位名稱和主鍵
			$strSQL = 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name =\''. $tableName .'\' and table_schema !=\'mysql\' ';
			$result =  $this->mydb->queryArray($strSQL);  
			$columns = array();

			if($result >= 0)
			{
				//echo "111111";
			}
			else {
				//echo "2222";
			}

			if($result )
			{
				foreach($result as $row)
				{
					if($row['COLUMN_KEY']== 'PRI')
					{
						$this->_keyColumn = $row['COLUMN_NAME'];
					}
					else {
						$columns[] = $row['COLUMN_NAME']; 
					}
				}
			}
			
			$this->_columns = $columns;
		 }
		 //for 一般查謁debug
		 $_GET['debug']  = 'db';	  
	 }
	
	 //取單一筆資料,回傳array
	 public function get($keyValue , $columnName = null)
	 {
		 $cName = $this->_keyColumn;
		 if($columnName != null )
		 {
		 	$cName = $columnName;
		 }
		 $sql = ' select * from ' . $this->_tableName . ' where '. $cName . ' = ? limit 0,1';
		 
		 $result =  $this->mydb->queryArray($sql , $keyValue);  
		 
		 //判斷有查到資料，才回傳$result[0],不然是一個陣列，但數量為0
		 //回傳資料，查詢正確，只是查無資料
		 if(count($result) >0)
		 {
			 return $this->catchError($result[0]);
		 }
		 else
		 {
			 return null;
		 } 
	 }
	 
	  //取單一筆資料,回傳object
	  /*
	 public function single($keyValue , $columnName = null)
	 {
		 $cName = $this->_keyColumn;
		 if($columnName != null )
		 {
		 	$cName = $columnName;
		 }
		 $sql = ' select * from ' . $this->_tableName . ' where '. $cName . ' = ?  limit 0,1';
		 
		 $result =  $this->mydb->queryRow($sql , $keyValue);  
		 return $this->catchError($result);
	 }*/
	 
	 //取多筆資料
	 public function getList($page = null)
	 {
		 $sql = ' select * from ' . $this->_tableName ;
		 if($page != null)
		 {
			 $sql .= ' limit '. $page .' ,'.$this->_length;
		 }
		 
		 $result =  $this->mydb->queryArray($sql); 
		 return $this->catchError($result);
	 }
	 
	 //新增
	 public function insert($mapData)
	 {
		 $result = $this->mydb->insertRow($this->_tableName, $mapData);
		 return $this->catchError($result);
	 }
	 
	 //修改
	 public function update($intId,$mapData)
	 {
		$result = $this->mydb->updateRow($this->_tableName, $mapData, " `{$this->_keyColumn}` = '{$intId}'" );
		return $this->catchError($result);
	 }
	 
	 //刪除
	 public function delete($intId, $strKey = false)
	 {
		 //var_dump($this->_columns);
		$db_key	= $this->_keyColumn;
		if ($strKey) {
			$db_key	= $strKey;
		}
		$mapData = array();
		$mapData['is_del']		= 1 ;
		$mapData['update_date']	= date('Y-m-d H:i:s');
		$result = $this->mydb->updateRow($this->_tableName , $mapData, " `{$db_key}` = '{$intId}'" );
		return $this->catchError($result);
	 }
	 
	 //真的刪除
	 public function deleteIndeed($intId, $strKey = false)
	 {
		$db_key	= $this->_keyColumn;
		if ($strKey) {
			$db_key	= $strKey;
		}
		$mapData = array();
		$mapData['is_del']		= 1 ;
		//$mapData['update_date']	= date('Y-m-d H:i:s');
		$result = $this->mydb->updateRow($this->_tableName, $mapData, " `{$db_key}` = '{$intId}'" );
		return $this->catchError($result);
	 }	
	 
	 //若db處理錯誤，直接印出SQL
	 public function catchError($result)
	 {
		 //在執行update 時，假如沒有更新到資料
		 //這裡會被視為error

		 

		 //update 到0筆資料也會出現0
		 //發生錯誤時，result = false

		 //var_dump($result);
		 if($result >= 0 )
		 {
			 //$object['msg'] = 'success';
			 //$object['data'] = $result;
			 //$object['count'] = count($result);
			 //$object['sql'] = $this->mydb->query_history[0];
			 return $result;
		 }
		 else {
			 //var_dump($this->mydb->query_history);
			 //$object['error'] = true;
			 //$object['data'] = $result;
			 //$object['count'] = 0;
			 //$object['sql'] = $this->mydb->query_history[0];
			 //return $object;
			 //var_dump($this->mydb->query_history[0]);
			 //return false;
			 $size = count($this->mydb->query_history);
			 errorView($this->mydb->query_history[$size - 1]);
		 }
	 } 
	 
	
}





// END MY_Model Class