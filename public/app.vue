<template lang="jade">
    div.ui.general
        board(v-if="!waiting && !offGame" v-bind:dominoes="board")
        hand(v-if="!waiting && !offGame" v-bind:dominoes="hand" v-bind:socket="socket")
        label.ui.label.big.info(v-if="!waiting && !offGame") The opponent has {{opponent}} dominoes left
        label.ui.label.big.info(v-if="waiting && !offGame") Waiting for the opponent...
        label.ui.label.huge.turn(v-if="!waiting && !offGame")   Turn: {{turn}}
        label.ui.label.huge.deck(v-if="!waiting && !offGame")   Dominoes in deck: {{deck}}
        div.ui.equal.width.center.aligned.padded.grid.title(v-if="endGame")
            div.ui.centered.win.cool-border
                label.ui.giant.label.winner-label You {{message}}!
                button.ui.button.ok-button(v-on:click="confirm") Ok
        div.ui.equal.width.center.aligned.padded.grid.title(v-if="offGame")
            button.ui.center.aligned.button.play(v-if="!endGame" v-on:click="makeConnection") Play
</template>

<script>
    import Hand from './vue_components/hand.vue'
    import Board from './vue_components/board.vue'

    export default{
        created(){

        },
        data()
        {
            return {
                hand: [],
                board: [],
                opponent: '',
                waiting: true,
                socket: null,
                turn: '',
                deck: 0,
                offGame: true,
                message: '',
                endGame: false
            }
        },
        name: 'app',
        components: {
            Board, Hand
        },
        methods: {
            makeConnection(){
                this.waiting = true
                if (this.socket)
                    this.socket.disconnect()
                this.offGame = false
                let io = require('socket.io-client')
                this.socket = io()
                this.socket.on('connect', () =>
                {
                    console.log(this.socket.id)
                    this.socket.on('start-game', () =>
                    {
                        this.waiting = false
                    })
                    this.socket.on('win', (ctx) =>
                    {
                        this.endGame = true
                        this.message = ctx
                    })
                    this.socket.on('end-game', () =>
                    {
                        this.offGame = true
                        this.endGame = false
                        if (this.socket)
                            this.socket.disconnect()
                        this.waiting = true
                        this.hand = []
                        this.board = []
                        this.opponent = ''
                    })
                    this.socket.on('game-data', (data) =>
                    {
                        this.hand = data.hand
                        this.board = data.board
                        this.opponent = data.opponent
                        this.turn = data.turn ? 'YOURS' : 'OPPONENT`S'
                        this.deck = data.deck
                        console.log(this.hand)
                        console.log(this.board)
                    })
                })
            },
            confirm(){
                this.endGame = false
                this.offGame = true
            }
        }
    }
</script>

<style>
    .cool-border
    {
        border: 2px solid rgba(131, 104, 9, 0.79);
    }

    .ok-button
    {
        position: absolute;
        left: 40%;
        right: 30%;
        top: 50%;
        bottom: 30%;
    }

    .winner-label
    {

        position: absolute;
        left: 35%;
        right: 35%;
        text-align: center;
        top: 20%;
        bottom: 62%;
    }

    .win
    {
        background-color: rgba(3, 3, 20, 0.79);
        position: absolute;
        top: 40%;
        bottom: 40%;
        left: 40%;
        right: 40%;
    }

    .play
    {
        position: absolute;
        width: 100px;
        height: 50px;
        bottom: 50%;

    }

    .title
    {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(31, 30, 62, 0.33);
    }

    .turn
    {
        position: absolute;
        top: 5%;
        left: 2.2%;
        margin: auto;
    }

    .deck
    {
        position: absolute;
        top: 11%;
        left: 2.2%;
        margin: auto;
    }

    .info
    {
        position: absolute;
        left: 37%;
        right: 37%;
        top: 5%;
        text-align: center;
    }

    .general
    {
        width: 96%;
        height: 90%;
        border-style: solid;
        margin: 2% 2% 8%;
        background-image: url("https://static.pexels.com/photos/82256/pexels-photo-82256.jpeg");
    }
</style>