<?php

class Register_Model extends CI_Model
{
  
    public function new_salon($data,$user_credentials){
            $this->db->insert('tblsalon', $data);
            $data_id = array('id' => $this->db->insert_id());
            $data1['usertype_id'] = 3;
            $data1['id_lnk'] = $data_id['id'];
            $this->db->insert('tblaccount', $data1);
            $accnt_id = array('id' => $this->db->insert_id());
            $user_credentials['accnt_id'] = $accnt_id['id'];
            $this->db->insert('tbluser', $user_credentials);
            if ($this->db->affected_rows()) {
                return array('id' => $this->db->insert_id());
            } else {
                return false;
            }
    }

    
}
