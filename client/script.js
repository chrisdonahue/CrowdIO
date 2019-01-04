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
  for (let i = 0; i < 8; ++i) {
    document.getElementById('pg' + (i + 1)).onmousedown = function () {
      sendMessage('8bdown_' + String(i));
    };
    document.getElementById('pg' + (i + 1)).onmouseup = function () {
      sendMessage('8bup_' + String(i));
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
  var buttonWidth = Math.floor(width / 8);
  for (let i = 0; i < 8; ++i) {
    document.getElementById('pg' + (i + 1)).style.width = String(buttonWidth) + 'px';
  }
}

socketCloseListener();

document.addEventListener("DOMContentLoaded", function() { 
  window.addEventListener('resize', onResize);
  onResize();
});
