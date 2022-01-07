<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Salon extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('salon_model');
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
        if($this->get('bs')){
            $result = $this->salon_model->get_salonBS($this->get('id'));
        }elseif($this->get('pic')){
            $result = $this->salon_model->get_salonPic($this->get('id'));
        }else{
            $result = $this->salon_model->get_salonProfile($this->get('id'));
        }
         $this->returns($result);
    }

    public function index_post(){
            if($this->post('denied')){
                $result = $this->salon_model->update_salon_deny($this->post('id'));
                $this->returns($result); 
            }elseif($this->post('delete')){
                $result = $this->salon_model->update_salon_delete($this->post('id'));
                $this->returns($result); 
            }elseif($this->post('saveInfo')){
                $data = array(
                    'salon_id' => $this->post('salon_id'),
                    'name' => $this->post('name'),
                    'salon_description' => $this->post('salon_description'),
                    'loc_long' => $this->post('loc_long'),
                    'loc_lat' => $this->post('loc_lat'),
                    'phone_number' => $this->post('phone_number'),
                    'email' => $this->post('email'),
                    'office_hrs_in' => $this->post('office_hrs_in'),
                    'office_hrs_out' => $this->post('office_hrs_out'),
                    'address' => $this->post('brgy').", ".$this->post('city'),
                    'brgy' => $this->post('brgy'),
                    'city' => $this->post('city')
                );
                $result = $this->salon_model->update_salon_info($data);
                $this->returns($result); 

            }elseif($this->post('changebusiness_permit')){
                $data = array(
                    'salon_business_permit' => $this->post('ProfilePic')
                );
                if($_FILES){
                    $file_names = array();
                    $logged_data = $this->session->userdata('logged_in');
                    foreach ($_FILES as $key => $file) {
        
                        // check if image
                        var_dump($file);
                        $check = getimagesize($file['tmp_name']);
                        if($check == false) {
                            $result = array(
                                // 'data' => $file_size,
                                'success' => false,
                                'message' => 'File uploaded is not an image.'
                            );
                            return $this->response($result, REST_Controller::HTTP_OK);
                        }
                        if($file['size'] > 600000){
                            $result = array(
                                'data' => $file['size'],
                                'success' => false,
                                'message' => 'File size exceeds to 6MB.'
                            );
                            return $this->response($result, REST_Controller::HTTP_OK);
                        }
            
                        // $file_name = $file['name'];
                        $file_size = $file['size'];
                        $file_tmp = $file['tmp_name'];
                        // $file_type = $file['type'];
                        $extns = explode('.', $file['name']);
                        $file_ext = strtolower(end($extns));
                        $file_name = $logged_data['username']. "." . $file_ext;
                        $path = "profile_pics/";
                        if (!is_dir($path)) {
                            mkdir($path, 0777);
                        }
                        move_uploaded_file($file_tmp, $path . $file_name);
                        $data['salon_business_permit'] = $path . $file_name;
                    }
                }
                $result = $this->salon_model->update_salon_pic($data, $this->post('salon_id'));
                if ($result == true) {
                    $result = array(
                        'success' => true,
                        'message' => 'Successfully saved',
                    );
                    return $this->response($result, REST_Controller::HTTP_OK);
                } else {
                    $result = array(
                        'success' => false,
                        'message' => 'Failed saving',
                    );
                    return $this->response($result, REST_Controller::HTTP_OK);
                }
            }else{
                $result = $this->salon_model->update_salon_approve($this->post('id'));
                $this->returns($result); 
                
            }
    }
    public function profile_post(){
    // if($this->post('changePic')){
        $data = array(
            'salon_profpic' => $this->post('ProfilePic')
        );
        if($_FILES){
            $file_names = array();
            $logged_data = $this->session->userdata('logged_in');
            foreach ($_FILES as $key => $file) {

                // check if image
                // alert($file);
                $check = getimagesize($file['tmp_name']);
                if($check == false) {
                    $result = array(
                        // 'data' => $file_size,
                        'success' => false,
                        'message' => 'File uploaded is not an image.'
                    );
                    return $this->response($result, REST_Controller::HTTP_OK);
                }
                if($file['size'] > 600000){
                    $result = array(
                        'data' => $file['size'],
                        'success' => false,
                        'message' => 'File size exceeds to 6MB.'
                    );
                    return $this->response($result, REST_Controller::HTTP_OK);
                }
    
                // $file_name = $file['name'];
                $file_size = $file['size'];
                $file_tmp = $file['tmp_name'];
                // $file_type = $file['type'];
                $extns = explode('.', $file['name']);
                $file_ext = strtolower(end($extns));
                $file_name = $logged_data['username']. "." . $file_ext;
                $path = "assets/images/salon/";
                if (!is_dir($path)) {
                    mkdir($path, 0777);
                }
                move_uploaded_file($file_tmp, $path . $file_name);
                $data['salon_profpic'] =  $file_name;
            }
        }
        $result = $this->salon_model->update_salon_pic($data, $this->post('salon_id'));
        if ($result) {
            $result = array(
                'success' => true,
                'message' => 'Successfully saved',
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        } else {
            $result = array(
                'success' => false,
                'message' => 'Failed saving',
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    // }
    }
    public function bpermit_post(){
        // if($this->post('changePic')){
            $data = array(
                'salon_business_permit' => $this->post('ProfilePic')
            );
            if($_FILES){
                $file_names = array();
                $logged_data = $this->session->userdata('logged_in');
                foreach ($_FILES as $key => $file) {
    
                    // check if image
                    // alert($file);
                    $check = getimagesize($file['tmp_name']);
                    if($check == false) {
                        $result = array(
                            // 'data' => $file_size,
                            'success' => false,
                            'message' => 'File uploaded is not an image.'
                        );
                        return $this->response($result, REST_Controller::HTTP_OK);
                    }
                    if($file['size'] > 600000){
                        $result = array(
                            'data' => $file['size'],
                            'success' => false,
                            'message' => 'File size exceeds to 6MB.'
                        );
                        return $this->response($result, REST_Controller::HTTP_OK);
                    }
        
                    // $file_name = $file['name'];
                    $file_size = $file['size'];
                    $file_tmp = $file['tmp_name'];
                    // $file_type = $file['type'];
                    $extns = explode('.', $file['name']);
                    $file_ext = strtolower(end($extns));
                    $file_name = $logged_data['username']."_Business_permit.". $file_ext;
                    $path = "assets/images/salon/";
                    if (!is_dir($path)) {
                        mkdir($path, 0777);
                    }
                    move_uploaded_file($file_tmp, $path . $file_name);
                    $data['salon_business_permit'] =  $file_name;
                }
            }
            $result = $this->salon_model->update_salon_pic($data, $this->post('salon_id'));
            if ($result) {
                $result = array(
                    'success' => true,
                    'message' => 'Successfully saved',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            } else {
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            }
        // }
        }
}