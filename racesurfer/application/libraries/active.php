<?php

class Active {
	
	private $_api_key;
	
	public function __construct($api_key) {
		$this->_api_key = $api_key;
	}
	
	public function searchRacesByCoordinates($searchTerm, $lat, $lng) {
		$url = "http://api.amp.active.com/search?k=$searchTerm&l=$lat;$lng&v=json&s=relevance&num=30&m=meta:startDate:daterange:today..+meta%3Achannel%3DRunning&api_key=" . $this->_api_key;
		$jsonString = file_get_contents($url);
		return $jsonString;
	}

	public function searchRacesByAddress($searchTerm, $address) {
		$searchTerm = urlencode($address);
		$url = "http://api.amp.active.com/search?k=$searchTerm&l=$address&v=json&s=relevance&num=30&m=meta:startDate:daterange:today..+meta%3Achannel%3DRunning&api_key=" . $this->_api_key;
		$jsonString = file_get_contents($url);
		return $jsonString;
	}
	
}