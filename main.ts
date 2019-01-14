import { Server } from './server/server'
import { routes } from './routes/routes';

const server = new Server()
server.bootstrap(routes).then(server => {
    console.log('server running on: ', server.application.address())
}).catch(err => {
    console.log(err)
    process.exit(1)
})

