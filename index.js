'use strict'
// default canvas size
const size = 400
// creating element called paper to dwar on and add layers to it
const paper = document.createElement('div')
paper.style.height = size + "px"
paper.style.width = size + "px"
paper.style.border = '1px solid black'
// paper.style.backgroundColor = "red"
document.body.append(paper)


class Layer {
    //  this variable or static variable contains all the layer that are created
    static layers = []
    // setting defualt canvas size if theres no variabe called size
    static canvasX = size || 400
    static canvasY = size || 400
    //  constructor function, this will add a new layer or canvas element on paper when creating intences
    constructor() {
        this.canvas = document.createElement("canvas")
        this.context = this.canvas.getContext("2d")
        this.canvas.height = Layer.canvasY
        this.canvas.width = Layer.canvasY
        Layer.layers.push(this.canvas)
        paper.append(this.canvas)
    }

    draw() {
        this.context.arc()
    }
}

let layer1 = new Layer(true)
console.log(Layer.layers)