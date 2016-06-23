'use strict';
/* 
 Created on : 27 Nov, 2015, 10:04:33 PM
 Author     : Amit J
 */

var express = require("express");
var multer = require('multer');
var app = express();
var util = require('util');
var walk = require('walk');
var path = require('path');

//GLOBAL APP DECLARATION
var saveDir = path.normalize('./app/edited_documents/');

var edit = multer({dest: saveDir, rename: function (fieldname, filename) {
        return filename.split('(')[0];
    }});

//APP CONFIGURATION 
app.use(express.static('app')); // use this as resource  directory
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//APP ROUTING URL => FUNCTIONS
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/app/index.html");
});
app.get('/editor', function (req, res) {
    res.sendFile(__dirname + "/app/editor.html");
});

app.post('/edit', edit, function (req, res) {
    console.log("Save document service executed.");
    var filesUploaded = 0;
    if (Object.keys(req.files).length === 0) {
        console.log('no files uploaded');
    } else {
        var files = req.files.file1;
        if (!util.isArray(req.files.file1)) {
            files = [req.files.file1];
        }
        filesUploaded = files.length;
    }
    res.json({message: 'Finished! Uploaded ' + filesUploaded + ' files.  Route is /files1', date: new Date(), file: req.files.userPhoto});
});

//START THE SERVER
app.listen(process.env.PORT || 3000, "0.0.0.0", function () {
    console.log("Document-Editor has started succesfully and is working on http://localhost:3000");
});

