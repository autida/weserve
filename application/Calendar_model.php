<?php

class Calendar_Model extends CI_Model
{
  
    public function get_salon(){
        $bol=1;
        $this->db->select('*');
        $this->db->from('tblsalon');
        $this->db->where('is_approved',$bol);
        $this->db->where('is_archieved',0);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
    public function get_appointment($id){
        $bol=1;
        $this->db->select('*');
        $this->db->from('appointment');
        $this->db->where('salon_id',$id);
        $this->db->where('is_deleted',0);
        $this->db->or_where('status','completed');
        $this->db->or_where('status','COMPLETED');
        $this->db->or_where('status','ACTIVE');
        $this->db->or_where('status','active');
        $this->db->order_by('status','desc');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
    public function get_request_appointment($id){
        $bol=1;
        $this->db->select('*');
        $this->db->from('appointment');
        $this->db->where('salon_id',$id);
        $this->db->where('is_deleted',0);
        $this->db->where('status','pending');
        // $this->db->or_where('status','active');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    
}
