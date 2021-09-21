import { assetsMiddleware, kitMiddleware, prerenderedMiddleware } from '../build/middlewares.js';
import compression from 'compression';
import express from 'express';
import * as http from 'http'
import { Server } from 'socket.io';

const app = express()
const port = process.env.PORT || 5000

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {

    console.log('New Socket connected...')

    //send immediatly a feedback to the incoming connection    
    socket.send('Hi there, I am a WebSocket server');
});

app.use(
	compression({ threshold: 0 }),
	assetsMiddleware,
	kitMiddleware,
	prerenderedMiddleware
)

server.listen(port, () => {
  console.log(`Listening for requests on http://localhost:${port}`)
})