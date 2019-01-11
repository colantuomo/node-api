import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { environment } from '../common/environment';
import { Router } from '../common/router';
import { mergePatchBodyParser } from './merge-patch.parser';
export class Server {

    application: restify.Server

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose.Promise) = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'study-api',
                    version: '1.0.0'
                })
                // Inserido para parsear os parametros de query. EX: numa requisição GET
                this.application.use(restify.plugins.queryParser())
                /* Inserido para parsear os parametros de POST. 
                Usado para a aplicação entender o JSON enviado no body */
                this.application.use(restify.plugins.bodyParser())
                /* Foi criado uma maneira de tratar corretamente requisições 'PATCH'. 
                Validando se o content-type é do tipo: 'merge-path+json' ao invés do padrao 'json' */
                this.application.use(mergePatchBodyParser)
                routers.forEach(router => {
                    router.applyRoutes(this.application)
                });

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

            } catch (er) {
                reject(er)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<any> {
        return this.initializeDb().then(() => {
            return this.initRoutes(routers).then(() => this)
        })
    }
}