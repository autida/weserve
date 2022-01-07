<?php
//we need to start session in order to access it through CI
//session_start();
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';

class Register_Customer extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('register_model');
    }
    private function returns($result)
    {
        if ($result) {
            return $this->response($result, REST_Controller::HTTP_OK);
        } else {
            $result = array(
                'message' => 'Registration Unsuccessful.',
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    }
    
    public function index_get() {
        $this->load->view('register_customer');
    }

    public function index_post(){

        $data = array(
            'fname' => $this->input->post('fname'),
            'lname' => $this->input->post('lname'),
            'mname' => $this->input->post('mname'),
            // 'salon_description' => $this->input->post('business_description'),
            // 'loc_lat' => $this->input->post('lat'),
            // 'loc_long' => $this->input->post('long'),
            'contact_number' => $this->input->post('phone_number'),
            // 'email' => $this->input->post('email'),
            'address' => $this->input->post('brgy_address').", ".$this->input->post('city_address'),
            'brgy' => $this->input->post('brgy_address'),
            'city' => $this->input->post('city_address'),
            );
        $user_credentials = array(
            'username' => $this->input->post('username'),
            'password' => $this->input->post('password')
        );
        $result = $this->register_model->new_customer($data,$user_credentials); 
            
        if($result){
            // redirect(base_url());
            $this->load->view('login_customer');
        }else{
            $this->returns($result);
        }
        
    }
   

  
}