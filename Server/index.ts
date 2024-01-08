const express = require('express')
const app = express()
const http = require('http')

// Helps to filter out unnecessary data coming from forntend
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

// Creating server for nodeJs
const server = http.createServer(app)

//  Creating a server for socketIo
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    method: ['GET', 'POST'],
  },
})

io.on('connection', (socket: any) => {
  console.log(`🤵 User connected : ${socket.id} ✅`)

  socket.on('send-message', (message: any) => {
    console.log(message)

    // Broadcast the received message to all the connected users\
    io.emit('received-message', message)
  })

  socket.on('disconnet', () => {
    console.log('User Disconneted!!! ❌')
  })
})

server.listen(5000, () => console.log('Server 💻 running at port 🔥 5000 🔥'))
