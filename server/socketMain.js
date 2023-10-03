const socketMain = (io) => {
  io.on('connection', (socket) => {
    let machineMacAddress;
    const auth = socket.handshake.auth;

    // Just an example :)
    if (auth.token === 'gjdfhgdfgil4h5394o85fsdvkljxfdsjlk') {
      socket.join('nodeClient');
    } else if (auth.token === '23htgtfdiugreotidfglmvzn') {
      socket.join('reactClient');
    } else {
      socket.disconnect();
      console.log('YOU HAVE BEEN DISCONNECTED');
    }

    socket.emit('welcome', 'Welcome to our cluster driven socket.io server');
    socket.on('perfData', (data) => {
      if (!machineMacAddress) {
        machineMacAddress = data.macAddress;
        io.to('reactClient').emit('connectedOrNot', {
          isAlive: true,
          machineMacAddress,
        });
      }

      io.to('reactClient').emit('perfData', data);
    });

    socket.on('disconnect', (reason) => {
      io.to('reactClient').emit('connectedOrNot', {
        isAlive: false,
        machineMacAddress,
      });
    });
  });
};

module.exports = socketMain;
