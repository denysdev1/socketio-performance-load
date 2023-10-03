import io from 'socket.io-client';

const options = {
  auth: {
    token: '23htgtfdiugreotidfglmvzn',
  },
};

const socket = io.connect(import.meta.env.VITE_SERVER_URL, options);
socket.on('connect', () => {
  console.log('Connected to the server.');
});

export default socket;
