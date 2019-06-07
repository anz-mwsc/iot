var express = require('express');
const { exec } = require('child_process');
var fs = require("fs");


var app = express();

function executeCommand(command) {
    fs.writeFileSync("/home/pi/git/iot/command.sh", command, { encoding: 'utf8', flag: 'w' });

    exec('pkill x', function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

function runGame(gamePath, gameSystem) {
    executeCommand("/opt/retropie/supplementary/runcommand/runcommand.sh 0 _SYS_ " + gameSystem + " /home/pi/RetroPie/roms/" + gamePath);
}

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

    runGame("n64/MarioKart.z64", "n64");
})

app.get('/playtetris', function (req, res) {
    res.send("Starting Tetris");

    runGame("amstradcpc/tetris.dsk", "amstradcpc");
})

app.get('/playsupermariokart', function (req, res) {
    res.send("Starting Super Mario Kart");

    runGame("snes/supermariokart.smc", "snes");
})


app.get('/playtetris2', function (req, res) {
    res.send("Starting Tetris 2");

    runGame("snes/tetris2.fig", "snes");
})


app.listen(80);