// ftp variables
var data_ftp;                                                   // stores ftp access
var credentials = { host: ""};             // stores login information
var user;
var pass;
var login_screen = document.getElementById("login-display");    // stores reference to login screen DOM element

// Function to check if server list file exists

// function to hide login screen
function HideLogin() {
    login_screen.style.display = "none";
}

// Function to sign in
function SignIn() {
    credentials.host = document.getElementById("host").value;
    user = document.getElementById("user").value;
    pass = document.getElementById("pass").value;
    data_ftp = new jsftp(credentials);
    data_ftp.auth(user, pass, (err, res) => {
        if (err) {
            console.log(err);
            alert("Authentication failed! Please check if your login information is correct.");
        } else {
            LoadPages();
            HideLogin();
        }
    });

}
