/**
 * Module dependencies.
 */

let app = require('../main')
let io = require('../websocket/websocket_new')
const readline = require('readline');


let port = process.env.PORT || '3000'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Input port: ', (answer) => {
  port = answer
  rl.close();
});
/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(port)
app.server.listen(port)
app.on('listening', onListening)

function onListening() {
    let addr = server.address()
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
}
