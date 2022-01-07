<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Staff extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('staff_model');
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
        if($this->get('getAllStaff')){
            $result = $this->staff_model->get_allstaff($this->get('id'));
            $this->returns($result);
        }elseif($this->get('AllSched')){
            $result = $this->staff_model->all_sched($this->get('salon_id'));
            $this->returns($result);
        }elseif($this->get('stafftime')){
            $result = $this->staff_model->staff_time($this->get('salon_id'));
            $this->returns($result);
        }elseif($this->get('getAllSched')){
            $result = $this->staff_model->get_allsched($this->get('id'),$this->get('staff_id'));
            $this->returns($result);
        }elseif($this->get('getStaffService')){
            $result = $this->staff_model->get_staffservice($this->get('staff_id'));
            $this->returns($result);
        }elseif($this->get('StaffService')){
            $result = $this->staff_model->staff_service($this->get('salon_id'));
            $this->returns($result);
        }
           
    }
// for update iadd
    public function index_post(){
        if($this->post('addstaff')){
            $data = array(
                'staff_id' =>$this->post('staff_id') ? $this->post('staff_id') : " ",
                'lname' => $this->post('lname') ? $this->post('lname'):" ",
                'fname' => $this->post('fname') ? $this->post('fname'): " ",
                'mname' => $this->post('mname') ? $this->post('mname'):"",
                'contact_number' => $this->post('contact_number') ? $this->post('contact_number'):"",
                'salon_id' => $this->post('salon_id') ? $this->post('salon_id'):"",
            );
            $result = $this->staff_model->save_staff($data);
            if($result['id']){
                $result = array(
                    'success' => true,
                    'id' =>$result['id'],
                    'message' => 'Successfully Saved.',
                    
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }elseif($result){
                $result = array(
                    'success' =>true,
                    'message' => 'Successfully Updated',
                  
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed Saving',
                   
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }
            
        }elseif($this->post('sched')){
            $data = array(
                'timein' => $this->post('time_in')?$this->post('time_in'):'',
                'timeout' =>$this->post('time_out')?$this->post('time_out'):''
            );
            $result = $this->staff_model->save_sched($data,$this->post('staff_id'),$this->post('day'));
        }elseif($this->post('addStaffService')){
            $data = array(
                'staff_id' => $this->post('staff_id')?$this->post('staff_id'):'',
                'service_id' =>$this->post('service_id')?$this->post('service_id'):''
            );
            $result = $this->staff_model->add_staffservice($data);
            if($result['id']){
                $result = array(
                    'success' => true,
                    'id' =>$result['id'],
                    'message' => 'Successfully Saved.',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed Saving',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }
        }elseif($this->post('deleteStaff')){
            $data = array(
                'is_deleted' => 1
            );
            $result = $this->staff_model->delete_staff($data,$this->post('staff_id'),$this->post('salon_id'));
            if($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully Deleted.',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed Deleting',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }
        }elseif($this->post('deleteStaffservice')){
            $data = array(
                'is_deleted' => 1
            );
            $result = $this->staff_model->delete_staffservice($data,$this->post('staff_id'),$this->post('service_id'));
            if($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully Deleted.',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed Deleting',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }
        }elseif($this->post('deleteStaffsched')){
            $data = array(
                'is_deleted' => 1
            );
            $result = $this->staff_model->delete_staffsched($data,$this->post('staff_id'),$this->post('sched_id'));
            if($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully Deleted.',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed Deleting',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }
        }
       
    }
}