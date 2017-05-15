let Domino = require('./domino.js')

class Board
{
    constructor()
    {
        this.board = [null]
    }

    get first()
    {
        return this.board[0]
    }

    get last()
    {
        return this.board.slice(-1).pop()
    }

    check(domino)
    {
        return this.checkFirst(domino) || this.checkLast(domino)
    }
    checkFirst(domino)
    {
        return (this.first === null) || (this.first.first === domino.first) || (this.first.first === domino.second)
    }

    checkLast(domino)
    {
        return (this.first === null) || (this.last.second === domino.first) || (this.last.second === domino.second)
    }

    addToFront(domino)
    {
        let correctDomino
        if (this.first === null)
        {
            this.board.splice(0, 1)
            correctDomino = domino
        }
        else
            correctDomino = domino.second !== this.first.first ? new Domino(domino.second, domino.first) : domino
        this.board.splice(0, 0, correctDomino)
    }

    addToBack(domino)
    {
        let correctDomino
        if (this.first === null)
        {
            this.board.splice(0, 1)
            correctDomino = domino
        }
        else
            correctDomino = domino.first !== this.last.second ? new Domino(domino.second, domino.first) : domino
        this.board.push(correctDomino)
    }

    toString()
    {
        let str = ""
        for (let dom of this.board)
        {
            str += dom.toString()
        }
        return str + '\n'
    }
}

module.exports = Board