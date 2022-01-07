<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Service_Sal extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('service_model');
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
        if($this->get('getAllService')){
            $result = $this->service_model->get_services($this->get('id'));
            $this->returns($result);
        }
           
    }
// for update iadd
    public function index_post(){
        if($this->post('addService')){
            $data = array(
                'service_id' => $this->post('service_id') ? $this->post('service_id') : " ",
                'service_description' => $this->post('serv_name') ? $this->post('serv_name'):"",
                'service_price' => $this->post('serv_price') ? $this->post('serv_price'): "",
                'salon_id' => $this->post('salon_id') ? $this->post('salon_id'): "",
            );
            $result = $this->service_model->add_service($data);
            if($result['id']){
                $result = array(
                    'success' => true,
                    'id' => $result['id'],
                    'message' => 'Successfully added.',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }else if($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully Updated.'
                ); 
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed to Save.'
                ); 
                return $this->response($result, REST_Controller::HTTP_OK);
            }
        }else if($this->post('deleteservice')){
            $data = array(
                'is_deleted' => 1
            );
            $result = $this->service_model->delete_service($data,$this->post('salon_id'),$this->post('service_id'));
            $this->returns($result);
        }
        // $this->returns($result);
    }
}