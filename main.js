let Koa = require('koa')
const serve = require('koa-static');
let path = require('path')
let logger = require('koa-logger')
let body = require('koa-better-body')

let app = new Koa()

app.use(serve('public'))
app.use(logger())
app.use(body())

const handleError = require('koa-handle-error')

const onError = err => {
    console.error(err)
}

app.use(handleError(onError))

//routing

const Router = require('koa-router')
const router = new Router()

router
    .use('', require('./routes/index').routes())

app
    .use(router.routes())
    .use(router.allowedMethods())


module.exports = app
