import * as restify from 'restify'
import { User } from '../models/users.model';
import { RenderRequest } from '../common/router';

class UsersService extends RenderRequest {

    getAllUsers(resp: restify.Response, next: restify.Next) {
        User.find().then(this.render(resp, next))
    }

    getUserById(req: restify.Request, resp: restify.Response, next: restify.Next) {
        User.findById(req.params.id).then(this.render(resp, next))
    }

    add(req: restify.Request, resp: restify.Response, next: restify.Next) {
        new User(req.body).save().then(this.render(resp, next))
    }

    update(req: restify.Request, resp: restify.Response, next: restify.Next) {
        /* overwrite irá substituir o documento da collection pelo novo, caso seja true.
            Se false irá substituir somente os campos que encontrar no body */
        const options = { overwrite: false }
        User.update({ _id: req.params.id }, req.body, options)
            .exec().then(result => {
                // Propriedade 'n' indica se o update alterou alguma linha
                if (result.n) {
                    return User.findById(req.params.id)
                } else {
                    resp.send(404)
                }
            }).then(this.render(resp, next))
    }

    findAndUpdate(req: restify.Request, resp: restify.Response, next: restify.Next) {
        const options = { new: true }
        const id = req.params.id
        User.findByIdAndUpdate(id, req.body, options).then(this.render(resp, next))
    }

    delete(req: restify.Request, resp: restify.Response, next: restify.Next) {
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
    }
}

export const usersService = new UsersService();