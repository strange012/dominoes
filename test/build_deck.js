let chai = require('chai')
chai.should()

let Game = require('../public/lib/game.js')
let Domino = require('../public/lib/domino.js')
describe(
    'Building domino deck', () =>
    {
        it('Should build 2 player hands and a deck', () =>
        {
            let game = new Game(2)

            game.deck.map((el) => console.log(el.toString()))
            console.log("\nkek\n")
            game.players[0].hand.map((el) => console.log(el.toString()))
            game.players.length.should.equal(2)
            game.players[0].hand.length.should.equal(7)
            game.players[1].hand.length.should.equal(7)
            game.deck.length.should.equal(14)

            console.log(game.toString())
        })
    }
)