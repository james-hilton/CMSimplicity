
var references = [];    // stores references to the DOM elements of editable regions
var current_area = 0;   // the current index for the reference object

// Set up Ace-builds Editor enviroment
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/html");
editor.setShowPrintMargin(false);

// store reference to DOM of editor
var editor_div = document.getElementById("editor");

var e_areas = [];                                       // editor areas (deprecating)
var nav = document.getElementById("nav");               // stores DOM reference to Nav area
var regions = document.getElementById("main-page");     // store DOM reference to editable regions area


// new element on navigation bar for editable region
function BuildNavButton(x, name) {
    // create nav button
    var tmp = "<button id=\"n" + x + "\" onclick=\"Edit(" + x + ");\" ";

    // set as current if button is first to be created in current series
    if (x <= 0) { tmp += "class=\"current\" "; }

    // close tags and output to html
    tmp += ">" + name + "</button>";
    nav.innerHTML += tmp;
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
        references.push([editor_div, tmp, name]);
        
    }
}

// generate tabs and editors based on the template rules
function GenerateRegions() {
    // get template regions
    var template_regions = file_template.regions;

    // clear references
    references = [];

    // clear html on page
    nav.innerHTML = "";


    // initialise counter for nav bar
    var counter = 0;

    // iterate through template regions
    for (data in template_regions) {
        if (template_regions[data].editable == "true") {
            BuildNavButton(counter, data);
            BuildRegion(data, template_regions[data]);
            counter++;
        }
    }
    // display information for first value
    Edit(0);



    // meta data tags (unused)
    var metadata = {
        title: document.getElementById("md_title"),
        Description: document.getElementById("md_description"),
        Keywords: document.getElementById("md_keywords"),
        og_title: document.getElementById("md_og_title"),
        og_description: document.getElementById("md_og_desription"),
        og_image: document.getElementById("md_og_image")
    }
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

