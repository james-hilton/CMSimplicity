const jsftp = require("jsftp");
// ftp variables
var data_ftp;                                                   // stores ftp access
var credentials = { host: ""};                                  // stores server information
var user;                                                       // stores username
var pass;                                                       // stores password
var login_screen = document.getElementById("login-display");    // stores reference to login screen DOM element

// Function to check if server list file exists

// function to hide login screen
function HideLogin() {
    login_screen.style.display = "none";
}

// Function to sign in
function SignIn() {
    // get information from login box
    credentials.host = document.getElementById("host").value;
    user = document.getElementById("user").value;
    pass = document.getElementById("pass").value;

    // Initiate connection to server
    data_ftp = new jsftp(credentials);

    // Authenticate connection
    data_ftp.auth(user, pass, (err, res) => {
        if (err) {
            // Connection fail handling
            console.log(err);
            alert("Authentication failed! Please check if your login information is correct.");
        } else {
            // Load pages from server into sidebar
            LoadPages();

            // Hide Login screen
            HideLogin();
        }
    });

}
