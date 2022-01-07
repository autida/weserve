<?php
//we need to start session in order to access it through CI
//session_start();
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

// This can be removed if you use __autoload() in config.php OR use Modular Extensions
/** @noinspection PhpIncludeInspection */
require APPPATH . 'libraries/REST_Controller.php';

class Login extends REST_Controller {

    function __construct()
    {
        parent::__construct();
        $this->load->model('login_model');
    }
    private function returns($result)
    {
        if ($result) {
            return $this->response($result, REST_Controller::HTTP_OK);
        } else {
            $result = array(
                'message' => 'No data found.',
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    }
    private function getRealIpAddr()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
    public function index_get() {
        $this->load->view('login');
    }

    public function index_post(){

        $data = array(
            'username' => $this->input->post('username'),
            'password' => $this->input->post('password')
            );
        $result = $this->login_model->login_auth($data);
        if($result['result']){
            foreach($result['result'] as $data){
                $id = $data->accnt_id;
                $username = $data->username;
                $password = $data->password;
                $fname = $data->fname;
                $lname = $data->lname;
                $level = $data->usertype_id;
                $pic = $data->image;
            }
            $session_data = array(
                'id' => $id,
                'username' => $username,
                'password' => $password,
                'fname' => '$fname',
                'lname' => '$lname',
                'usertype_idlink' => $level,
                'pic' => $pic,
                'ip_address' => $this->getRealIpAddr(),
                'pc_name' => gethostbyaddr($this->getRealIpAddr()),
            );
            $this->session->set_userdata('logged_in', $session_data);
            $data = array(
                'message' => 'Successfully Login'
            );
            // $this->load->view('template', $data);
            redirect(base_url());
        }else{
            if(!$result['username']){
                $data = array(
                    'message' => 'username is Incorrect'
                );
            }else{
                $data = array(
                    'message' => 'password is Incorrect'
                );
            }
            $this->load->view('login', $data);
        }
    }

    public function logout_get(){

        $this->session->set_userdata('logged_in');
        if($this->get('session')){
            $data = array(
                'message' => 'Session Expired. Login Again'
            );
        }else{
            $data = array(
                'message' => 'Successfully Logout.'
            );
        }
        return $this->load->view('login', $data);
    }

    // public function company_get(){

    //     $result = $this->login_model->get_company_info();
    //     $this->response($result, REST_Controller::HTTP_OK);
    // }

    public function user_get(){
        $data = $this->session->userdata('logged_in');
        if($this->get('admindata')){
            $result = $this->login_model->get_admin($data);
            $this->response($result, REST_Controller::HTTP_OK);
        }elseif($this->get('salondata')){
            $result = $this->login_model->get_salon($data);
            $this->response($result, REST_Controller::HTTP_OK);

        }else{
        // $profpicture = $this->login_model->get_profile();
            if ($data){
                $result = array(
                    // 'pic' => $profpicture[0]['image'],
                    'record'=>
                        [
                        'id' => $data['id'],
                        // 'user' => $data['fname']." ".$data['lname'],
                        'level' => $data['usertype_idlink'],
                        'pic' => $data['pic'],
                        'username' => $data['username'],
                        'password' => $data['password'],
                        ],
                    
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }else{  
                $result = array(
                    'login' => false
                );
                $this->response($result, REST_Controller::HTTP_OK);
            }
            }
    }

    public function user_post(){
        if($this->post('edit')){
            $data = array(
                'username' => $this->post('username') ? $this->post('username') : "",
            );
            $result = $this->login_model->update_user($data, $this->post('password'));
            if($result['username']):
                $result = array(
                    'username' => true,
                    'success' => false,
                    'message' => 'username error'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            elseif($result['password']):
                $result = array(
                    'password' => true,
                    'success' => false,
                    'message' => 'password error'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            elseif($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        }elseif($this->post('changePass')){
            $data = array(
                'Retypepassword' => $this->post('Retypepassword') ? $this->post('Retypepassword') : "",
                'password' => $this->post('Newpassword') ? $this->post('Newpassword') : "",
            );
            $result = $this->login_model->update_password($data, $this->post('Oldpassword'));
            if($result['password']):
                $result = array(
                    'password' => true,
                    'success' => false,
                    'message' => 'password error'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            elseif($result):
                $result = array(
                    'success' => true,
                    'message' => 'Successfully updated'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            else:
                $result = array(
                    'success' => false,
                    'message' => 'Failed saving'
                );
                $this->response($result, REST_Controller::HTTP_OK);
            endif;
        }elseif($this->post('changePic')){
            $data = array(
                'image' => $this->post('ProfilePic')
            );
            if($_FILES){
                $file_names = array();
                $logged_data = $this->session->userdata('logged_in');
                foreach ($_FILES as $key => $file) {
    
                    // check if image
                    // var_dump($file);
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
                    $path = "assets/images/profpic/";
                    if (!is_dir($path)) {
                        mkdir($path, 0777);
                    }
                    move_uploaded_file($file_tmp, $path . $file_name);
                    $data['image'] = $file_name;
                }
            }
            $result = $this->login_model->save_profile($data, $this->post('password'));
            if ($result['password']) {
                $result = array(
                    'password' => $result['password'],
                    'success' => false,
                    'message' => 'password Error',
                );
                return $this->response($result, REST_Controller::HTTP_OK);
            } elseif ($result == true) {
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
    }

    public function menu_not_allowed_get(){
        // if($this->get('disallowed')){
        //     $result = $this->login_model->get_menu_not_allowed();
        // }else
        if($this->get('allowed')){
            $result = $this->login_model->get_menu_allowed();
        }
        $this->returns($result);
    }
    public function restriction_post(){
        $data = array(
            'username' => $this->post('username'),
            'password' => $this->post('password')
        );
        $result = $this->login_model->restriction_auth($data);
        if($result){
            $result = array(
                'authorized' => true,
                'message' => 'Successfully Override.',
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }else{
            $result = array(
                'authorized' => false,
                'message' => 'Access Denied. User is not an admin or not found.'
            );
            $this->response($result, REST_Controller::HTTP_OK);
        }
    }

}