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

    addUser(req: restify.Request, resp: restify.Response, next: restify.Next) {
        new User(req.body).save().then(this.render(resp, next))
    }
}

export const usersService = new UsersService();