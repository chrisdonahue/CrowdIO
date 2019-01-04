const WS_PROTOCOL = 'ws://'
const WS_IP = '9d53623f.ngrok.io';
const WS_PORT = 80;

let socket = null;

function socketOpenListener() {
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'block';
  for (let i = 0; i < 8; ++i) {
    document.getElementById('pg' + (i + 1)).onmousedown = function () {
      console.log(i);
      socket.send(i);
    };
  }
}

function socketCloseListener() {
  if (socket !== null) {
    document.getElementById('connecting').style.display = 'block';
    document.getElementById('connected').style.display = 'none';
  }
  socket = new WebSocket(WS_PROTOCOL + WS_IP + ':' + WS_PORT,  'client');
  socket.onopen = socketOpenListener;
  socket.onclose = socketCloseListener;
}

socketCloseListener();
