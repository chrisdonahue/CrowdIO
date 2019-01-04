const socket = new WebSocket('ws://localhost:1337', 'server');
socket.onopen = function() {
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'block';
};
socket.onmessage = function (event) {
  var [clientId, key, value] = event.data.split('_');
  document.getElementById('clientinput').value += clientId + '_' + key + '_' + value + '\n';
};
