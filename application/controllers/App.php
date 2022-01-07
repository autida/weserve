<?php
//we need to start session in order to access it through CI
//session_start();
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');


class App extends CI_Controller {

    public function index()
	{
		
		if($this->session->userdata('logged_in')){
			$this->load->view('template');
		}else{
			return redirect(base_url('login'), 'refresh');
		}
		
	}
    
}
