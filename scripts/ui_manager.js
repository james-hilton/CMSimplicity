// new element on navigation bar for editable region
function BuildNavButton(x, name, nav_ref) {
    // create nav button
    var tmp = "<button id=\"n" + x + "\" onclick=\"Edit(" + x + ");\" ";

    // set as current if button is first to be created in current series
    if (x <= 0) { tmp += "class=\"current\" "; }

    // close tags and output to html
    tmp += ">" + name + "</button>";
    nav_ref.innerHTML += tmp;
}

// new editable region
function BuildRegion(name, data) {

    // check if input is pure text
    if (data.language == "text") {

    }
    // check if input is a templated list
    else if (data.language == "list") {

    }
    // if its not custom then prepare to use editor for editing
    else {
        //regions.innerHTML += "<div id=\"editor-" + name + "\" style=\"width: 100%;height: 100%;\"></div>";
        var tmp = "ace/mode/" + data.language;

        // return new build region reference
        return [editor_div, tmp, name];
        
    }
}

// generate tabs and editors based on the template rules
function GenerateRegions(template_regions, nav_ref) {
    // get template regions
    var template_regions = file_template.regions;

    // tmp references
    var refs = [];

    // clear html on page
    nav_ref.innerHTML = "";


    // initialise counter for nav bar
    var counter = 0;

    // iterate through template regions
    for (data in template_regions) {
        if (template_regions[data].editable == "true") {
            // create button for region
            BuildNavButton(counter, data, nav_ref);

            // create region and add to references
            refs.push(BuildRegion(data, template_regions[data]));

            // iterate counter for UI ID
            counter++;
        }
    }

    return references;

    // display information for first value
    /*Edit(0);



    // meta data tags (unused)
    var metadata = {
        title: document.getElementById("md_title"),
        Description: document.getElementById("md_description"),
        Keywords: document.getElementById("md_keywords"),
        og_title: document.getElementById("md_og_title"),
        og_description: document.getElementById("md_og_desription"),
        og_image: document.getElementById("md_og_image")
    }*/

    
}

// control editor view
function Edit(x) {
    // for editors
    var currentiseditor = false;
    for (var i = 0; i < references.length; i++) {

        // setup current editor / editable regions
        if (i == x) {
            if (references[i][0].id == "editor") {
                currentiseditor = true;                                             // stop editor from being hidden
                editor.session.setMode(references[i][1]);                           // change language to the template setting
                editor.setValue(file_ret.editable_regions[references[i][2]].value); // get content from the page file corresponding to the template region name
            }
            references[i][0].style.display = "block";
            document.getElementById("n" + i + "").classList = "current";
            current_area = x;
        }
        else {
            if (!(references[i][0].id == "editor" && currentiseditor)) {
                references[i][0].style.display = "none";
            }
            document.getElementById("n" + i + "").classList = "";
        }
    }
}

