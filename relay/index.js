var WebSocketServer = require('websocket').server;
var http = require('http');

var relayHttpServer = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
relayHttpServer.listen(1337, function() { });

// create the server
relayServer = new WebSocketServer({
  httpServer: relayHttpServer
});

var server = null;

relayServer.on('request', function(request) {
  if (request.requestedProtocols.length !== 1) {
    request.reject();
  }
  if (request.requestedProtocols[0] === 'client') {
    const connection = request.accept('client', request.origin);
    const clientId = Math.random().toString(36).substring(8);
    console.log('Client connected: ' + clientId);
    connection.on('message', function(message) {
      if (server !== null) {
        if (message.type == 'utf8') {
          try {
            button = Number(message.utf8Data);
          }
          catch (e) {
            return;
          }
          console.log(clientId + ': ' + button);
          server.send(button);
        }
      }
    });
  }
  else {
    if (server !== null) {
      request.reject();
      throw 'Server already exists';
    }
    server = request.accept('server', request.origin);
    console.log('Server connected');
  }
});
