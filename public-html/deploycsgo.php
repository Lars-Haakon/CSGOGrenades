<?php

	echo 'Deploying site...<br>';
	
	// Initialize a file URL to the variable 
	$url = 'https://codeload.github.com/Lars-Haakon/CSGOGrenades/zip/master'; 
	  
	// Use basename() function to return the base name of file  
	$file_name = basename($url) . '.zip'; 
	   
	// Use file_get_contents() function to get the file 
	// from url and use file_put_contents() function to 
	// save the file by using base name 
	if(file_put_contents( $file_name,file_get_contents($url))) { 
		echo "File downloaded successfully<br>"; 
		
		$zip = new ZipArchive();
		
		$res = $zip->open($file_name);
		
		if ($res === TRUE) {
			echo "Extracting zip file.";
			
			 $zip->extractTo(".");
			 
			 $zip->close();
		} else {
			echo "Failed to open zip file...";
		}
	} 
	else { 
		echo "File downloading failed."; 
	}
?>