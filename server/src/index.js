
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);

server.listen(3000, function () {
    console.log('Server listening on port', 3000);
});


const serialPort = require('serialport');
const readLine = serialPort.parsers.Readline;

const port = new serialPort('/dev/ttyACM0', {
    baudRate: 9600
});

const parser = port.pipe(new readLine({ delimeter: '\r\n' }));

parser.on('open', function () {
    console.log('connection is opened');
});

parser.on('data', function (data) {
    let temp = parseInt(data, 10) + " °C";
    console.log(temp);
    io.emit('temp', data.toString());
});

parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));