<template lang="jade">
    div.ui.center.aligned.grid.board(v-if="dominoes[0] !== null")
        div.row
            div.column(v-if="it < dominoes.length" v-for="it in firstRow" v-bind:class="{hor: dominoes[it].first !== dominoes[it].second, vert: dominoes[it].first === dominoes[it].second, 'vert-left': (it > 0) && ((dominoes[it - 1].first === dominoes[it - 1].second)),'vert-right': (it < dominoes.length - 1) && ((dominoes[it + 1].first === dominoes[it + 1].second))}")
                picture.board-picture(v-bind:class="{'border-left' : it === 0, 'border-right' : it === dominoes.length - 1}" v-bind:first="dominoes[it].first" v-bind:second="dominoes[it].second" v-bind:firstIs="(dominoes[it].first === dominoes[it].second) ? 'up' : 'left'")
        div.row
            div.column(v-for="it in 12")
            div.column.vert
                picture.board-picture.sided(v-bind:class="{'border-right' : dominoes.length === 14}" v-if="dominoes.length >= 14" v-bind:first="dominoes[13].first" v-bind:second="dominoes[13].second" firstIs="up")
        div.row
            div.column(v-for="it in 12")
            div.column.vert
                picture.board-picture.sided(v-bind:class="{'border-right' :  dominoes.length === 15}" v-if="dominoes.length >= 15" v-bind:first="dominoes[14].first" v-bind:second="dominoes[14].second" firstIs="up")
        div.row
            div.column(v-if="dominoes.length >= 16" v-for="it in secondRow" v-bind:class="(it < dominoes.length) ? {hor: dominoes[it].first !== dominoes[it].second, vert: dominoes[it].first === dominoes[it].second, 'vert-right': (it > 14) && ((dominoes[it - 1].first === dominoes[it - 1].second)),'vert-left': (it < dominoes.length - 1) && ((dominoes[it + 1].first === dominoes[it + 1].second))} : {}")
                picture.board-picture(v-if="it < dominoes.length" v-bind:class="{'border-right' :  it === dominoes.length - 1}" v-bind:first="dominoes[it].first" v-bind:second="dominoes[it].second" v-bind:firstIs="(dominoes[it].first === dominoes[it].second) ? 'up' : 'right'")
</template>

<script>

    import Picture from './picture.vue'

    export default{
        props: ['dominoes'],
        created(){
            for (let i = 0; i < 13; ++i)
            {
                this.firstRow[i] = i
                this.secondRow[i] = 27 - i
            }
        },
        data(){
            return {
                firstRow: [],
                secondRow: []
            }

        },
        name: 'board',
        components: {
            Picture
        }
    }

</script>

<style scoped>
    .sided
    {
        position: absolute;
        left: 20px;
    }

    .border-left
    {
        border: 2px solid rgb(255, 0, 14);
    }

    .border-right
    {
        border: 2px solid rgb(3, 13, 255);
    }

    .board-picture
    {
        height: 90px;
    }

    .hor
    {
        margin: 0 3px;
    }

    .vert
    {
        margin: -10px 0;
    }

    .vert-left
    {
        margin-left: -16px;
    }

    .vert-right
    {
        margin-right: -16px;
    }

    .board
    {
        position: absolute;
        right: 5%;
        left: 5%;
        top: 20%;
        bottom: 30%;
        /*/background: #f3ffef;*/
    }
</style>