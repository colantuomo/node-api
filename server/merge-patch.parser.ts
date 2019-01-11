import * as restify from 'restify'

const mpContentType = 'application/merge-patch+json'
export const mergePatchBodyParser = (req: restify.Request, resp: restify.Response, next) => {
    if (req.getContentType() === mpContentType && req.method === 'PATCH') {
        // Criando uma propriedade nova na 'req' salvando o body anterior antes de altera-lo
        (<any>req).rawBody = req.body
        try {
            req.body = JSON.parse(req.body)
        } catch (ex) {
            return next(new Error(`Invalid Content: ${ex.message}`))
        }
    }
    return next()
}