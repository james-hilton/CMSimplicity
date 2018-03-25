// namespace UI functions
var ui = {

    editor: "",     // editor reference
    editor_div: "", // store DOM reference for editor
    references: [], // stores references to the DOM elements of editable regions
    current_area: 0,// the current index for the reference object

    // configure ui
    Configure: function(editor_name) {
        // Set up Ace-builds Editor enviroment
        this.editor = ace.edit(editor_name);                            // initialise editor
        this.editor.setTheme("ace/theme/twilight");                     // Set the theme of the editor
        this.editor.session.setMode("ace/mode/html");                   // Set default language for editor
        this.editor.setShowPrintMargin(false);                          // hide print line in editor
        this.editor_div = document.getElementById(editor_name);             
    },

    Hide: function(x) {
        x.style.display = "none";
    },
    Show: function (x) {
        x.style.display = "block";
    },


    // new element on navigation bar for editable region
    BuildNavButton: function(x, name, nav_ref) {
        // create nav button
        var tmp = "<button id=\"n" + x + "\" onclick=\"ui.Edit(" + x + ");\" ";

        // set as current if button is first to be created in current series
        if (x <= 0) { tmp += "class=\"current\" "; }

        // close tags and output to html
        tmp += ">" + name + "</button>";
        nav_ref.innerHTML += tmp;
    },

    // new editable region
    BuildRegion: function(name, data) {

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
            return { ele_name: "editor", DOM: false, language: tmp};  
        }
    },

    // generate tabs and editors based on the template rules
    GenerateRegions: function(template_regions, nav_ref) {
        // get template regions
        var template_regions = file_template.regions;

        // tmp references
        this.references = [];

        // clear html on page
        nav_ref.innerHTML = "";


        // initialise counter for nav bar
        var counter = 0;

        // iterate through template regions
        for (data in template_regions) {
            if (template_regions[data].editable == "true") {
                // create button for region
                this.BuildNavButton(counter, data, nav_ref);

                // create region and add to references
                this.references.push(this.BuildRegion(data, template_regions[data]));

                // iterate counter for UI ID
                counter++;
            }
        }

        return references;

        // display information for first value
        /*Edit(0);*/

    },

    // control editor view
    Edit: function(x) {
        // for editors
        var currentiseditor = false;
        for (var i = 0; i < this.references.length; i++) {

            // setup current editor / editable regions
            if (i == x) {
                if (references[i].ele_name == "editor") {
                    currentiseditor = true;                                                  // stop editor from being hidden
                    this.editor.session.setMode(references[i][1]);                           // change language to the template setting
                    this.editor.setValue(file_ret.editable_regions[references[i][2]].value); // get content from the page file corresponding to the template region name
                    this.editor_div.style.display = "block";
                } else {
                    this.references[i].DOM.style.display = "block";
                }
                document.getElementById("n" + i + "").classList = "current";
            }
            else {
                if (!(this.references[i].ele_name == "editor" && currentiseditor)) {
                    if (this.references[i].ele_name == "editor") {
                        this.editor_div.display.style = "none";
                    } else {
                        this.references[i].DOM.style.display = "none";
                    }
                }
                document.getElementById("n" + i + "").classList = "";
            }
        }
    },


    // format file tree directory
    FormatDir: function (data) {
        var output = "<ul>";
        for (var i = 0; i < data.length;i++) {
            switch (data[i].type) {
                case "page":
                    output += "<li onclick=\"DisplayData('page','" + data[i].path + "');\"><span class='material-icons'>insert_drive_file</span>" + data[i].name + "</li>"; break;
                case "script":
                    output += "<li onclick=\"DisplayData('script','" + data[i].path + "');\"><span class='material-icons'>receipt</span>" + data[i].name + "</li>"; break;
                case "dir":
                    output += "<li onclick=\"DisplayData('dir','" + data[i].path + "');\"><span class='material-icons'>folder</span>" + data[i].name + "</li>"; break;
                case "image":
                    output += "<li onclick=\"DisplayData('image','" + data[i].path + "');\"><span class='material-icons'>image</span>" + data[i].name + "</li>"; break;
                case "text":
                    output += "<li onclick=\"DisplayData('text','" + data[i].path + "');\"><span class='material-icons'>description</span>" + data[i].name + "</li>"; break;
                default:
                    output += "<li onclick=\"DisplayData('unknown','" + data[i].path + "');\"><span class='material-icons'></span>" + data[i].name + data[i].extension + "</li>"; break;
            }
        }
        output += "</ul>";
        return output;
    },

    // formatting of the file tree
    FormatTreeData: function (data,path) {
        var output = "";
        for (var i = 0; i < path.length; i++) {
            var index = 0;
            if (output != "") {
                index = output.lastIndexOf(path[i]) + path[i].length + 5;   // very important that if you alter the format of the FormatDir you change the number to match the length till the end of </li>
                output = output.substring(0, index) + this.FormatDir(data["array"+i].array) + output.substring(index);
            }
            else {
                output += this.FormatDir(data["array"+i].array);
            }
            
        }
        // return string containing formatted output
        return output;
    }

}