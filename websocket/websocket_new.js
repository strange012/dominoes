let app = require('../main.js')
let Game = require('../public/lib/game.js')
let getRandomInt = require('../public/lib/random.js')
const IO = require('koa-socket')

let io = new IO()
io.attach(app)

let rooms = []

const PLAYER_COUNT = 2


let getRoom = (client) =>
{
    for (let room = 0; room < rooms.length; ++room)
        for (let cli = 0; cli < rooms[room].length; ++cli)
            if (rooms[room][cli] === client)
                return [room, cli]
}

io.on('connection', (ctx) =>
{
    let client = ctx.data.socket

    client.on('disconnect', () =>
    {
        let roomIndex = getRoom(client)[0]
        let clientIndex = getRoom(client)[1]
        console.log('client <' + client.id + '> disconnected')
        if (rooms[roomIndex].length === 1)
            rooms.splice(roomIndex, 1)
        else
        {
            rooms[roomIndex].splice(clientIndex, 1)
            for (let player of rooms[roomIndex])
                if (player !== client)
                    player.emit('end-game')
        }
    })


    console.log('client <' + client.id + '> connected')

    let index = rooms.findIndex((el) =>
    {
        return el.length < PLAYER_COUNT
    })

    if (index === -1)
    {
        rooms.push([client])
    }
    else
    {
        let room = rooms[index]
        let emitData = (cl, game, turn) =>
        {
            cl.emit('game-data', {
                hand: game.players[getRoom(cl)[1]].hand,
                board: game.gameboard.board,
                opponent: game.players[1 - getRoom(cl)[1]].hand.length,
                deck: game.deck.length,
                turn: room[turn] === cl
            })
        }
        let finishGame = (game, turn) =>
        {
            let scores = game.winningCondition()
            let min = Math.min.apply(null, scores)
            room.map((cl) =>
            {
                emitData(cl, game, turn)
                scores.map((score, index) =>
                {
                    if (score === min)
                        room[index].emit('win', 'won')
                    else
                        room[index].emit('win', 'lost')
                })
            })
        }
        room.push(client)
        let turn = getRandomInt(0, PLAYER_COUNT)
        for (let pl of room)
            pl.emit('start-game')
        let game = new Game(PLAYER_COUNT)
        room.map((cl) =>
        {
            emitData(cl, game, turn)

            cl.on('move', (ctx) =>
            {
                console.log(ctx)
                if (room[turn] === cl)
                {
                    if (game.playerCanMove(turn))
                    {
                        let result = game.putDomino(turn, ctx.domino, ctx.isFront)
                        console.log(result)
                        switch (result)
                        {
                            case 1:
                                turn = (turn + 1) % PLAYER_COUNT
                                room.map((cl) =>
                                {
                                    emitData(cl, game, turn)
                                })
                                break
                            case -1:
                                turn = (turn + 1) % PLAYER_COUNT
                                finishGame(game, turn)
                                break
                            case 0:
                                if (this.dec)
                                    break
                            default:
                                break
                        }
                    }
                    else
                    {
                        if (game.drawDomino(turn) < 0)
                        {
                            turn = (turn + 1) % PLAYER_COUNT
                        }
                        room.map((cl) =>
                        {
                            emitData(cl, game, turn)
                        })
                        let can = false
                        for (let i=0; i< PLAYER_COUNT; ++i)
                            can = can || game.playerCanMove(i)
                        if (!can)
                            finishGame(game, turn)
                    }
                }
            })
        })


    }
})

module.exports = io