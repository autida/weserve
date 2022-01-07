<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';


class Gallery extends REST_Controller {

    function __construct()
    {
        // Construct the parent class
        parent::__construct();

        // Load session library
        // $this->load->library('session');

        // Load database
        $this->load->model('gallery_model');
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
            $result = $this->gallery_model->get_salonPhotos($this->get('id'));
            $this->returns($result);
    }

    
    public function index_post(){
    if($this->post('deleteImg')){
        $data = array(
            'is_deleted' => 1
        );
        $result = $this->gallery_model->delete_salon_photo($data, $this->post('img_id'));
         if ($result) {
            $result = array(
                'success' => true,
                'message' => 'Successfully Deleted',
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
        $data = array(
            'image' => $this->post('image')
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
                $randomnum = rand(0,100000);
                $extns = explode('.', $file['name']);
                $file_ext = strtolower(end($extns));
                $file_name = $logged_data['username'].time().$randomnum."." . $file_ext;
               
                $path = "assets/images/salon_gallery/";
                if (!is_dir($path)) {
                    mkdir($path, 0777);
                }
                move_uploaded_file($file_tmp, $path . $file_name);
                $data['image'] =  $file_name;
            }
        }
        $result = $this->gallery_model->save_salon_photo($data, $this->post('id_lnk'));
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
    }
       
    // }
    }
}