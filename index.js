var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var nicknames

app.get('/', function(req, res){
  res.sendFile('index.html', {'root': './'});
});

app.get('/style.css', function(req, res){
  res.sendFile('style.css', {'root': './'});
});

io.on('connection', function(socket){
  
  socket.broadcast.emit('chat message', '<<A new user has joined the room>>')
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg)
  });
  socket.on('nickname submission', function(nickname){
    console.log('nickname received');
  });
  socket.on('disconnect', function(){
    io.emit('chat message', '<<A user disconnected>>')
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});