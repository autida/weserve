<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Appointment extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('appointment_model');
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
        if($this->get('request_appointment')){
            $result = $this->appointment_model->get_request_appointment($this->get('salon_id'));
        }
       
        $this->returns($result);
    }

    public function index_post(){
        if($this->post('accept')){
            $data = array(
                'status' => 'active'
            );
            $notif_data = array(
                'notes' =>'Appointment approved!',
                'remarks' =>'Your appointment to '.$this->post('salon_name').' has been approved.',
                'date_time' => $this->post('date'),
                'status' => 'active',
                'customer_id' =>$this->post('customer_id'),
                'salon_id' => $this->post('salon_id'),
                'service_id' => $this->post('service_id'),
                'appointment_id' =>$this->post('appointment_id'),
            );
            $result = $this->appointment_model->accept_appointment($this->post('appointment_id'),$data,$notif_data);
            if($result['id']){
                $result = array(
                    'success' => true,
                    'message' => 'Appointment active'
                );
               
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'message' => 'Something went wrong'
                );
                return $this->response($result, REST_Controller::HTTP_OK); 
            }
           
        }elseif($this->post('deny')){
            $data = array(
                'status' => 'denied',
                'comment' => $this->post('comment')
            );

            $notif_data = array(
                'notes' =>'Appointment denied: '.$this->post('comment'),
                'remarks' =>'Your appointment to '.$this->post('salon_name').' was denied.',
                'date_time' => $this->post('date'),
                'status' => 'denied',
                'customer_id' =>$this->post('customer_id'),
                'salon_id' => $this->post('salon_id'),
                'service_id' => $this->post('service_id'),
                'appointment_id' =>$this->post('appointment_id'),
            );
            $result = $this->appointment_model->deny_appointment($this->post('appointment_id'),$data,$notif_data);
            if($result){
                $result = array(
                    'success' => true,
                    'message' => 'Appointment denied'
                );
               
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'message' => 'Something went wrong'
                );
                return $this->response($result, REST_Controller::HTTP_OK); 
            }
           
        }elseif($this->post('complete')){
            $data = array(
                'status' => 'completed'
            );

            $notif_data = array(
                'notes' =>'Appointment completed!',
                'remarks' =>'Your appointment to'.$this->post('salon_name').'is completed.',
                'status' => 'completed',
                'customer_id' =>$this->post('customer_id'),
                'salon_id' => $this->post('salon_id'),
                'service_id' => $this->post('service_id'),
                'appointment_id' =>$this->post('appointment_id'),
                'data_time' => $this->post('date'),
                'isRead' => '1'
            );
            $result = $this->appointment_model->completed_appointment($this->post('appointment_id'),$data,$notif_data);
            if($result['id']){
                $result = array(
                    'success' => true,
                    'message' => 'Appointment completed'
                );
               
                return $this->response($result, REST_Controller::HTTP_OK);
            }elseif($result){
                $result = array(
                    'success' => true,
                    'message' => 'Appointment completed'
                );
               
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'message' => 'Something went wrong'
                );
                return $this->response($result, REST_Controller::HTTP_OK); 
            }
           
        }
    }
}