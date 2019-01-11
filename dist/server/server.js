"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'study-api',
                    version: '1.0.0'
                });
                // Inserido para parsear os parametros de query. EX: numa requisição GET
                this.application.use(restify.plugins.queryParser());
                /* Inserido para parsear os parametros de POST.
                Usado para a aplicação entender o JSON enviado no body */
                this.application.use(restify.plugins.bodyParser());
                /* Foi criado uma maneira de tratar corretamente requisições 'PATCH'.
                Validando se o content-type é do tipo: 'merge-path+json' ao invés do padrao 'json' */
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                routers.forEach(router => {
                    router.applyRoutes(this.application);
                });
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (er) {
                reject(er);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => {
            return this.initRoutes(routers).then(() => this);
        });
    }
}
exports.Server = Server;
