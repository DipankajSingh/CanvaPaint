'use strict'
import { bucket, pen } from "./Assets/icons.js";
//  Important constants and variables
const mouse = {
    x: undefined,
    y: undefined
}
const layers = []
let activeColor = null
let activeLayer = null
let penSize = 5
let isDrawing = false;// check if drawing
// setting pen weights accordingly 
[...$('.toolItem')[0].children[1].children].reverse().forEach((element, index) => {
    element.innerHTML = pen()
    element.style.padding = `${10 + (index * 1.5)}px`
    //set penSize
    element.addEventListener('click', () => {
        switch (element.id) {
            case 'penS':
                penSize = 5
                break;
            case 'penL':
                penSize = 10
                break;
            case 'penM':
                penSize = 13
                break;
            case 'penXL':
                penSize = 16
                break;
            default:
                break;
        }
    })

})

// setting bucket and color to draw
$('.toolItem')[3].innerHTML = bucket('black')
$('#colorInput').addEventListener('change', (e) => {
    activeColor = e.target.value
    $('.toolItem')[3].innerHTML = bucket(e.target.value)
})
// creating element called paper to draw on and add layers to it
const paper = document.createElement('div')
paper.classList.add('CanvasPaper')
// paper.style.backgroundColor = "red"
document.body.append(paper)
// this is will functon select element(s) with the given selctor
function $(selector = 'body') {
    const e = document.querySelectorAll(selector)
    if (e.length == 1) return e[0]
    if (e.length > 1) return e
}
//  opening and closing tab
Array.from($('.toolItem')).forEach((elm) => {
    elm.addEventListener('click', (e) => {
        try {
            elm.children[1].classList.toggle('hidden')
        } catch (err) {

        }
    })
})









// setting x & y position
document.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

class Layer {
    //  this variable or static variable contains all the layer that are created
    static layerSize = 400
    //  constructor function, this will add a new layer or canvas element on paper when creating intences
    constructor() {
        this.canvas = document.createElement("canvas")
        this.context = this.canvas.getContext("2d")
        this.canvas.height = Layer.layerSize
        this.canvas.width = Layer.layerSize
        layers.push(this)
        paper.append(this.canvas)
    }



    drawWithPen(color = "#ae33ff") {
        let canvasRect = this.canvas.getBoundingClientRect();
        this.context.beginPath();
        this.context.arc(mouse.x - canvasRect.left, mouse.y - canvasRect.top, penSize, 0, 2 * Math.PI);
        this.context.fillStyle = color
        this.context.fill()
        this.context.closePath()
    }
}

let layer1 = new Layer()
layer1.canvas.addEventListener('mousedown', () => {
    isDrawing = true
})
layer1.canvas.addEventListener('mouseup', () => {
    isDrawing = false
})

layer1.canvas.addEventListener('mousemove', () => {
    if (isDrawing) layer1.drawWithPen(activeColor)
    return
})
