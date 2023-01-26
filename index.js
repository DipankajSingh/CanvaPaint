'use strict'
let penSize
const canvas = document.createElement('canvas')
canvas.height = 300
canvas.width = 400

$('.CanvasPaper').appendChild(canvas)
const ctx = canvas.getContext('2d')

let isDrawing = false
const lines = [
    [[46, 45], [76, 35], { color: "red", lineWidth: 5 }],
    [[94, 85], [74, 9]]
]
let lastMouseDownPos = [45, 65]
let lastMouseUpPos = [76, 89]

const boundingRect = canvas.getBoundingClientRect()

canvas.addEventListener('mousedown', e => {
    lastMouseDownPos = [e.x, e.y]
    isDrawing = true
})

canvas.addEventListener('mouseup', e => {
    isDrawing = false
    lastMouseUpPos = [e.x, e.y]
    lines.push([lastMouseDownPos, lastMouseUpPos])
})

canvas.addEventListener('mousemove', e => {
    if (isDrawing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            drawLine(...line[0], ...line[1])
        }
        drawLine(lastMouseDownPos[0], lastMouseDownPos[1], e.x, e.y)


    }
})


function drawLine(x1 = 50, y1 = 67, x2 = 50, y2 = 70) {
    ctx.beginPath()
    ctx.moveTo(x1 - boundingRect.left, y1 - boundingRect.top)
    ctx.lineTo(x2 - boundingRect.left, y2 - boundingRect.top)
    ctx.stroke()
}

drawLine()









import { bucket, pen } from "./Assets/icons.js";

;
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
