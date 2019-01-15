import { Server } from './server/server'
import { usersRouter } from './users/users.router';

export const routes = [
    usersRouter
]
const server = new Server()
server.bootstrap(routes).then(server => {
    console.log('server running on: ', server.application.address())
}).catch(err => {
    console.log(err)
    process.exit(1)
})

