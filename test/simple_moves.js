let chai = require('chai')
let Board = require('../public/lib/board.js')
let Domino = require('../public/lib/domino.js')
chai.should()

let board = new Board()

describe('Adding deck to the board', function ()
{
    it('Adding 1:2 to front should return success', () =>
    {
        let domino = new Domino(1, 2)
        board.checkFirst(domino).should.equal(true)
        board.addToFront(domino)
        let str = board.toString()
        str.should.equal('(1-2)\n')
        console.log(str)
    })
    it('Adding 1:3 to front should return success', () =>
    {
        let domino = new Domino(1, 3)
        board.checkFirst(domino).should.equal(true)
        board.addToFront(domino)
        let str = board.toString()
        str.should.equal('(3-1)(1-2)\n')
        console.log(str)
    })
    it('Adding 5:5 to back should return failure', () =>
    {
        let domino = new Domino(5, 5)
        board.checkFirst(domino).should.equal(false)
        let str = board.toString()
        str.should.equal('(3-1)(1-2)\n')
        console.log(str)
    })
    it('Adding 3:2 to back should return success', () =>
    {
        let domino = new Domino(3, 2)
        board.checkFirst(domino).should.equal(true)
        board.addToBack(domino)
        let str = board.toString()
        str.should.equal('(3-1)(1-2)(2-3)\n')
        console.log(str)
    })
    it('Adding 4:4 to back should return failure', () =>
    {
        let domino = new Domino(5, 5)
        board.checkFirst(domino).should.equal(false)
        let str = board.toString()
        str.should.equal('(3-1)(1-2)(2-3)\n')
        console.log(str)
    })
})

