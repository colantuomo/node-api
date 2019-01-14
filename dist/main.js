"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const routes_1 = require("./routes/routes");
const server = new server_1.Server();
server.bootstrap(routes_1.routes).then(server => {
    console.log('server running on: ', server.application.address());
}).catch(err => {
    console.log(err);
    process.exit(1);
});
