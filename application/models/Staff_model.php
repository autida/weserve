<?php

class Staff_Model extends CI_Model
{

    
    public function get_allstaff($id){
        $this->db->select('*');
        $this->db->from('tblstaff');
        $this->db->where('is_deleted',0);
        $this->db->where('salon_id',$id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
    public function all_sched($salon_id){
        $this->db->select('*');
        // $this->db->distinct('day_name');
        $this->db->from('staff_sched_day');
        $this->db->where('is_deleted',0);
        $this->db->where('salon_id',$salon_id);
        $this->db->order_by('staff_id', 'asc');
        $this->db->group_by('staff_id');
        $this->db->group_by('day_id');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }
    public function staff_time($salon_id){
        $this->db->select('*');
        // $this->db->distinct('day_name');
        $this->db->from('staff_sched_day');
        $this->db->where('is_deleted',0);
        $this->db->where('salon_id',$salon_id);
        $this->db->order_by('staff_id', 'asc');
        $this->db->group_by('staff_id');
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function staff_service($salon_id){
        $this->db->select('*');
        $this->db->from('staff_service');
        $this->db->where('salon_id',$salon_id);
        $this->db->order_by('staff_id', 'asc');
        // ORDER BY `staff_service`.`staff_id` ASC
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_allsched($salon_id,$staff_id){
        $this->db->select('*');
        $this->db->from('staff_sched_day');
        $this->db->where('is_deleted',0);
        $this->db->where('salon_id',$salon_id);
        $this->db->where('staff_id',$staff_id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

    public function get_staffservice($staff_id){
        $this->db->select('*');
        $this->db->from('staff_service');
        $this->db->where('staff_id',$staff_id);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
    }

   
   public function save_staff($data){
    $this->db->select("*");
    $this->db->from("tblstaff");
    $this->db->where("staff_id", $data['staff_id']);
    $query = $this->db->get();
    if($query->result()){
        $this->db->where('staff_id', $data['staff_id']);
        $this->db->update('tblstaff', $data);
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }else{
        $this->db->insert('tblstaff', $data);
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
public function save_sched($data,$staff_id,$day_id){
    $this->db->select("*");
    $this->db->from("tblschedule");
    $this->db->where("sched_id", $data['sched_id']);
    $query = $this->db->get();
    if($query->result()){
        $this->db->where('sched_id', $data['sched_id']);
        $this->db->update('tblschedule', $data);
        if ($this->db->affected_rows()) {
            return true;
        } else {
            return false;
        }
    }else{
        $this->db->insert('tblschedule', $data);
        $data_id = array('id' => $this->db->insert_id());
        $data1['sched_id'] =$data_id['id'];
        $data1['staff_id'] =$staff_id;
        $this->db->insert('tblstaff_sched', $data1);
        $sched_id = array('id' => $this->db->insert_id());
        $has_sched['sched_id'] = $sched_id['id'];
        $has_sched['day_id'] = $day_id;
        $this->db->insert('tbldays_has_sched', $has_sched);
        if ($this->db->affected_rows()) {
            return array('id' => $this->db->insert_id());
        } else {
            return false;
        }
    }
}

public function add_staffservice($data){
    // $this->db->select("*");
    // $this->db->from("tblstaff_services");
    // $this->db->where("ss_id", $data['ss_id']);
    // $query = $this->db->get();
    // if($query->result()){
    //     $this->db->where('sched_id', $data['sched_id']);
    //     $this->db->update('tblschedule', $data);
    //     if ($this->db->affected_rows()) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }else{
        // $data['staff_id'] = $staff_id;
        // $data['service_id'] = $service_id;
        $this->db->insert('tblstaff_services',$data);
        $data_id = array('id' => $this->db->insert_id());
        // $data1['sched_id'] =$data_id['id'];
        // $data1['staff_id'] =$staff_id;
        // $this->db->insert('tblstaff_sched', $data1);
        // $sched_id = array('id' => $this->db->insert_id());
        // $has_sched['sched_id'] = $sched_id['id'];
        // $has_sched['day_id'] = $day_id;
        // $this->db->insert('tbldays_has_sched', $has_sched);
        if ($this->db->affected_rows()) {
            return array('id' => $this->db->insert_id());
        } else {
            return false;
        }
    // }
}

public function delete_staff($data,$staff_id,$salon_id){
    $this->db->where('staff_id', $staff_id);
    $this->db->where('salon_id', $salon_id);
    $this->db->update('tblstaff', $data);
    if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
}

public function delete_staffservice($data,$staff_id,$service_id){
    $this->db->where('staff_id', $staff_id);
    $this->db->where('service_id', $service_id);
    $this->db->update('tblstaff_services', $data);
    if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
}
public function delete_staffsched($data,$staff_id,$sched_id){
    $this->db->where('staff_id', $staff_id);
    $this->db->where('sched_id', $sched_id);
    $this->db->update('tblstaff_sched', $data);
    if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
}
}
