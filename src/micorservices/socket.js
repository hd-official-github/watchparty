import { server } from "..";

import { Server } from 'socket.io';


const soc = new Server(server, { cors: { origin: "*" } })

soc.on('connection', (socket) => {
    // console.log('CCE  ', socket);
    socket.on('message', (message) => {
        console.log('data ', message);
        socket.emit('message', 'hi')
    })

})

