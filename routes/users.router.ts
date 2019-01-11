import * as restify from 'restify'
import { Router } from '../common/router'
import { User } from '../models/users.model';
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
            usersService.addUser(req, resp, next);
        })

        // application.put('/users/:id', (req, resp, next) => {
        //     /* overwrite irá substituir o documento da collection pelo novo, caso seja true.
        //     Se false irá substituir somente os campos que encontrar no body */
        //     const options = { overwrite: true }
        //     User.update({ _id: req.params.id }, req.body, options)
        //         .exec().then(result => {
        //             // Propriedade 'n' indica se o update alterou alguma linha
        //             if (result.n) {
        //                 return User.findById(req.params.id)
        //             } else {
        //                 resp.send(404)
        //             }
        //         }).then(this.render(resp, next))
        // })

        // application.patch('/users/:id', (req, resp, next) => {
        //     const options = { new: true }
        //     const id = req.params.id
        //     User.findByIdAndUpdate(id, req.body, options).then(this.render(resp, next))
        // })

        application.del('/users/:id', (req, resp, next) => {
            User.remove({ _id: req.params.id })
                .exec().then((cmdResult: any) => {
                    // Semelhante ao put, validação feita checar se encontrou e deletou o id especificado.
                    if (cmdResult.result.n) {
                        /* Está mandando o codigo 204 porque não há necessidade de retornar um body. 
                        caso contrario seria um 200 comum*/
                        resp.send(204)
                    } else {
                        resp.send(404)
                    }
                    return next()
                })
        })
    }
}

export const usersRouter = new UsersRouter();