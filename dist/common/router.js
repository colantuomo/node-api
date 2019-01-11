"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Router extends events_1.EventEmitter {
}
exports.Router = Router;
class RenderRequest extends events_1.EventEmitter {
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
exports.RenderRequest = RenderRequest;
