class Domino
{
    constructor(first, second)
    {
        this.first = first
        this.second = second
    }

    isDouble()
    {
        return this.first = this.second
    }

    equal(domino)
    {
        return ((this.second === domino.second) && (this.first === domino.first)) || ((this.first === domino.second) && (this.second === domino.first))
    }

    toString()
    {
        return "(" + this.first + "-" + this.second + ")"
    }
}

module.exports = Domino