<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
*   名稱:    資料庫處理共用方法
*   路徑:    models/Base_model
*   開發者:  Sean@2015/10/1
*   說明:    不可直接呼叫,由各Model繼承後呼叫
*/

class Base_model extends CI_Model
{
  // table名稱, 由各Model繼承後設定
  protected $table_name = '';

  function __construct()
  {
    parent::__construct();
  }

  // 檢查SQL是否為寫入語法
  private function is_write($sql='')
  {
    $result = FALSE;

    if(!empty($sql)){

      if(preg_match('/^\s*"?(SET|INSERT|UPDATE|DELETE|REPLACE|CREATE|DROP|LOAD DATA|COPY|ALTER|GRANT|REVOKE|LOCK|UNLOCK)\s+/i',$sql)){
        $result = TRUE;
      }
    }

    return $result;
  }

  // 執行SQL
  function exec($sql='')
  {
    $result = 0;

    if(!empty($sql)){

      // 寫入/更新/刪除
      if($this->is_write($sql)){
        $this->db->query($sql);
        $result_tmp = $this->db->affected_rows();

      // 查詢
      }else{
        @$result_tmp = $this->db->query($sql)->result_array();
      }

      if(!empty($result_tmp)){
        $result = $result_tmp;
      }
    }

    return $result;
  }

  // 取得單一筆資料(陣列)
  function getOne($select='*',$where=array(),$order=array())
  {
    $result = array();

    if(!empty($this->table_name)){
      $this->db->select($select);

      if(!empty($where) && is_array($where)){
        $this->db->where($where);
      }

      if(!empty($order) && is_array($order)){
        $order_array = array();
        $order_str   = '';

        foreach($order as $k=>$v){
          $order_array[] = $k.' '.$v;
        }

        if(!empty($order_array)){
          $order_str = implode(',',$order_array);
        }

        $this->db->order_by($order_str);
      }

      $result_tmp = $this->db->from($this->table_name)->get()->row_array();

      if(!empty($result_tmp)){
        $result = $result_tmp;
      }
    }

    return $result;
  }

  // 取得數筆資料(陣列)
  function getAll($select='*',$where=array(),$order=array(),$limit='')
  {
    $result = array();

    if(!empty($this->table_name)){
      $this->db->select($select);

      if(!empty($where) && is_array($where)){
        $this->db->where($where);
      }

      if(!empty($order) && is_array($order)){
        $order_array = array();
        $order_str   = '';

        foreach($order as $k=>$v){
          $order_array[] = $k.' '.$v;
        }

        if(!empty($order_array)){
          $order_str = implode(',',$order_array);
        }

        $this->db->order_by($order_str);
      }

      if(!empty($limit)){
        $this->db->limit($limit);
      }

      $result_tmp = $this->db->from($this->table_name)->get()->result_array();

      if(!empty($result_tmp)){
        $result = $result_tmp;
      }
    }

    return $result;
  }

  // 新增
  function insert($insert=array())
  {
    $result = 0;

    if(!empty($this->table_name) && !empty($insert)){
      $result_tmp = $this->db->insert($this->table_name,$insert);

      if(!empty($result_tmp)){
        $result = $this->db->insert_id();
      }
    }

    return $result;
  }

  // 更新
  function update($update=array(),$where=array())
  {
    $result = 0;

    if(!empty($this->table_name) && !empty($update) && !empty($where)){
      $result_tmp = $this->db->update($this->table_name,$update,$where);

      if(!empty($result_tmp)){
        $result = $this->db->affected_rows();
      }
    }

    return $result;
  }

  // 刪除
  function del($where=array())
  {
    $result = 0;

    if(!empty($this->table_name) && !empty($where)){
      $result_tmp = $this->db->delete($this->table_name,$where);

      if(!empty($result_tmp)){
        $result = $this->db->affected_rows();
      }
    }

    return $result;
  }

  // 取得資料數
  function num_rows($where=array(),$select='*')
  {
    $result = 0;

    if(!empty($this->table_name)){
      $result_tmp = $this->db->select($select)->from($this->table_name)->where($where)->get()->num_rows();

      if(!empty($result_tmp)){
        $result = $result_tmp;
      }
    }

    return $result;
  }
}