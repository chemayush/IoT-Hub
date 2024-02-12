const socketIo = require('socket.io');

let io;

function initSocket(server) {
  io = socketIo(server, { transports: ['websocket', 'polling', 'flashsocket'] });
  return io;
}

function getIo() {
  if (!io) {
    throw new Error('Socket.IO has not been initialized');
  }
  return io;
}

module.exports = {
  initSocket,
  getIo,
};