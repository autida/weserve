<?php

Class Login_Model extends CI_Model {

    // Insert registration data in database
    public function login_auth($data) {
        
        // account/-------------------------------------------------------------------------------------
        $condition = "username =" . "'" . $data['username'] . "'";
        $this->db->select('*');
        $this->db->from('user_acct');
        $this->db->where($condition);
        $query = $this->db->get();

        if ($query->num_rows() == 0) {
            return array('username' => false, 'password' => true, 'result' => []);
        }else{
            $this->db->select('*');
            $this->db->from('user_acct');
            $this->db->where("password = '" . $data['password']. "' AND username ='" . $data['username'] . "'");
            $query = $this->db->get();
            if ($query->num_rows() == 0) {
                return array('password' => false, 'username' => true, 'result' => []);
            }else{ 
                // what does $query->result returns
                // $result = $query->result();
                // if($result->usertype_id == 1){
                //     $this->db->select('*');
                //     $this->db->from('user_acct_admin');
                //     $this->db->where('user_id', $result->user_id);
                //     $admin = $this->db->get();

                //     return array('password' => true, 'username' => true, 'result' => $admin->result());
                // }else
                return array('password' => true, 'username' => true, 'result' => $query->result());
            }
        }
    }

    public function get_formlist(){
        $sess = $this->session->userdata('logged_in');
        $condition = "usertype_id = " . $sess['usertype_idlink'];
        $this->db->select('*');
        $this->db->from('tbluser_access');
        $this->db->where($condition);
        $query = $this->db->get();
        $record_holder = array();
        if($query->result()){
            foreach($query->result() as $item){
                array_push($record_holder, $item->form_id);
            } 
            return $record_holder;
        }else{
            return false;
        }
        
    }
    public function get_admin($data){
        $this->db->select('*');
        $this->db->from('user_acct_admin');
        $this->db->where('accnt_id',$data['id']);
        $query = $this->db->get();

        return $query->result() ? $query->result() : false;
    }
    public function get_salon($data){
        $this->db->select('*');
        $this->db->from('user_acct_salon');
        $this->db->where('accnt_id',$data['id']);
        $query = $this->db->get();

        return $query->result() ? $query->result() : false;
    }
    public function get_menu_not_allowed(){
        $sess = $this->session->userdata('logged_in');
        $menu = "SELECT formID FROM tbluser_access b WHERE usertype_id = " . $sess['usertype_idlink'];
        $query = $this->db->select("*")->from('tblformlist a')->where("a.formID NOT IN(". $menu .")")->get();
        return $query->result() ? $query->result() : "";
    }
    public function restriction_auth($data){
        $condition1 = "username = '" . $data['username'] . "'";
        $condition2 = "password = '" . $data['password'] . "'";
        $this->db->select('*');
        $this->db->from('tblaccount');
        $this->db->where($condition1);
        $this->db->where($condition2);
        $query = $this->db->get();
        if($query->result()){
            return true;
        }else{
            return false;
        }
    }

    public function get_menu_allowed(){
        $sess = $this->session->userdata('logged_in');
        $query = $this->db
        ->select('b.*')
        // ->from('tbl b')
        ->from('tbluser_access a, tblformlist b')
        ->where('a.form_id = b.formID')
        ->where('a.usertype_id', $sess['usertype_idlink'])
        ->get();
        return $query->result() ? $query->result() : false;
    }

    public function update_user($data, $password) {
        $sess = $this->session->userdata('logged_in');
        $username = $this->db
        ->select('username')
        ->from('tbluser')
        ->where('username', $data['username'])
        ->where("accnt_id <> '". $sess['id']. "'")
        ->get();
        if($username->result()){
            return array('username' => true, 'password' => false);
        }
        $this->db->select('password');
        $this->db->from('tbluser');
        $this->db->where('accnt_id', $sess['id']);
        $query = $this->db->get();
        if ($query->result()) {
            $password = true;
            foreach($query->result() as $record){
                if($record->password != $password){
                    $password = false;
                }
            }
            if(!$password){
                return array('password' => true, 'username' => false);
            }
            $this->db->where('accnt_id', $sess['id']);
            $this->db->update('tbluser', $data);
            return true;
        }else {
            return false;
        }
    }

    public function update_password($data, $old){
        $sess = $this->session->userdata('logged_in');
        $this->db->select('*');
        $this->db->from('tbluser');
        $this->db->where('accnt_id', $sess['id']);
        $this->db->where('password', $old);
        $query = $this->db->get();
        if ($query->result()) {
            $password = true;
            foreach($query->result() as $record){
                if($record->password != $old){
                    $password = false;
                }
            }
            if(!$password){
                return array('password' => true);
            }
            $this->db->where('accnt_id', $sess['id']);
            $this->db->update('tbluser',$data['Retypepassword']);
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
        }else {
            return false;
        }
    }

    public function get_profile(){
        $sess = $this->session->userdata('logged_in');
        $this->db->select('image');
        $this->db->from('tblimage');
        $this->db->where('id_lnk', $sess['id']);
        $this->db->where('img_cat_link', 3);
        $this->db->where('usertype_lnk', $sess['usertype_idlink']);
        $query = $this->db->get();
        return $query->result() ? $query->result() : false;
    }

    public function save_profile($data, $password){
        $sess = $this->session->userdata('logged_in');
        $this->db->select('*');
        $this->db->from('tblaccount');
        $this->db->where('accnt_id', $sess['id']);
        $query = $this->db->get();
        if ($query->result()) {
            $password = true;
            foreach($query->result() as $record){
                if($record->password != $password){
                    $password = false;
                }
            }
            if(!$password){
                return array('password' => true);
            }
            
            $this->db->where('accnt_id', $sess['id']);
            $this->db->where('img_cat_link', 3);
            $this->db->where('usertype_lnk', 1);
            $this->db->update('tblimage',$data['image']);
            return true;
        }else {
            return false;
        }
    }

   
}