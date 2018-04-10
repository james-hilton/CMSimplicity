<?php

$template_location = "../cmsimplicity/templates/";


// Main application script
$path = $_SERVER['REQUEST_URI'];

// is file a page?
if( strrpos($path,".") === false ) {
	// check for existence of page
	if(file_exists($path . ".json")) {
		// load page json
		$page = json_decode(file_get_contents($path . "json"));
		if($page !== false && $page !== null) {
			// check that page template exists
			if(file_exists($template_location . $page["template"] . "/rules.json") && file_exists($template_location . $page["template"] . "/template.html")) {
				// check that page parses correctly
				$template_rules = json_decode(file_get_contents($template_location . $page["template"] . "/rules.json"))
				$template = file_get_contents($template_location . $page["template"] . "/template.html");
				if($template_rules !== false && $template_rules !== null && $template !== false && $template !== null)) {
					// start handling page

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