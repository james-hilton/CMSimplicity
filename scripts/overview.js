const jsftp = require("jsftp");

// returned file ls array
var info_pages = [];
var file_ret = "";
var file_ret_path = "";

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


function Display(x) {

    if (x == 0) {
        editor1.setValue(file_ret.content);
    }
    else if (x == 1) {
        editor2.setValue(file_ret.style);
    }
    else if (x == 2) {
        editor3.setValue(file_ret.script);
    }
    else if (x == 3) {
        metadata.title.value = file_ret.meta.title;
        metadata.Description.value = file_ret.meta.Description;
        metadata.Keywords.value = file_ret.meta.Keywords;
        metadata.og_title.value = file_ret.meta.og_title;
        metadata.og_description.value = file_ret.meta.og_description;
        metadata.og_image.value.value = file_ret.meta.og_image;
    }
    else {
            alert("Error! This section doesn't exist");
        }
}

function DisplayData(path) {
    file_ret_path = path;
    data_ftp.get("/"+ path +"", (err, socket) => {
        if (err) { alert(err); }
        socket.on("data", d => {
            file_ret = JSON.parse(d.toString());
        });
        socket.on("close", err => { if (!file_ret) { alert("Error retrieving file!"); } });
        socket.resume();
    });
}

/*
var time_to_change = 0;
var countdown = false;
setInterval(function () {
    if (time_to_change <= 0) {
        if (countdown) { UpdateFile(); };
        countdown = false;
    }
    if (countdown) { time_to_change -= 1; }
}, 100)*/

document.addEventListener("keydown", function () {
    time_to_change = 5;
    countdown = true;
})

function UpdateFile() {
    var x = current_area;
    if (x == 0) {
        file_ret.content = editor1.getValue();
    }
    else if (x == 1) {
        file_ret.style = editor2.getValue();
    }
    else if (x == 2) {
        file_ret.script = editor3.getValue();
    }
    else if (x == 3) {
        file_ret.meta.title = metadata.title.value;
        file_ret.meta.Description = metadata.Description.value;
        file_ret.meta.Keywords = metadata.Keywords.value;
        file_ret.meta.og_title = metadata.og_title.value;
        file_ret.meta.og_description = metadata.og_description.value;
        file_ret.meta.og_image = metadata.og_image.value.value;
    }
    else {
        alert("Error! This section doesn't exist");
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