let ioInstance = null;

function setupSocket(io) {
  ioInstance = io;
  io.on('connection', (socket) => {
    socket.on('joinProject', (projectId) => {
      socket.join(projectId);
    });
    socket.on('leaveProject', (projectId) => {
      socket.leave(projectId);
    });
  });
}

function emitToProject(projectId, event, data) {
  if (ioInstance) {
    ioInstance.to(projectId).emit(event, data);
  }
}

module.exports = { setupSocket, emitToProject };