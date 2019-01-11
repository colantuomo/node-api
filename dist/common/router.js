"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    // Metodo criado para tratar casos comuns de um retorno de uma requisição
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(document);
            }
            else {
                response.send(404);
            }
            return next();
        };
    }
}
exports.Router = Router;
