
var references = [];
var e_areas = [];
var nav = document.getElementById("nav");
var regions = document.getElementById("main-page");

function BuildNavButton(x, name) {
    var tmp = "<button id=\"n" + x + "\" onclick=\"Edit(" + x + ");\" ";
    if (x < 0) { tmp += "class=\"current\" "; }
    tmp += ">" + name + "</button>";
    nav.innerHTML += tmp;
}

function BuildRegion(name, data) {
    if (data.language == "html" || data.language == "css" || data.language == "javascript") {
        regions.innerHTML += "<div id=\"editor-" + name + "\" style=\"width: 100 %;height: 100 %;\"></div>";
        var tmp = ace.edit("editor-" + name);
        tmp.setTheme("ace/theme/twilight");
        tmp.session.setMode("ace/mode/" + data.language);
        tmp.setShowPrintMargin(false);
        references.push([document.getElementById("editor-" + name), tmp]);
    }
    else if (data.language == "text") {

    }
    else if (data.language == "list") {

    }
}

function GenerateRegions(template_regions) {
    var tmp = [];
    references = [];

    var counter = 0;
    for (data in template_regions) {
        if (template_regions[data].editable == "true") {
            BuildNavButton(counter, data);
            BuildRegion(data, template_regions[data]);
            counter++;
        }
    }

    var editor1 = ace.edit("editor1");
    editor1.setTheme("ace/theme/twilight");
    editor1.session.setMode("ace/mode/html");
    editor1.setShowPrintMargin(false);

    var editor2 = ace.edit("editor2");
    editor2.setTheme("ace/theme/twilight");
    editor2.session.setMode("ace/mode/css");
    editor2.setShowPrintMargin(false);

    var editor3 = ace.edit("editor3");
    editor3.setTheme("ace/theme/twilight");
    editor3.session.setMode("ace/mode/javascript");
    editor3.setShowPrintMargin(false);

    // meta data tags
    var metadata = {
        title: document.getElementById("md_title"),
        Description: document.getElementById("md_description"),
        Keywords: document.getElementById("md_keywords"),
        og_title: document.getElementById("md_og_title"),
        og_description: document.getElementById("md_og_desription"),
        og_image: document.getElementById("md_og_image")
    }
}

var current_area = 0;
// grab editor areas
var e_areas = [];
e_areas.push(document.getElementById("editor1"));
e_areas.push(document.getElementById("editor2"));
e_areas.push(document.getElementById("editor3"));
e_areas.push(document.getElementById("metadata"));
// control editor view
function Edit(x) {
    // for editors
    for (var i = 0; i < e_areas.length; i++) {

        if (i == x) {
            e_areas[i].style.display = "block";
            document.getElementById("n" + (i + 1) + "").classList = "current";
            current_area = x;
        }
        else {
            e_areas[i].style.display = "none";
            document.getElementById("n" + (i + 1) + "").classList = "";
        }
    }
    Display(x);
}

