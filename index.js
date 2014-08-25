var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nicknames = {};

app.get('/', function(req, res) {
  res.sendFile('index.html', {'root': './'});
});

app.get('/style.css', function(req, res) {
  res.sendFile('style.css', {'root': './'});
});

io.on('connection', function(socket) {
  socket.broadcast.emit('status message', '<<A new user has joined the room>>')
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', {"nickname": nicknames[socket.id], "message": msg});
  });
  socket.on('nickname submission', function(nickname){
    nicknames[socket.id] = nickname;
  });
  socket.on('disconnect', function() {
    io.emit('status message', '<<' + nicknames[socket.id] + ' has signed off>>');
  });
});

var port = Number(process.env.port || 3000)
http.listen(port, function() {
  console.log('listening on *:3000');
});