'use strict'
let penSize = 5
const canvas = document.createElement('canvas')
canvas.height = 300
canvas.width = 400

$('.CanvasPaper').appendChild(canvas)
const ctx = canvas.getContext('2d')

let isDrawing = false
// const lines = [
//     [[46, 45], [76, 35], { color: "red", lineWidth: 5 }],
//     [[94, 85], [74, 9]]
// ]
let lastMouseDownPos = [0, 0]
let lastMouseUpPos = [0, 0]
let snapShot
let SelectedColor = '#73ff00'
let DrawTool = 'pen'
const boundingRect = canvas.getBoundingClientRect()

document.addEventListener('mousedown', e => {
    lastMouseDownPos = [e.x, e.y]
    isDrawing = true
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height)

})

document.addEventListener('mouseup', e => {
    isDrawing = false
    lastMouseUpPos = [e.x, e.y]
    // lines.push([lastMouseDownPos, lastMouseUpPos])
})

canvas.addEventListener('mousemove', e => {
    if (isDrawing) {
        // for (let i = 0; i < lines.length; i++) {
        //     const line = lines[i];
        //     drawLine(...line[0], ...line[1])
        // }

        switch (DrawTool) {
            case 'line':
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.putImageData(snapShot, 0, 0)
                drawLine(lastMouseDownPos[0], lastMouseDownPos[1], e.x, e.y,)

                break;
            case 'pen':
                drawPen(e, penSize)
                break;
            case 'arc':
                drawArc(lastMouseDownPos[0], lastMouseDownPos[1], This should be done first)
                break;
            default:
                break;
        }
    }
})

function drawArc(x, y, size) {
    ctx.beginPath()
    ctx.arc(x - boundingRect.left, y - boundingRect.top, size, 0, 2 * Math.PI)
    ctx.strokeStyle = SelectedColor
    ctx.stroke()
}

function drawPen(event, size = 3) {
    ctx.beginPath()
    ctx.arc(event.x - boundingRect.left, event.y - boundingRect.top, size, 0, 2 * Math.PI)
    ctx.strokeStyle = SelectedColor
    ctx.fillStyle = SelectedColor
    ctx.fill()
    ctx.stroke()
}
function drawLine(x1 = 50, y1 = 67, x2 = 50, y2 = 70) {
    ctx.beginPath()
    ctx.moveTo(x1 - boundingRect.left, y1 - boundingRect.top)
    ctx.lineTo(x2 - boundingRect.left, y2 - boundingRect.top)
    ctx.strokeStyle = SelectedColor
    ctx.lineWidth = penSize
    ctx.stroke()
}










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
    SelectedColor = e.target.value
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

// this function will set drawing tool by given ID when clicking on it
function setDrawTool(elm = 'pen') {
    $(`#${elm}`).addEventListener('click', () => DrawTool = elm)
}

setDrawTool()
setDrawTool('line')
setDrawTool('arc')
setDrawTool('triangle')
setDrawTool('square')
setDrawTool('msgbox')