<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class test extends MY_Controller {
    
    function __construct()
    {
      parent::__construct(); 
      
      $this->load->model( 'model_user');
      $this->load->model( 'model_user_token');
      $this->load->model( 'model_operation');
      $this->load->helper('url');
      $this->load->driver('cache');      
    }


    public function test()
    {
        $mapData = array();
        $this->View('view_login', $mapData);
    }


    public function index()
    {
        unset($_SESSION['end_user']);
        print_r($_SESSION);
    }
  
}

