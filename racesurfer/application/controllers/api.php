<?php

class API_Controller extends Base_Controller {
  public function __construct() {
   
  }
  
  public $restful = true;
  
  public function get_active() {
      $searchTerm = Input::get('query');
      $lat = Input::get('lat');
      $lng = Input::get('lng');
      
      if (empty($active)) { 
        $active = new Active('vxxz4hnnj8fdknbxk6pfm7tn');
      }
      
      $active_search = $active->searchRacesByCoordinates($searchTerm, $lat, $lng);
      
      return $active_search;
	}
	
  public function get_flickr() {
    $searchTerm = Input::get('query');

    if (empty($flickr)) { 
      $flickr = new Flickr('5b428cb617e0059d9bdf1e086f9c5a21');
    }
    
    $flickr_search = $flickr->searchPhotosByTerm($searchTerm);
    
    if ( empty($flickr_search->photos->photo[0]['id']) ) {
        $results = 'No results found';
    } else {
        foreach($flickr_search->photos->photo as $photo) {
            $id = $photo['id'];
            $farm = $photo['farm'];
            $secret = $photo['secret'];
            $server_id = $photo['server'];

            $img_src = "http://farm".$farm.".staticflickr.com/".$server_id."/".$id."_".$secret."_m.jpg";
            $results .= '<img src="'.$img_src.'" />';
        }
    }
    
    return $results;
  }
}