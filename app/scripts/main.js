
var _editor_global, _loadedFilename_global;
var _baseUrl = "";
var down = [];
var selectedKey;


function createEditor(fileName) {
    "use strict";

    var editor = null,
            editorOptions,
            loadedFilename;

    /*jslint emptyblock: true*/
    /**
     * @return {undefined}
     */
    function startEditing() {
//        $('.doc-editor-wrapper').attr("contenteditable", "true");
//        $('.doc-editor-wrapper').attr("readonly", "true");

        var $webodfeditor = $('#editorContainer') ;
        var $container = $webodfeditor.find("document").parent();
        $container.attr("contenteditable", "true");
        $container.attr("readonly", "true");
    }
    /*jslint emptyblock: false*/

    /**
     * extract document url from the url-fragment
     *
     * @return {?string}
     */
    function guessDocUrl() {
        var pos, docUrl = String(document.location);
        // If the URL has a fragment (#...), try to load the file it represents
        pos = docUrl.indexOf('#');
        if (pos !== -1) {
            docUrl = docUrl.substr(pos + 1);
        } else {
            docUrl = fileName;
        }
        return docUrl || null;
    }

    function fileSelectHandler(evt) {
        var file, files, reader;
        files = (evt.target && evt.target.files) ||
                (evt.dataTransfer && evt.dataTransfer.files);
        function onLoadEnd() {
            if (reader.readyState === 2) {
                runtime.registerFile(file.name, reader.result);
                loadedFilename = file.name;
                editor.openDocumentFromUrl(loadedFilename, startEditing);
            }
        }
        if (files && files.length === 1) {
            if (!editor.isDocumentModified() ||
                    window.confirm("There are unsaved changes to the file. Do you want to discard them?")) {
                editor.closeDocument(function () {
                    file = files[0];
                    reader = new FileReader();
                    reader.onloadend = onLoadEnd;
                    reader.readAsArrayBuffer(file);
                });
            }
        } else {
            alert("File could not be opened in this browser.");
        }
    }

    function enhanceRuntime() {
        var openedFiles = {},
                readFile = runtime.readFile;
        runtime.readFile = function (path, encoding, callback) {
            var array;
            if (openedFiles.hasOwnProperty(path)) {
                array = new Uint8Array(openedFiles[path]);
                callback(undefined, array);
            } else {
                return readFile(path, encoding, callback);
            }
        };
        runtime.registerFile = function (path, data) {
            openedFiles[path] = data;
        };
    }

    function createFileLoadForm() {
        var form = document.createElement("form"),
                input = document.createElement("input");

        function internalHandler(evt) {
            if (input.value !== "") {
                fileSelectHandler(evt);
            }
            // reset to "", so selecting the same file next time still trigger the change handler
            input.value = "";
        }
        form.appendChild(input);
        form.style.display = "none";
        input.id = "fileloader";
        input.setAttribute("type", "file");
        input.addEventListener("change", internalHandler, false);
        document.body.appendChild(form);
    }

    function load() {
        var form = document.getElementById("fileloader");
        if (!form) {
            enhanceRuntime();
            createFileLoadForm();
            form = document.getElementById("fileloader");
        }
        form.click();
    }

    function save() {
        function saveByteArrayLocally(err, data) {
            if (err) {
                alert(err);
                return;
            }
            var mimetype = "application/vnd.oasis.opendocument.text";
            var filename = loadedFilename || "doc.odt";
            var blob = new Blob([data.buffer], {type: mimetype});
            var _data = new FormData();
            _data.append("userPhoto", blob, filename);
            var xhr = new XMLHttpRequest();
            xhr.open("post", _baseUrl + "/edit", true);
            xhr.onload = function (e) {
                if (this.status === 200) {
                    $('#saveModal').modal('show');
                }
            };
            xhr.send(_data);

            editor.setDocumentModified(false);
        }

        editor.getDocumentAsByteArray(saveByteArrayLocally);
    }

    editorOptions = {
        loadCallback: load,
        saveCallback: save,
        allFeaturesEnabled: true
    };

    function onEditorCreated(err, e) {
        var docUrl = guessDocUrl();
        if (fileName.indexOf('steno_history') >= 0) {
            $('.dijitToolbar').css("display", "none");
        }

        if (err) {
            // something failed unexpectedly
            alert(err);
            return;
        }

        editor = e;
        _editor_global = e;
        editor.setUserData({
            fullName: "WebODF-Curious",
            color: "black"
        });

        window.addEventListener("beforeunload", function (e) {
            var confirmationMessage = "There are unsaved changes to the file.";

            if (editor.isDocumentModified()) {
                // Gecko + IE
                (e || window.event).returnValue = confirmationMessage;
                // Webkit, Safari, Chrome etc.
                return confirmationMessage;
            }
        });

        if (docUrl) {
            loadedFilename = docUrl;
            _loadedFilename_global = loadedFilename;
            editor.openDocumentFromUrl(docUrl, startEditing);
        }
    }

    Wodo.createTextEditor('editorContainer', editorOptions, onEditorCreated);
}
