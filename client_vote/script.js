const WS_IP = '192.168.0.2';
const WS_PORT = 1337;
let WS_PROTOCOL = 'ws://'
if (location.protocol === 'https:') {
  WS_PROTOCOL = 'wss://'
}

let socket = null;

function sendMessage(msg) {
  socket.send(msg);
  console.log('Sent: ' + msg);
}

function socketOpenListener() {
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'block';
  document.getElementById('up').onmousedown = function () {
    sendMessage('vote_up');
  };
  document.getElementById('down').onmousedown = function () {
    sendMessage('vote_down');
  };
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

function getWindowWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function onResize() {
  var width = getWindowWidth() - 64;
  document.getElementById('up').style.width = String(width) + 'px';;
  document.getElementById('down').style.width = String(width) + 'px';
}

socketCloseListener();

document.addEventListener("DOMContentLoaded", function() { 
  window.addEventListener('resize', onResize);
  onResize();
});