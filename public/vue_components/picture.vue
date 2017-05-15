<template lang="jade">
    img.picture(v-bind:src="path" v-bind:class="{right : isRight, left : isLeft, up : isUp, down : isDown}" draggable='false')
</template>

<script>

    export default{
        name: 'picture',
        props: ['first', 'second', 'firstIs', 'color'],
        computed: {
            path(){
                return "/images/dominoes/" + Math.min(this.first, this.second).toString() + Math.max(this.first, this.second).toString() + ".gif"
            },
            isRight(){
                return !this.inverted ? (this.firstIs === "right") : (this.firstIs === "left")
            },
            isLeft(){
                return !this.inverted ? (this.firstIs === "left") : (this.firstIs === "right")
            },
            isUp(){
                return !this.inverted ? (this.firstIs === "up") : (this.firstIs === "down")
            },
            isDown(){
                return !this.inverted ? (this.firstIs === "down") : (this.firstIs === "up")
            },
            inverted(){
                return Math.min(this.first, this.second) === this.second
            }
        }
    }
</script>

<style scoped>
    .reddish
    {
        background-color: rgba(255,6,4,0.69);
    }

    .blueish
    {
        background-color: rgba(7,5,255,0.69);
    }

    .picture
    {
        margin: 0;
        position: absolute;
        user-select: none;
        -webkit-user-select: none;
    }

    .left
    {
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg)
    }

    .right
    {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .up
    {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    .down
    {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }
</style>