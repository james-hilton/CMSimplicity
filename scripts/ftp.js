// Require modules
const jsftp = require("jsftp");  // require jsftp module

// create functions and variables within psuedo namespace 'Server'
var server = {

    // variables
    page_path: "/",                     // store path to standard pages on server
    template_path: "/templates/",       // store path to template folder on server
    data_ftp: "",                       // stores ftp access
    host_obj: {host:""},                // stores server information
    username: "",                       // stores username
    password: "",                       // stores password

    // Function to sign in
    // callback param = boolean
    SignIn: function (host,user,pass, callback) {

        // Initiate connection to server
        this.data_ftp = new jsftp(host);

        // store param variables
        this.host_obj = host;
        this.username = user;
        this.password = pass;

        // Authenticate connection
        this.data_ftp.auth(user, pass, function (err, res) {
            if (err) {
                // Connection fail handling
                console.log(err);
                callback(false);
            } else {
                callback(true);
            }
        });
    },

    // Load pages within directory
    // callback is expected to accept the return value of the function as a parameter
    // LoadPages returns a JavaScript Object
    LoadPages: function (dir, callback) {
        // Get Pages
        this.data_ftp.ls(dir, function(err, res) {

            // initialise temporary variables
            var output = "";
            var pages = [];

            // loop through returned list from directory
            for (i = 0; i < res.length; i++) {

                var breakdown = res[i].name.split('.');             // get seperate components of the string in order to isolate file extenison
                var type;
                var name;
                var extension = "";
                var path = dir + res[i].name;
                if (breakdown.length != 1) {
                    extension = breakdown.pop().toLowerCase();  // get the extension and remove it from the file name array
                    name = breakdown.join('.');                 // join array back together without extension

                    
                    // ascertain file type
                    switch (extension) {
                        case "json":
                            type = "page"; break;
                        case "jpg":
                        case "png":
                        case "jpeg":
                            type = "image"; break;
                        case "js":
                        case "php":
                        case "html":
                        case "css":
                            type = "script"; break;
                        default:
                            type = "text"; break;
                    }
                } else {
                    type = "dir";
                    name = res[i].name;
                    path += "/";
                }

                
                
                // push file to array
                pages.push({ name: name, type: type, extension: extension, path: path });                
            }
            // return a javascript opject containing preformated list elements strong and a list of files in directory
            callback({ array: pages });
        });
    },

    // LoadTreeData recursive LoadData function
    // callback data
    LoadTreeData: function (path_pos, obj, path_array, callback) {



        // check if path is traversed
        if (path_array.length > path_pos) {
            // get path from input
            var path = "";
            for (var i = 0; i <= path_pos; i++) { path += path_array[i] + "/"; }

            this.LoadPages(path, function (load_ret) {

                obj["array" + path_pos] = load_ret;

                server.LoadTreeData(path_pos+1,obj, path_array, function (ret) { callback(ret); });
            });
        }
        else {
            callback(obj);
        }
    },

    // Load JSON from server and callback JavaScript Object
    // callback is expected to accept the return value of the function as a parameter
    // returns a JavaScript Object
    LoadJSON: function (path, callback) {
        // get file from server at path
        this.data_ftp.get(path, function(err, socket) {
            if (err) { /*alert(err);*/ callback({ err: "Failed to load file due to: " + err }); }
            socket.on("data", function(d) {
                // get template data and parse
                var file = JSON.parse(d.toString());

                // check that JSON parsed correctly
                if (file === undefined) {
                    file = { err: "Failed to parse JSON correctly" };
                }

                // return JavaScript of JSON
                callback(file);

            });
            socket.resume();
        });
    },


    // get template information for page
    // callback is expected to accept the return value of the function as a parameter
    // returns a JavaScript Object
    LoadTemplateRules: function (path, callback) {
        // get JSON from server
        this.LoadJSON(this.template_path + path + "/rules.json", function (x){ callback(x); });
    },

    // get information from page
    // callback is expected to accept the return value of the function as a parameter
    // returns a JavaScript Object
    LoadData: function(path, callback) {
        // get JSON data and parse it into JavaScript Object for page

        this.LoadJSON(this.page_path + path, function (x) { callback(x); }); 
    },

    // replace page serverside with updated page
    // callback is expected to accept the return value of the function as a parameter
    // returns a boolean
    SavePage: function(path, callback) {
        var tmpbuf = new Buffer(JSON.stringify(file_ret));
        this.data_ftp.put(tmpbuf, this.page_path + path, function(err) {
            if (err) {
                callback(false);
            }
            else {
                callback(true);
            }
        });
    }
}