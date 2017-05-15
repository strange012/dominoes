/**
 * Module dependencies.
 */

let app = require('../main')
let io = require('../websocket/websocket_new')

let port = process.env.PORT || '3000'
/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port)
app.server.listen(port)
app.on('listening', onListening)

console.log(app.server.address())

function onListening() {
    let addr = server.address()
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
}
