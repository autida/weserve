<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Dashboard extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('dashboard_model');
    }

    private function returns($result){
        if($result){
            return $this->response($result, REST_Controller::HTTP_OK);
        }else{
            $result = array(
                'message' => 'No data found'
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    }

    public function index_get(){
        if($this->get('appointment')){
            $result = $this->dashboard_model->get_appointment($this->get('salon_id'));
        }elseif($this->get('request_appointment')){
            $result = $this->dashboard_model->get_request_appointment($this->get('salon_id'));
        }elseif($this->get('review')){
            $result = $this->dashboard_model->get_salon_review();
        }elseif($this->get('get_salon_Rating')){
            $result = $this->dashboard_model->get_salon_review_Rating();
        }elseif($this->get('rating')){
            $result = $this->dashboard_model->get_salon_rating($this->get('id'));
        }elseif($this->get('customer_cnt')){
            $result = $this->dashboard_model->get_customer_num();
        }else{
            $result = $this->dashboard_model->get_salon();
        }
       
        $this->returns($result);
    }

    public function index_post(){
        if($this->post('submitData')){
            $data = array(
                'is_approved' => 0
            );
            $result = $this->dashboard_model->submit_Data($data,$this->post('salon_id'));
            if ($result) {
                $result = array(
                    'success' => true,
                    'message' => 'Successfully Submitted.',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            } else {
                $result = array(
                    'success' => false,
                    'message' => 'Failed Submission',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }
        }
    }
    public function appointment_get(){
            $result = $this->dashboard_model->get_appointment($this->get('salon_id'));
        $this->returns($result);
    }

}