<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class User_List extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('user_list_model');
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
        if($this->get('salonuser')){
            $result = $this->user_list_model->get_salonuser($this->get('id'));
        }else
            $result = $this->user_list_model->get_data();
        
            $this->returns($result);
    }
    public function index_post(){
        if($this->post('deleteuser')){
            $result = $this->user_list_model->delete_user($this->post('admin_id'));
                if($result){
                    $result = array(
                        'success' => true,
                        'message' => 'Successfully Deleted.'
                    );
                    $this->response($result, REST_Controller::HTTP_OK);
                }else{
                    $result = array(
                        'success' => false,
                        'message' => 'Failed deletion.'
                    );
                    $this->response($result, REST_Controller::HTTP_OK);
                }
        }else{
            $usertype_id_lnk = 1;
            $password = 'admin';
            $position = '';
            $data = array(
                'admin_id' => $this->post('admin_id') ? $this->post('admin_id') : "",
                'lname' => $this->post('LastName') ? $this->post('LastName') : "",
                'fname' => $this->post('FirstName') ? $this->post('FirstName') : "",
                'mname' => $this->post('MiddleName') ? $this->post('MiddleName') : "",
                'email_address' => $this->post('email') ? $this->post('email') : "",
                'contact_num' => $this->post('contact_num') ? $this->post('contact_num') : "",
                'position' => $position
            );
            $result = $this->user_list_model->save_data($data,$this->post('username'));
            if ($result['id']){
                $result = array(
                    'success' => true,
                    'id' => $result['id'],
                    'message' => 'Successfully saved'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }elseif($result){
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }else{
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }
        }
        
}

    public function index_delete(){
        $result = $this->user_list_model->delete_data($this->query('id'));
        if ($result){
            $result = array(
                'success' => true,
                'message' => 'Successfully deleted'
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }else{
            $result = array(
                'success' => false,
                'message' => 'Failed deleting'
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }
    }

}