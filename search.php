<?php
	$searchRequest = json_decode($_GET["search"]);
	$maps = $searchRequest->{"maps"};
	$sides = $searchRequest->{"sides"};
	$sites = $searchRequest->{"sites"};
	$grenades = $searchRequest->{"grenades"};
	
	$result = array();

	foreach ($maps as $map) {
		$configFileName = "data/" . $map . "/00-config.json";
		
		$configFile = fopen($configFileName, "r");
		$mapconfig = json_decode(fread($configFile,filesize($configFileName)));
		fclose($configFile);

		foreach ($mapconfig as $config) {
			
			// SIDE
			$addable = count($sides) == 0;
			foreach ($sides as $filter) 
			{
				if (in_array($filter, $config->{"side"})) {
					$addable = True;
					break;
				}
			}
			if(!$addable)
			{
				continue;
			}

			// SITE
			$addable = count($sites) == 0;
			foreach ($sites as $filter) 
			{
				if (in_array($filter, $config->{"site"})) {
					$addable = True;
					break;
				}
			}
			if(!$addable)
			{
				continue;
			}

			// GRENADES
			$addable = count($grenades) == 0;
			foreach ($grenades as $filter) 
			{
				if (in_array($filter, $config->{"grenade"})) {
					$addable = True;
					break;
				}
			}
			if(!$addable)
			{
				continue;
			}

			$object = new stdClass();
			$object->description = $config->{"description"};
			$object->src = 'data/' . $map . '/' . $config->{"src"};;
			array_push($result, $object);
		}
	}

	echo json_encode($result);
?>