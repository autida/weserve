<?php

class User_List_Model extends CI_Model
{

    
    public function get_data(){
        $this->db->select('*');
        $this->db->from('user_acct_admin');
        $this->db->where('isDeleted',0);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
    public function get_salonuser($id){
        $this->db->select('*');
        $this->db->from('tblstaff');
        $this->db->where('is_deleted',0);
        $this->db->where('salon_id',$id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

   public function save_data($data,$username){
        $this->db->select("*");
        $this->db->from("tbladmin");
        $this->db->where("admin_id", $data['admin_id']);
        $query = $this->db->get();
        if($query->result()){
            $this->db->where('admin_id', $data['admin_id']);
            $this->db->update('tbladmin', $data);
            if ($this->db->affected_rows()) {

                // $this->db->select("*");
                // $this->db->from("tbluser");
                // $this->db->where("user_id", $user_id);
                return true;
            } else {
                return false;
            }
        }else{
            $this->db->insert('tbladmin', $data);
            $data_id = array('id' => $this->db->insert_id());
            $data1['usertype_id'] = 1;
            $data1['id_lnk'] = $data_id['id'];
            // $data1['id_lnk'] = $data_id['id'];
            $this->db->insert('tblaccount', $data1);
            $accnt_id = array('id' => $this->db->insert_id());
            $userdata['accnt_id'] = $accnt_id['id'];
            $userdata['username'] = $username;
            $this->db->insert('tbluser', $userdata);
            if ($this->db->affected_rows()) {
                return array('id' => $this->db->insert_id());
            } else {
                return false;
            }
        }
   }

   public function delete_user($id){
    $data['isDeleted'] = 1;
    $this->db->select("*");
    $this->db->from("tbladmin");
    $this->db->where("admin_id", $id);
    $query = $this->db->get();
    if($query->result()){
        $this->db->where("admin_id", $id);
        $this->db->update('tbladmin',$data);
        return true;
    }else{
        return false;
    }
}

    public function delete_data($id){
        $this->db->select("*");
        $this->db->from("tblaccount");
        $this->db->where("accnt_id", $id);
        $query = $this->db->get();
        if($query->result()){
            $this->db->where("accnt_id", $id);
            $this->db->delete("tblaccount");
            return true;
        }else{
            return false;
        }
    }
}
