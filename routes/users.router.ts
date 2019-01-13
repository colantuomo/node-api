import * as restify from 'restify'
import { Router } from '../common/router'
import { usersService } from '../services/users.service';

class UsersRouter extends Router {

    constructor() {
        super()
        this.on('beforeRender', document => {
            // Setando password para undefined para não mostrar numa requisição.
            document.password = undefined
        })
    }
    applyRoutes(application: restify.Server) {
        application.get('/users', (req, resp, next) => {
            usersService.getAllUsers(resp, next)
        })

        application.get('/users/:id', (req, resp, next) => {
            usersService.getUserById(req, resp, next)
        })

        application.post('/users', (req, resp, next) => {
            usersService.add(req, resp, next)
        })

        application.put('/users/:id', (req, resp, next) => {
            usersService.update(req, resp, next)
        })

        application.patch('/users/:id', (req, resp, next) => {
            usersService.findAndUpdate(req, resp, next)
        })

        application.del('/users/:id', (req, resp, next) => {
            usersService.delete(req, resp, next)
        })
    }
}

export const usersRouter = new UsersRouter();