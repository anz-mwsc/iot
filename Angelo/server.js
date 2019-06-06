var express = require('express');
const { exec } = require('child_process');


var app = express();

app.use('/', express.static('website'));


app.get('/shutdown', function (req, res) {
    res.send("Shutting down!");

    exec('shutdown', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
})

app.get('/playmariokart', function (req, res) {
    res.send("Starting Mario Kart");

    exec('/opt/retropie/supplementary/runcommand/runcommand.sh 0 _SYS_ n64 /home/pi/RetroPie/roms/n64/MarioKart.z64', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
})


app.listen(80);