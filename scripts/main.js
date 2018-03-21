
// ftp variables
var login_ref = document.getElementById("login-display");       // stores reference to login screen DOM element
var info_pages = [];                                            // list returned of pages in current directory
var file_ret = "";                                              // page information returned from server
var file_ret_path = "";                                         // path to page on server
var file_template = "";                                         // template data for current page


// UI variables
var references = [];                                            // stores references to the DOM elements of editable regions
var current_area = 0;                                           // the current index for the reference object
var e_areas = [];                                               // editor areas (deprecating)
var nav = document.getElementById("nav");                       // stores DOM reference to Nav area
var regions = document.getElementById("main-page");             // store DOM reference to editable regions area

// Set up Ace-builds Editor enviroment
var editor = ace.edit("editor");                                // initialise editor
editor.setTheme("ace/theme/twilight");                          // Set the theme of the editor
editor.session.setMode("ace/mode/html");                        // Set default language for editor
editor.setShowPrintMargin(false);                               // hide print line in editor
var editor_div = document.getElementById("editor");             // store DOM reference for editor

// Functions to sign in
function SignIn() {
    // get information from login box
    var host = { host: document.getElementById("host").value };
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    // Login and Setup
    server.SignIn(host, user, pass, function (ret) {
        if (ret == true) {

            // Load pages in sidebar from root path
            server.LoadPages("/", function (ret) { document.getElementById("info").innerHTML = ret.formatted; });

            // Hide Login screen
            HideLogin(login_ref);
        }
        else {
            alert("Authentication failed! Please check if your login information is correct.");
        }
    });
}



// get and display page data
function DisplayData(path) {
    // get data from file and its attached template
    LoadData(path);
} 
/*
// event handling
var time_to_change = 0;
var countdown = false;
setInterval(function () {
    if (time_to_change <= 0) {
        if (countdown) { UpdateFile(); };
        countdown = false;
    }
    if (countdown) { time_to_change -= 1; }
}, 100);

document.addEventListener("keydown", function () {
    time_to_change = 5;
    countdown = true;
})
function UpdateFile() {
    var x = current_area;
    if (references[x][0].id == "editor") {
        file_ret.editable_regions[references[x][2]].value = editor.getValue();
    }
}*/