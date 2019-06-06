var express = require('express');
const { exec } = require('child_process');


var app = express();

app.use('/', express.static('website'));


app.get('/shutdown', function (req, res) {
    res.send("Shutting down!");

    exec('shutdown', function (err, stdout, stderr) {
    });
})


app.listen(80);