var express = require('express');
var app = new express();
var port = 4200;
const pa11y = require('pa11y');
const htmlReporter = require('./reporters/reporter');

var bodyParser = require("body-parser");
const { get } = require('jquery');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/scan', function(req, res) {
    var name = req.body.urlText;
    console.log(name);
    pa11y(name).then(async results => {

        // Returns a string with the results formatted as HTML
        const htmlResults = await htmlReporter.results(results);
        // console.log(htmlResults);
        res.send(htmlResults);
    });

});

app.listen(port, function(err) {
    if (typeof(err) == "undefined") {
        console.log('Your application is running on : ' + port + ' port');
    }
});