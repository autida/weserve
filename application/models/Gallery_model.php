<?php

class Gallery_Model extends CI_Model
{
  
    public function get_salonPhotos($id){
        $this->db->select('*');
        $this->db->from('tblimage');
        $this->db->where('id_lnk',$id);
        $this->db->where('usertype_lnk',3);
        $this->db->where('img_category_lnk',4);
        $this->db->where('is_deleted',0);
        $query = $this->db->get();
        return $query->result() ?  $query->result() : false;
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
    

    public function save_salon_photo($data,$id)
    {
            $data['usertype_lnk'] =3;
            $data['img_category_lnk'] =4;
            $data['id_lnk'] =$id;
            $this->db->insert('tblimage',$data);
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
       
    }
    public function delete_salon_photo($data,$id)
    {
            $this->db->where('img_id',$id);
            $this->db->update('tblimage',$data);
            if ($this->db->affected_rows()) {
                return true;
            } else {
                return false;
            }
       
    }
    
}
