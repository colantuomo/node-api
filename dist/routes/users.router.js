"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("../models/users.model");
const users_service_1 = require("../services/users.service");
class UsersRouter extends router_1.Router {
    constructor() {
        super();
        this.on('beforeRender', document => {
            // Setando password para undefined para não mostrar numa requisição.
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_service_1.usersService.getAllUsers(resp, next);
        });
        application.get('/users/:id', (req, resp, next) => {
            users_service_1.usersService.getUserById(req, resp, next);
        });
        application.post('/users', (req, resp, next) => {
            users_service_1.usersService.addUser(req, resp, next);
        });
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
        });
    }
}
exports.usersRouter = new UsersRouter();
