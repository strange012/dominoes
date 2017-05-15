let Domino = require('./domino.js')
let Board = require('./board.js')
let getRandomInt = require('./random.js')
const MAX_DOMINOES = 7


class Game
{
    constructor(players)
    {
        this.gameboard = new Board()
        this.deck = []
        for (let i = 0; i < MAX_DOMINOES; ++i)
            for (let j = i; j < MAX_DOMINOES; ++j)
                this.deck.push(new Domino(i, j))
        this.players = []
        for (let i = 0; i < players; ++i)
        {
            this.players.push({id: i, hand: []})
            for (let j = 0; j < MAX_DOMINOES; ++j)
            {
                let key = getRandomInt(0, this.deck.length)
                let el = this.deck.splice(key, 1)
                this.players[i].hand.push(el[0])
            }
        }
    }

    putDomino(player, domino, isFront)
    {
        let index = this.players[player].hand.findIndex((dom) =>
        {
            return dom.equal(domino)
        })
        if (index >= 0)
        {
            let canPut = (isFront) ? this.gameboard.checkFirst(domino) : this.gameboard.checkLast(domino)
            if (canPut)
            {
                this.players[player].hand.splice(index, 1)
                if (isFront)
                    this.gameboard.addToFront(domino)
                else
                    this.gameboard.addToBack(domino)
                if (this.players[player].hand.length < 1)
                    return -1
            }
            else
                return 0

        }
        else
            return 0
        return 1
    }

    playerCanMove(player)
    {
        return this.players[player].hand.findIndex((el) =>
            {
                return this.gameboard.check(el)
            }) >= 0
    }

    drawDomino(player)
    {
        if (this.deck.length <= 1)
            return -1
        let index = getRandomInt(0, this.deck.length)
        let domino = this.deck.splice(index, 1)[0]
        this.players[player].hand.push(domino)
        if (!this.gameboard.check(domino))
            this.drawDomino(player)
        return 0
    }


    winningCondition()
    {
        let points = []
        this.players.map((player) =>
        {
            let sum = 0
            if ((player.hand.length === 1) && (player.hand[0].equal(new Domino(0, 0))))
                sum = 10
            else
                player.hand.map((el) =>
                {
                    sum += el.first + el.second
                })
            points.push(sum)
        })
        return points
    }

    toString()
    {
        let str = ""
        str += "Players: \n"
        this.players.map((el) =>
        {
            str += "\tplayer " + (el.id + 1) + "\n"
            el.hand.map((el) =>
            {
                str += "\t\t" + el.toString() + "\n"
            })
        })

        str += "\nDeck:\n\t"

        this.deck.map((el) =>
        {
            str += el.toString()
        })
        return str
    }
}

module.exports = Game