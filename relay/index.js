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
function sendMessageToServer(clientId, key, value) {
  const msg = String(clientId) + '_' + String(key) + '_' + String(value);
  if (server !== null) {
    server.send(msg);
  }
  console.log(msg);
}

const clientIdChars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
const clientIdLen = 16

relayServer.on('request', function(request) {
  if (request.requestedProtocols.length !== 1) {
    request.reject();
  }
  if (request.requestedProtocols[0] === 'client') {
    const connection = request.accept('client', request.origin);

    const clientId = [...Array(clientIdLen)].map(i=>clientIdChars[Math.random()*clientIdChars.length|0]).join``;
    console.log('Client connected: ' + clientId);
    sendMessageToServer(clientId, 'connected', 1);

    connection.on('message', function(message) {
        if (message.type == 'utf8') {
          var key, value;
          try {
            [key, value] = message.utf8Data.split('_');
          }
          catch (e) {
            return;
          }
          sendMessageToServer(clientId, key, value)
        }
    });
  }
  else {
    server = request.accept('server', request.origin);
    console.log('Server connected');
  }
});
