"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../server/router");
const users_service_1 = require("./users.service");
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
            users_service_1.usersService.add(req, resp, next);
        });
        application.put('/users/:id', (req, resp, next) => {
            users_service_1.usersService.update(req, resp, next);
        });
        application.patch('/users/:id', (req, resp, next) => {
            users_service_1.usersService.findAndUpdate(req, resp, next);
        });
        application.del('/users/:id', (req, resp, next) => {
            users_service_1.usersService.delete(req, resp, next);
        });
    }
}
exports.usersRouter = new UsersRouter();
