"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mpContentType = 'application/merge-patch+json';
exports.mergePatchBodyParser = (req, resp, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        // Criando uma propriedade nova na 'req' salvando o body anterior antes de altera-lo
        req.rawBody = req.body;
        try {
            req.body = JSON.parse(req.body);
        }
        catch (ex) {
            return next(new Error(`Invalid Content: ${ex.message}`));
        }
    }
    return next();
};
