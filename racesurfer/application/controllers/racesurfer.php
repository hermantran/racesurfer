<?php

class Racesurfer_Controller extends Base_Controller {
	public function action_index() {
		return View::make('home.surf');
	}
	
	public function action_active() {
		if (Request::ajax()) {
			$searchTerm = Input::get('searchTerm');
			$lat = Input::get('lat');
			$lng = Input::get('lng');
			
			if (empty($active)) { 
				$active = new Active('vxxz4hnnj8fdknbxk6pfm7tn');
			}
			
			$active_search = $active->searchRacesByCoordinates($searchTerm, $lat, $lng);
			
			return $active_search;
		} else {
			return Redirect::to('/racesurfer');
		}
	}
	
	public function action_flickr() {
		if (Request::ajax()) {
			$searchTerm = Input::get('searchTerm');
	
			if (empty($flickr)) { 
				$flickr = new Flickr('5b428cb617e0059d9bdf1e086f9c5a21');
			}
			
			$flickr_search = $flickr->searchPhotosByTerm($searchTerm);
			$results = '';
			
			if (empty($flickr_search->photos->photo[0]['id'])) {
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
		} else {
			return Redirect::to('/racesurfer');
		}
	}
	
}