<template lang="jade">
    div
        div.left-area(v-if="selected !== null" v-on:click="makeMove(true)")
        div.right-area(v-if="selected !== null" v-on:click="makeMove(false)")
        div.hand-box
            ul.hand
                li(v-for="dom in dominoes" v-on:click="select(dom)")
                    picture.hand-picture(v-if="dom"
                    v-bind:first="dom.first"
                    v-bind:second="dom.second"
                    v-bind:class="{selected : (selected === dom)}"
                    firstIs="up")
</template>

<script>

    import Picture from './picture.vue'

    export default{
        updated(){
            console.log(this.dominoes)
        },
        data(){
            return {
                selected: null
            }
        },
        name: 'hand',
        props: ['dominoes', 'socket'],
        components: {
            Picture
        },
        methods: {
            select(domino){
                if (this.selected === domino)
                    this.unselect()
                else
                    this.selected = domino
            },
            makeMove(isLeft){
                this.socket.emit('move', {domino: this.selected, isFront: isLeft})
                this.unselect()
            },
            unselect(){
                this.selected = null
            }
        },
    }
</script>

<style>
    .hand-picture
    {
        position: absolute;
        height: 95%;
    }

    .hand-box
    {
        position: absolute;
        right: 0%;
        left: 0%;
        top: 75%;
        bottom: 8%;
    }

    ul.hand li
    {
        display: inline-block;
        margin-right: 4.5%;
    }

    .hand
    {
        margin: auto;
    }

    .left-area
    {
        position: absolute;
        width: 50%;
        height: 70%;
        right: 50%;
        background-color: rgba(122, 0, 18, 0.1);
    }

    .right-area
    {
        position: absolute;
        width: 50%;
        height: 70%;
        left: 50%;
        background-color: rgba(0, 24, 122, 0.1);
    }

    .selected
    {
        position: relative;
        bottom: 2%;
    }

</style>