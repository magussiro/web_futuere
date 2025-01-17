<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
    public function __construct() {        
        parent::__construct();
		header("Content-Type:text/html; charset=utf-8");
		$this->load->library('session');
		$this->load->helper('url');
		
		
		
		
		//$this->load->library(array('session', 'ssp'));
		//$this->load->helper(array('form', 'url', 'unit'));

		//$mode		= $this->input->get($this->config->item('function_trigger'), TRUE);
		//if ( ! $mode) {
		//	return false;
		//}

		// 若為下載檔案，則不限制記憶體大小，執行時間延長到 180s （三分鐘）
		//if ( false !== array_search($mode, array('download') )) {
		//	set_time_limit(180);
		//	ini_set('memory_limit', '-1');
		//}
		//$this->router->fetch_method();
		
		//預載同名model
		 $controllerName = $this->router->fetch_class();
		 //$this->load->model( $controllerName . '_model');
		 //$lang = $this->config->item('language');
		 //權限檢查,排除登入頁
		 if($controllerName !='login')
		 {
			if(!isset($_SESSION['end_user']))
			{
			    if($_SERVER["CONTENT_TYPE"]!="application/json" ){
				$this->config->item('base_url');
				echo "<script>function logout () {parent.ws.close();} if (parent.ws != null ) {parent.alertify.error('連線中斷');setInterval(logout,1000)}</script>";
				redirect($this->config->item('base_url')+'login', 'refresh');
                }else{
			        echo json_encode(['msg'=>"login_expire"]);
			        die;
                }
			}
		 } 		
    }
	
	 //json defaultView
    protected function jsonView($mapData)
    {
		header('Content-Type: application/json');

		/*if($mapData == null)
		{
			echo json_encode('null');
		}*/
		
		//是陣列直接轉JSON,不是當做是訊息，幫建名稱再回傳
		if(is_array($mapData))
		{
			echo json_encode($mapData);
		} 
		else
		{
			$msg = array();
			$msg['msg'] = $mapData;
			echo json_encode($msg);
		}
		exit;
    }
    
    //一般頁面的VIEW
    protected function View($viewName, $data)
    {
		echo '<script>
				var webroot = "'. base_url() .'";
			</script>';
		
		//載網站根目錄，for js path
        $header['base_url'] = base_url();
		$this->load->view('admin/admin_header',$header);
		
		$this->load->view($viewName,$data);
		
        $this->load->view('admin/admin_footer');
    }
	
	
    
}