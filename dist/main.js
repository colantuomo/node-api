"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
exports.routes = [
    users_router_1.usersRouter
];
const server = new server_1.Server();
server.bootstrap(exports.routes).then(server => {
    console.log('server running on: ', server.application.address());
}).catch(err => {
    console.log(err);
    process.exit(1);
});
