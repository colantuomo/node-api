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
    addUser(req, resp, next) {
        new users_model_1.User(req.body).save().then(this.render(resp, next));
    }
}
exports.usersService = new UsersService();
