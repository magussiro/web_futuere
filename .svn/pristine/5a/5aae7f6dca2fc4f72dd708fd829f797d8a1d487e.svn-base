<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Testobj extends CI_Controller {
    

 function __construct()
    {
        parent::__construct();
    }

	public function index()
	{
	    date_default_timezone_set("Asia/Taipei");
	    echo strtotime("2017-09-20 10:41:00") . "<br>";
	    echo strtotime("2017-09-20 10:41:23") . "<br>";
	    echo strtotime("2017-09-20 10:41:12") . "<br>";
	    echo strtotime("2017-09-20 10:41:12") + 47 . "<br>";
	    
	    
	    $now = time();
	    $offset = $now % 60;
	    $delay = 60 - $offset;
	    
	    echo date('Y-m-d H:i:s',$now) . "<br>";
	    echo $offset . "/" . $delay;
    }

}
