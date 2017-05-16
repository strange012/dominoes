const Router = require('koa-router')
const fs = require('fs')

let router = new Router()

router
    .get('/*', async (ctx) =>
    {
        ctx.type = 'html'
        ctx.body = fs.createReadStream('./views/index.html')
    })

module.exports = router