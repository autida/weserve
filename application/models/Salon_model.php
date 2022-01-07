<?php

class Salon_Model extends CI_Model
{
  
    public function get_salonProfile($id){
        $this->db->select('*');
        $this->db->from('tblsalon');
        $this->db->where('salon_id',$id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_salonBS($id){
        $this->db->select('salon_business_permit');
        $this->db->from('tblsalon');
        $this->db->where('salon_id',$id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_salonPic($id){
        $this->db->select('salon_profpic');
        $this->db->from('tblsalon');
        $this->db->where('salon_id',$id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function update_salon_approve($id){
        $data = array('is_approved'=> 1);
        $this->db->where('salon_id',$id);
        $this->db->update('tblsalon',$data);
        // $query = $thiqs->db->get();
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }
    public function update_salon_deny($id){
        $data = array('is_approved'=> 2);
        $this->db->where('salon_id',$id);
        $this->db->update('tblsalon',$data);
        // $query = $thiqs->db->get();
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }
    public function update_salon_delete($id){
        $data = array('is_archieved'=> 1);
        $this->db->where('salon_id',$id);
        $this->db->update('tblsalon',$data);
        // $query = $thiqs->db->get();
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }
    
    public function update_salon_info($info)
    {
        $this->db->select('*');
        $this->db->from('tblsalon');
        $this->db->where('salon_id',$info['salon_id']);
        $query = $this->db->get();
        if($query->result()){
            $this->db->where('salon_id',$info['salon_id']);
            $this->db->update('tblsalon',$info);
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
        }
       
    }

    public function update_salon_pic($data,$id)
    {
            $this->db->where('salon_id',$id);
            $this->db->update('tblsalon',$data);
            // $this->db->update('tblsalon', $data, array('id' => $id));
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
       
    }
    public function update_business_permit($data,$id)
    {
            $this->db->where('salon_id',$id);
            $this->db->update('tblsalon',$data);
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
       
    }
    
}
