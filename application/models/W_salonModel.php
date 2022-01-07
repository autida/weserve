<?php

class W_Salonmodel extends CI_Model
{
  
    public function get_salon(){
        
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->group_by('salon_id');

        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_avg_rating($id){
        $query = $this->db->select('AVG(rate) AS average')->from('tblreview')
        ->where('salon_id',$id)->get()->result();

        return $query?$query[0]->average:0;
    }

    public function get_salon_withfilters($filters){
    if($filters['salon_description']!=''&&$filters['service_description']==''&&$filters['service_price']==''){
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->like('name',$filters['salon_description'],'both');
        $this->db->group_by('salon_id');
        $query = $this->db->get();
    }else if($filters['salon_description']==''&&$filters['service_description']!=''&&$filters['service_price']==''){
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->like('service_description',$filters['service_description'], 'both');
        $this->db->group_by('salon_id');
        $query = $this->db->get();
    }else if($filters['salon_description']==''&&$filters['service_description']==''&&$filters['service_price']!=''){
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->where('service_price<=',$filters['service_price']);
        $this->db->group_by('salon_id');
        $query = $this->db->get();
    }else if($filters['salon_description']!=''&&$filters['service_description']!=''&&$filters['service_price']==''){
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->like('service_description',$filters['service_description'], 'both');
        $this->db->like('name',$filters['salon_description'],'both');
        $this->db->group_by('salon_id');
        $query = $this->db->get();
    }else if($filters['salon_description']!=''&&$filters['service_description']==''&&$filters['service_price']!=''){
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->where('service_price<=',$filters['service_price']);
        $this->db->like('name',$filters['salon_description'],'both');
        $this->db->group_by('salon_id');
        $query = $this->db->get();
    }else if($filters['salon_description']==''&&$filters['service_description']!=''&&$filters['service_price']!=''){
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->where('service_price<=',$filters['service_price']);
        $this->db->like('service_description',$filters['service_description'], 'both');
        $this->db->group_by('salon_id');
        $query = $this->db->get();
    }else{
        $this->db->select('*');
        $this->db->from('salon_services');
        $this->db->group_by('salon_id');
        $query = $this->db->get();
    }

        return $query->result() ?  $query->result() : false;
    }

    public function get_services(){
        
        $this->db->select('*');
        $this->db->from('tblservice')
        ->group_by('service_description');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_salon_services($id){
        
        $this->db->select('*');
        $this->db->from('tblservice')
        ->where('salon_id',$id);
        // ->group_by('service_description');
        $query = $this->db->get();
        
        return $query->result() ?  $query->result() : false;
    }

    public function get_salon_staff($id){
        $this->db->select('*');
        $this->db->from('tblstaff')
        ->where('salon_id',$id)
        ->group_by('lname');
        $query = $this->db->get();
        
        return $query->result() ?  $query->result() : false;
    }


    public function save_appointment($data){
        // print_r($data);
        $this->db->insert('tblappointment', $data);
        // print_r($this->db->last_query());
        if($this->db->affected_rows()>0){
            return true;
        }else{
            return false;
        } 
    }

    public function check_status($id){
        $query = $this->db->select('*')->from('tblappointment')
        ->where('customer_id',$id)
        ->get();

        // print_r($this->db->last_query());
        
        return $query->result();
    }

    public function get_appointment($id){
        $query = $this->db->select('t1.*,t2.*,t3.*')->from('tblappointment t1')
        
        ->join('tblsalon t2','t1.salon_id=t2.salon_id','left')
        ->join('tblservice t3','t1.services_id=t3.service_id','left')
        ->where('t1.customer_id',$id)
        ->get();

        // print_r($this->db->last_query());
        
        return $query->result()?$query->result():false;
    }

    public function cancel_appointment($id){
        $this->db->where('appointment_id', $id);
        $this->db->update('tblappointment', ['status'=>'cancelled']);

        if($this->db->affected_rows()){
            return true;
        }else{
            return false;
        }
    }

    public function save_review($data){
        $this->db->insert('tblreview', $data);
        if($this->db->affected_rows()>0){
            $this->db->where('appointment_id', $data['appointment_id']);
            $this->db->update('tblappointment', ['status'=>'rated']);
            return true;
        }else{
            return false;
        } 
    }

    public function get_reviews($id){
        $query = $this->db->select('*')->from('tblreview')
        ->where('salon_id',$id)
        ->order_by('rate','DESC')
        ->get();

        // print_r($this->db->last_query());
        
        return $query->result()?$query->result():false;
    }

    
}