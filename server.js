// server.js
// where your node app starts
 
// init project
var express = require('express');
var app = express();
 
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
 
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
 
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
 
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
 
 
// the Timestamp endpoint... 
app.get("/api/timestamp/:tval?", function (req, res) {
 
  //set defaults
  var thedate = new Date(req.params.tval);
  var timestamp = thedate.getTime();
  var datestring = thedate.toUTCString();
 
  //handle the no-input case
  if(req.params.tval === undefined){
    var mydate = new Date();
    timestamp = mydate.getTime();
    datestring = mydate.toUTCString();    
  } else if (req.params.tval === "NaN") {
    // do nothing, it's invalid but we need this to protect our
    // integer checking functionality
  } else if (parseInt(req.params.tval).toString() === req.params.tval){
    var mydate = new Date(parseInt(req.params.tval));
    timestamp = mydate.getTime();
    datestring = mydate.toUTCString();
  }
 
  res.json({"unix": timestamp, "utc" : datestring });
 
});
 
module.exports = app;
