<?php

class Dashboard_Model extends CI_Model
{
  
    public function get_salon(){
        $bol=1;
        $this->db->select('*');
        $this->db->from('tblsalon');
        $this->db->where('is_approved',$bol);
        $this->db->where('is_archieved',0);
        $this->db->order_by('salon_id','ASC');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_salon_review(){
        $bol=1;
        $this->db->select('*');
        $this->db->from('salon_review_appointment');
        $this->db->where('is_approved',$bol);
        $this->db->where('is_archieved',0);
        $this->db->order_by('appointment_id','ASC');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_salon_review_Rating(){
        $bol=1;
        $this->db->select('salon_id,avg(rate) as rate');
        $this->db->from('salon_review_appointment');
        $this->db->where('is_approved',$bol);
        $this->db->where('is_archieved',0);
        $this->db->group_by('salon_id');
        $this->db->order_by('salon_id','ASC');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
    
    public function get_salon_rating($id){
        $bol=1;
        $this->db->select('rate');
        $this->db->from('salon_review_appointment');
        $this->db->where('salon_id',$id);
        $this->db->order_by('salon_id','ASC');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_appointment($id){
        $bol=1;
        $this->db->select('*');
        $this->db->from('appointment');
        // $this->db->where('salon_id',$id);
        // $this->db->where('is_deleted',0);
        $this->db->or_where('status','completed');
        $this->db->or_where('status','rated');
        $this->db->or_where('status','active');
        $this->db->order_by('appointment_id','asc');
        // $this->db->order_by('status','desc');
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

    public function submit_Data($data,$salon_id){
        $this->db->where('salon_id',$salon_id);
        $this->db->update('tblsalon',$data);
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }

    public function get_customer_num(){
        $this->db->select('count(*) as c');
        $this->db->from('tblcustomer');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
}
