// src/server.js
const net = require('net');

const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = net.createServer();

server.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

server.once('listening', () => {
  server.close();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

server.listen(PORT);
