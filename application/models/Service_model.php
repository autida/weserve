<?php

class Service_Model extends CI_Model
{
  
    public function get_services($id){
        $this->db->select('*');
        $this->db->from('tblservice');
        $this->db->where('salon_id',$id);
        $this->db->where('is_deleted',0);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function add_service($data){
        // $this->db->insert('tblservice',$data);
        // if ($this->db->affected_rows()) {
        //     return array('id' => $this->db->insert_id());
        // } else {
        //     return false;
        // }

        $this->db->select("*");
        $this->db->from("tblservice");
        $this->db->where("service_id", $data['service_id']);
        $query = $this->db->get();
        if($query->result()){
            $this->db->where('service_id', $data['service_id']);
            $this->db->update('tblservice', $data);
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
        }else{
            $this->db->insert('tblservice', $data);
            $data_id = array('id' => $this->db->insert_id());
            // $data1['usertype_id'] = 1;
            // $data1['id_lnk'] = $data_id['id'];
            // // $data1['id_lnk'] = $data_id['id'];
            // $this->db->insert('tblaccount', $data1);
            // $accnt_id = array('id' => $this->db->insert_id());
            // $userdata['accnt_id'] = $accnt_id['id'];
            // $userdata['username'] = $username;
            // $this->db->insert('tbluser', $userdata);
            if ($this->db->affected_rows()) {
                return array('id' => $this->db->insert_id());
            } else {
                return false;
            }
        }
    }

    public function delete_service($data,$salon_id,$service_id)
    {
        $this->db->where('service_id', $service_id);
        $this->db->where('salon_id', $salon_id);
        $this->db->update('tblservice', $data);
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }   
    }
}
