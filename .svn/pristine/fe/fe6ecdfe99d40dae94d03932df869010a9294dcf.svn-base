<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class account extends MY_Controller {
    
    function __construct()
    {
      parent::__construct(); 
      
      
     
    }

	public function index()
	{
         //$this->load->model( 'account_model');
        
        $result = $this->account_model->getlist();
        
		$mapData = array();
		$mapData['data'] = $result; 
        $this->View('view_account', $mapData);
        //$this->jsonView($mapData);
	}
  
}

