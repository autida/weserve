<?php

class Appointment_Model extends CI_Model
{
  
 
    public function get_request_appointment($id){
        $bol=1;
        $this->db->select('*');
        $this->db->from('appointment');
        $this->db->where('salon_id',$id);
        // $this->db->where('is_deleted',0);
        $this->db->where('status','pending');
        // $this->db->or_where('status','active');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function accept_appointment($appointment_id,$data,$notif_data){
        $this->db->where('appointment_id',$appointment_id);
        $this->db->update('tblappointment',$data);

        $this->db->insert('tblnotifications',$notif_data);
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }

    public function deny_appointment($appointment_id,$data,$notif_data){
        $this->db->where('appointment_id',$appointment_id);
        $this->db->update('tblappointment',$data);

        $this->db->insert('tblnotifications',$notif_data);
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }

    
}
