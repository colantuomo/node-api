import { Server } from './server/server'
import { usersRouter } from './users/users.router';

const server = new Server()
server.bootstrap([usersRouter]).then(server => {
    console.log('server running on: ', server.application.address())
}).catch(err => {
    console.log(err)
    process.exit(1)
})

