const jsftp = require("jsftp");

// returned file ls array
var info_pages = [];        // list returned of pages in current directory
var file_ret = "";          // page information returned from server
var file_ret_path = "";     // path to page on server
var file_template = "";     // template data for current page

var page_path = "/";
var template_path = "/templates/"

// ftp values

var site_ftp;

// Refresh Page Listings
function LoadPages() {
    // Get Pages
    data_ftp.ls("/", (err, res) => {
        //
        var output = "";
        info_pages = [];
        for (i = 0; i < res.length; i++) {
            // find all html pages and output them
            if (res[i].name.indexOf(".json") != -1) {
                info_pages.push(res[i]);
                output += "<li onclick=\"DisplayData('" + res[i].name + "');\"><span class='material-icons'>descripton</span>" + res[i].name.replace(".json", "") + "</li>";

            }
        }
        document.getElementById("info").innerHTML = output;
    });
}

// get template information for page
function LoadTemplateRules() {
    alert("LoadingTemplate");
    data_ftp.get(template_path + file_ret.page_template + "/rules.json", (err, socket) => {
        if (err) { alert(err); }
        socket.on("data", d => {
            // get template data and parse
            file_template = JSON.parse(d.toString());
            // initiate the creation of the main-page
            if (file_template.regions) {
                GenerateRegions();
            }
        });
        socket.on("close", err => { if (!file_ret) { alert("Error retrieving template rules!"); } });
        socket.resume();
    });
}

// get information from page
function DisplayData(path) {
    // set path
    file_ret_path = path;

    // get JSON data and parse it into JavaScript Object for page
    data_ftp.get(page_path + path + "", (err, socket) => {
        if (err) { alert(err); }
        socket.on("data", d => {
            // get file data and parse
            file_ret = JSON.parse(d.toString());
            // load template from data
            LoadTemplateRules();
        });
        socket.on("close", err => { if (!file_ret) { alert("Error retrieving file!"); } });
        socket.resume();
    });
}


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
}

function Save() {
    var tmpbuf = new Buffer(JSON.stringify(file_ret));
    data_ftp.put(tmpbuf, "/" + file_ret_path, err => {
        if (err) {
            alert(err);
        }
        else {
            alert("File Successfully uploaded!");
        }
    });
}
/*
function () {
   

    
    /*ftp.get("./", (err, socket) => {
        if (err) { alert(err); }
        socket.on("data", d => { file_ret = d.toString(); DisplayData(); });
        socket.on("close", err => { if (hadErr) { alert("Error retrieving file!"); } });
        socket.resume();
    });*/


    /*
    var tmpbuf = new Buffer("<!doctype html><html><head><title>Test page 1</title></head><body>A test page for node.js based CMS (edited)</body></html>");
    ftp.put(tmpbuf, "./", err => {
        if (err) {
            alert(err);
        }
        else {
            alert("File Successfully uploaded!");
        }
    });
}*/