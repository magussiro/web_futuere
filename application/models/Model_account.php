<?php
class model_account extends MY_Model {
    
    public function __construct(){
        
        parent::__construct('account');
       // $this->load->helper(array('unit'));
       
    }
    
    
    
    function test()
    {       
        $strSQL = ' select * from account ';
        return $this->mydb->queryArray($strSQL);  
    }
    
    
    
}