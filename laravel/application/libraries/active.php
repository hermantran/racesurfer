<?php

class Active {
	
	private $_apiKey;
  
	public function __construct($apiKey) {
		$this->_apiKey = $apiKey;
        $this->urlString = "http://api.amp.active.com/search?v=json&s=relevance&num=30&m=meta:startDate:daterange:today..+meta%3Achannel%3DRunning&api_key=";
	}
	
	public function searchRacesByCoordinates($searchTerm, $lat, $lng, $page = 1) {
		$url = $this->urlString . $this->_apiKey . "&k=$searchTerm&l=$lat;$lng&page=$page";
		$json = file_get_contents($url);
		return $json;
	}

	public function searchRacesByAddress($searchTerm, $address) {
		$searchTerm = urlencode($address);
		$url = $this->urlString . $this->_apiKey . "&k=$searchTerm&l=$lat;$lng";
		$json = file_get_contents($url);
		return $json;
	}
}