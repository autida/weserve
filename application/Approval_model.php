<?php

class Approval_Model extends CI_Model
{
  
    public function get_salon_NotApproved(){
        $bol=0;
        $this->db->select('*');
        $this->db->from('tblsalon');
        $this->db->where('is_approved',$bol);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_appointmentRequest(){
        $bol=0;
        $this->db->select('*');
        $this->db->from('tblappointment');
        $this->db->where('status','pending');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
}
