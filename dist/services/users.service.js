"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("../models/users.model");
const router_1 = require("../common/router");
class UsersService extends router_1.RenderRequest {
    getAllUsers(resp, next) {
        users_model_1.User.find().then(this.render(resp, next));
    }
    getUserById(req, resp, next) {
        users_model_1.User.findById(req.params.id).then(this.render(resp, next));
    }
    add(req, resp, next) {
        new users_model_1.User(req.body).save().then(this.render(resp, next));
    }
    update(req, resp, next) {
        /* overwrite irá substituir o documento da collection pelo novo, caso seja true.
            Se false irá substituir somente os campos que encontrar no body */
        const options = { overwrite: true };
        users_model_1.User.update({ _id: req.params.id }, req.body, options)
            .exec().then(result => {
            // Propriedade 'n' indica se o update alterou alguma linha
            result.then(() => {
                return users_model_1.User.findById(req.params.id);
            });
            // if (result.n) {
            //     return User.findById(req.params.id)
            // } else {
            //     resp.send(404)
            // }
        }).then(this.render(resp, next));
    }
    findAndUpdate(req, resp, next) {
        const options = { new: true };
        const id = req.params.id;
        users_model_1.User.findByIdAndUpdate(id, req.body, options).then(this.render(resp, next));
    }
    delete(req, resp, next) {
        users_model_1.User.remove({ _id: req.params.id })
            .exec().then((cmdResult) => {
            // Semelhante ao put, validação feita checar se encontrou e deletou o id especificado.
            if (cmdResult.result.n) {
                /* Está mandando o codigo 204 porque não há necessidade de retornar um body.
                caso contrario seria um 200 comum*/
                resp.send(204);
            }
            else {
                resp.send(404);
            }
            return next();
        });
    }
}
exports.usersService = new UsersService();
