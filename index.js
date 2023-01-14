'use strict'
// default canvas size and initilizing global variables
const size = 400
let penSize = 10
// creating element called paper to dwar on and add layers to it
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
//     if (e.target != $('.pens') && ![...$('.pens').classList].includes('hidden')) {
//         $('.pens').classList.add('hidden')
//     }
// })

//  storing the mouse X And Y position 
const mouse = {
    x: undefined,
    y: undefined
}
// setting x & y position
document.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

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

    }
}

let layer1 = new Layer()
