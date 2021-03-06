﻿<?php

$template_location = "../../test-site-data/templates/";
$page_location = "../../test-site-data";


// Main application script
$path = $_SERVER['REQUEST_URI'];



// is file a page?
if( strrpos($path,".") === false ) {
	// check for existence of page
	if(file_exists($page_location . $path . ".json")) {
		// load page json
		$page = json_decode(file_get_contents($page_location . $path . ".json"),true);
		if($page !== false && $page !== null) {
			// check that page template exists
			if(file_exists($template_location . $page["page_template"] . "/rules.json") && file_exists($template_location . $page["page_template"] . "/template.html")) {
				// check that page parses correctly
				$template_rules = json_decode(file_get_contents($template_location . $page["page_template"] . "/rules.json"),true);
				$template = file_get_contents($template_location . $page["page_template"] . "/template.html");
				if($template_rules !== false && $template_rules !== null && $template !== false && $template !== null) {
					// is template type standard?
					if($template_rules["type"] == "standard") {
						// iterate through template rules and substitute the markers for information from the page file
						foreach($template_rules["regions"] as $key => $value) {
							$template = str_replace("--[" . $key . "]--",$page[$key],$template);
						}
						foreach($template_rules["meta"] as $key => $value) {
							$template = str_replace("--[" . $key . "]--",$page["meta"][$key],$template);
						}

						// echo generated page
						echo $template;

						// leave app script
						return;

					}
					
				}

			}
		}
	}
}
else {
	// is not a page
	// check for the existance of file
	if(file_exists($path)) {
		// return file
		echo file_get_contents($path);
	}
}?>