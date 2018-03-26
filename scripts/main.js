var login_ref = document.getElementById("login-display");       // stores reference to login screen DOM element
var info_pages = [];                                            // list returned of pages in current directory
var file_ret = "";                                              // page information returned from server
var file_ret_path = "";                                         // path to page on server
var file_template = "";                                         // template data for current page
var nav = document.getElementById("nav");                       // stores DOM reference to Nav area
var regions = document.getElementById("main-page");             // store DOM reference to editable regions area
current_dir = ["","templates","t_master"];                      // stores the current directory path

// Configure ui
ui.Configure("editor");


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
            //server.LoadPages("/", function (ret) { document.getElementById("info").innerHTML = ret.formatted; });
            LoadTree();

            // Hide Login screen
            ui.Hide(login_ref);
        }
        else {
            alert("Authentication failed! Please check if your login information is correct.");
        }
    });
}

// Load tree view
function LoadTree() {
    // load pages from server for file path
    server.LoadTreeData(0, {}, current_dir, function (ret) {
        document.getElementById("info").innerHTML = ui.FormatTreeData(ret, current_dir);
    });
}

// get and display page data
function DisplayData(type, path) {
    // get data from file and its attached template
    if (type == "page") {
        server.LoadData(path, function (page_data) {
            // get rules for page's template
            server.LoadTemplateRules(page_data.page_template, function (template_data) {
                // Generate required regions in editor
                ui.GenerateRegions(template_data.regions, nav);

                // launch default region
                ui.Edit(0);

            });

        });
    }
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