let app = require('../main.js')
let Game = require('../public/lib/game.js')
const IO = require('koa-socket')

let io = new IO()

io.attach(app)

let rooms = new Map()
let clients = new Map()

const PLAYER_COUNT = 2

io.on('connection', (ctx) =>
    {
        let id = ctx.data.socket.id
        let client = ctx.data.socket
        console.log('client <' + id + '> connected')
        let index = null

        for (let [key, val] of rooms.entries())
            if (val.length < PLAYER_COUNT)
            {
                index = key
                break
            }

        client.on(id, (ctx) =>
        {

        })
        if (index === null)
        {
            console.log("ROOM: " + id)
            console.log(clients)
            rooms[client] = [client]
            clients[client] = client
        }
        else
        {
            console.log("ROOM: " + index.id)
            console.log("game start")
            client.emit('start_game')
            rooms[index].push(client)
            clients[client] = index
        }
        let game = new Game(PLAYER_COUNT)
        client.emit(id, {hand: game.players[0].hand, board: game.gameboard.board, opponent : game.players[1].hand.length})
        client.on('disconnect', () =>
        {
            console.log('client <' + id + '> disconnected')
            if (rooms[clients[client]].length === 1)
                rooms.delete(clients[client])
            else
            {
                let index = rooms[clients[client]].indexOf(client)
                rooms[clients[client]].splice(index, 1)
            }
            clients.delete(client)
        })
    }
)

module.exports = io
