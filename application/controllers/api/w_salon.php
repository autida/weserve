<?php
//use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';

/**
 * Calculates the great-circle distance between two points, with
 * the Haversine formula.
 * @param float $latitudeFrom Latitude of start point in [deg decimal]
 * @param float $longitudeFrom Longitude of start point in [deg decimal]
 * @param float $latitudeTo Latitude of target point in [deg decimal]
 * @param float $longitudeTo Longitude of target point in [deg decimal]
 * @param float $earthRadius Mean earth radius in [m]
 * @return float Distance between points in [m] (same as earthRadius)
 */
function haversineGreatCircleDistance(
    $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000)
  {
    // convert from degrees to radians
    $latFrom = deg2rad($latitudeFrom);
    $lonFrom = deg2rad($longitudeFrom);
    $latTo = deg2rad($latitudeTo);
    $lonTo = deg2rad($longitudeTo);
  
    $latDelta = $latTo - $latFrom;
    $lonDelta = $lonTo - $lonFrom;
  
    $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) +
      cos($latFrom) * cos($latTo) * pow(sin($lonDelta / 2), 2)));
    return $angle * $earthRadius;
  }

  function array_sort($array, $on, $order=SORT_ASC)
  {
      $new_array = array();
      $sortable_array = array();
  
      if (count($array) > 0) {
          foreach ($array as $k => $v) {
              if (is_array($v)) {
                  foreach ($v as $k2 => $v2) {
                      if ($k2 == $on) {
                          $sortable_array[$k] = $v2;
                      }
                  }
              } else {
                  $sortable_array[$k] = $v;
              }
          }
  
          switch ($order) {
              case SORT_ASC:
                  asort($sortable_array);
              break;
              case SORT_DESC:
                  arsort($sortable_array);
              break;
          }
  
          foreach ($sortable_array as $k => $v) {
              $new_array[$k] = $array[$k];
          }
      }
  
      return $new_array;
  }


class W_Salon extends REST_Controller {

    function __construct()
    {
        $config['upload_path']          = 'assets/images/uploads/';
        $config['allowed_types']        = 'gif|jpg|png';
        $config['max_size']             = 100000;
        parent::__construct();
        $this->load->model('w_salonmodel');
        $this->load->library('upload',$config);
    }

    private function returns($result){
        if($result){
            return $this->response($result, REST_Controller::HTTP_OK);
        }else{
            $result = array(
                'message' => 'No data found'
            );
            return $this->response($result, REST_Controller::HTTP_OK);
        }
    }

    public function index_post(){
        if($this->post('appoint')){
            $uploaddir = 'assets/images/mobile_app/';
            $uploadfile = $uploaddir . basename($_FILES['file']['name']);
            $filename = basename($_FILES['file']['name']);
            if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
                $data = [
                    'date_start'=>$this->post('date_start'),
                    'date_end'=>$this->post('date_end'),
                    'customer_id'=>(int)$this->post('customer_id'),
                    'salon_id'=>(int)$this->post('salon_id'),
                    'status'=>'pending',
                    'staff_id'=>(int)$this->post('staff_id'),
                    'services_id'=>(int)$this->post('services_id'),
                    'image'=>$filename,
                ];
                $result = $this->w_salonmodel->save_appointment($data);
            } else {
                $status['status'] =  'failed';        
            }
        }else if($this->post('review')){
                $data = [
                    'date'=>$this->post('date'),
                    'rate'=>$this->post('rate'),
                    'remarks'=>$this->post('remarks'),
                    'customer_id'=>(int)$this->post('customer_id'),
                    'salon_id'=>(int)$this->post('salon_id'),
                    'appointment_id'=>(int)$this->post('appointment_id'),
                ];
                $result = $this->w_salonmodel->save_review($data);
        }else if($this->post('cancel')){
            $result = $this->w_salonmodel->cancel_appointment($this->post('id'));
        }else if($this->post('isrecieved')){
            $result = $this->w_salonmodel->is_recieved($this->post('id'));
        }
        $this->returns($result);
    }

    public function index_get(){
        if($this->get('salon')){
            $result = $this->w_salonmodel->get_salon();
            
            foreach($result as $res){
                $res->salonDistance = haversineGreatCircleDistance($this->get('lat'),$this->get('long'),$res->loc_lat,$res->loc_long);
                $res->salonDistance = doubleval(round($res->salonDistance/1000,1));
                $res->totalrating = $this->w_salonmodel->get_avg_rating($res->salon_id);
                $res->totalrating = $res->totalrating==null?strval('0.0'):strval($res->totalrating);
                // $res->totalrating = $res->totalrating;
                $str='';
                $svc = $this->w_salonmodel->get_salon_services($res->salon_id);
                if($svc){
                    foreach($svc as $s){
                        $str = $str!=''?$str.', ':'';
                        $str = $str.$s->service_description;
                    }
                    $res->svclist = $str;
                }else{
                    $res->svclist = $str;
                }

            }
            array_multisort(array_column($result,'salonDistance'),SORT_ASC,$result);
            $this->returns($result);
        }else if($this->get('salonfilters')){
            $filters=[
                'salon_description'=>$this->get('salon_description'),
                'service_description'=>$this->get('service_description'),
                'service_price'=>$this->get('service_price'),
            ];
            $result = $this->w_salonmodel->get_salon_withfilters($filters);
            // print_r($this->db->last_query());
            if($result){
                foreach($result as $res){
                    $res->salonDistance = haversineGreatCircleDistance($this->get('lat'),$this->get('long'),$res->loc_lat,$res->loc_long);
                    $res->salonDistance = doubleval(round($res->salonDistance/1000,1));
                    $res->totalrating = $this->w_salonmodel->get_avg_rating($res->salon_id);
                    $res->totalrating = $res->totalrating==null?strval('0.0'):strval($res->totalrating);
                    $str='';
                    $svc = $this->w_salonmodel->get_salon_services($res->salon_id);
                    if($svc){
                        foreach($svc as $s){
                            $str = $str!=''?$str.', ':'';
                            $str = $str.$s->service_description;
                        }
                        $res->svclist = $str;
                    }else{
                        $res->svclist = $str;
                    }

                }
            }
            array_multisort(array_column($result,'salonDistance'),SORT_ASC,$result);
            $this->returns($result);
        }
        else if($this->get('services')){
            $result = $this->w_salonmodel->get_services();
            $this->returns($result);
        }else if($this->get('salonservices')){
            $result = $this->w_salonmodel->get_salon_services($this->get('id'));
            foreach($result as $res){
                $res->isChecked = false;
            }
            $this->returns($result);
        }else if($this->get('salonstaff')){
            $result = $this->w_salonmodel->get_salon_staff($this->get('id'));
            foreach($result as $res){
                $res->isChecked = false;
            }
            $this->returns($result);
        }else if($this->get('appointments')){
            $result = $this->w_salonmodel->get_appointment($this->get('id'));
            
            $this->returns($result);
        }else if($this->get('checkstatus')){
            $result = $this->w_salonmodel->check_status($this->get('id'));
            
            $this->returns($result);
        }else if($this->get('getreviews')){
            $result = $this->w_salonmodel->get_reviews($this->get('id'));
            foreach($result as $res){
            $res->totalrating = $this->w_salonmodel->get_avg_rating($res->salon_id);
            }
            $this->returns($result);
        }else if($this->get('getnotifs')){
            $result = $this->w_salonmodel->get_notifs($this->get('id'));
            
            $this->returns($result);
        }
    }
}