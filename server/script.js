const socket = new WebSocket('ws://localhost:1337', 'server');
socket.onopen = function() {
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'block';
};
socket.onmessage = function (event) {
  console.log(JSON.parse(event.data));
};