var express = require('express');
var socket = require('socket.io');
var port = 4000;
const path = require('path');

var app = express();
var server = app.listen(port, function() {
  console.log('Requests on port, ' + port);
});

// Static files
app.use(express.static(path.join(__dirname, '/public')));

var io = socket(server);
io.on('connection', (socket) => {
  console.log('Connection at:  ', socket.id);
  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });
});
