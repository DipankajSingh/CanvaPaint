'use strict'
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
        elm.children[1].classList.toggle('hidden')
    })
})



// // setting pen sizes
// Array.from($('.pensTab').children).map((sizeElm) => {
//     sizeElm.addEventListener('click', (e) => {
//         // setting pen sizes
//         switch (e.target.value) {
//             case 'penS':
//                 penSize = 10
//                 break;
//             case 'penM':
//                 penSize = 15
//                 break;
//             case 'penL':
//                 penSize = 20
//                 break;
//             case 'penXL':
//                 penSize = 30
//             default:
//                 break;
//         }
//         $('#currentPen').innerHTML = e.target.innerHTML
//     })
// })

// // close mini window if outer click
// document.addEventListener('click', (e) => {
//     if (e.target !== $('.toolItem').children[1]) {
//     }
// })

//  Important constants and variables
const mouse = {
    x: undefined,
    y: undefined
}
const layers = []
let activeLayer = null
let penSize = 5
let isDrawing = false// check if drawing




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



    drawWithPen(color = "lime") {
        let canvasRect = this.canvas.getBoundingClientRect();
        this.context.beginPath();
        this.context.arc(mouse.x - canvasRect.left, mouse.y - canvasRect.top, penSize, 0, 2 * Math.PI);
        this.context.fillStyle = color
        this.context.fill()
        this.context.closePath()
    }
}

let layer1 = new Layer()
layer1.drawWithPen()

