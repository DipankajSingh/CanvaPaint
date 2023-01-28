'use strict'
import { GiveElement, $ } from './notificeJS/utils.js'
import { bucket, pen } from "./Assets/icons.js";
import alert from './notificeJS/notifice_v2.0.0.js';

// the main canvas
const canvas = document.createElement('canvas')

// refrence or canvas paper element
const canvasPaper = $('.CanvasPaper')
// implementing text tool
const textInputBox = GiveElement('input', 'textBox')
// check if writing
let toggleWrite = true
// set element on top of canvas element
textInputBox.style.zIndex = 1

// event listener for text tool to set position
canvasPaper.addEventListener('click', (e) => {
    // only run this function if drawTool===textTab
    if (DrawTool === 'textTab' & !$('.textBox') & toggleWrite) {
        textInputBox.style.top = `${lastMouseDownPos[1] - boundingRect.top - (Number(getComputedStyle(textInputBox).height.split('px')[0]) / 2)}px`
        textInputBox.style.left = `${lastMouseDownPos[0] - boundingRect.left}px`
        canvasPaper.appendChild(textInputBox)
        textInputBox.focus()
        toggleWrite = !toggleWrite
    } else {
        toggleWrite = !toggleWrite
    }

})

// handle outer click
textInputBox.addEventListener('focusout', (e) => {
    drawText(e, e.target.value, Number(getComputedStyle(e.target).fontSize.split('px')[0]))
    console.log(e.x)
    e.currentTarget.remove()
})

// set height and width adjusted to navbar or tools div (element)
canvas.height = window.innerHeight - Number(getComputedStyle($('.tools')).height.split('px')[0])
canvas.width = window.innerWidth

// Taking care of responciveness 
addEventListener('resize', () => {
    canvas.height = window.innerHeight - Number(getComputedStyle($('.tools')).height.split('px')[0])
    canvas.width = window.innerWidth
    ctx.putImageData(snapShot, 0, 0)

})
// inserting canvas in canvas container
$('.CanvasPaper').appendChild(canvas)
// getting reference of context api
const ctx = canvas.getContext('2d')

// variable for setting drawing state
let isDrawing = false
// const lines = [
//     [[46, 45], [76, 35], { color: "red", lineWidth: 5 }],
//     [[94, 85], [74, 9]]
// ]
// this array will contain last mouse down position (x,y)
let lastMouseDownPos = [0, 0]
let lastMouseUpPos = [0, 0]
// setting initial state of canvas
let snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height)
// default drawing color
let SelectedColor = 'black'
// this will contain which tool is selected
let DrawTool = 'pen'
// default stroke size or pen size
let penSize = 3
// getting canvas relative position in the document
const boundingRect = canvas.getBoundingClientRect()

// event handler for handling or setting states of variables
document.addEventListener('mousedown', e => {
    lastMouseDownPos = [e.x, e.y]
    isDrawing = true
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height)
})

// event handler for handling or setting states of variables
document.addEventListener('mouseup', e => {
    isDrawing = false
    lastMouseUpPos = [e.x, e.y]
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    // lines.push([lastMouseDownPos, lastMouseUpPos])
})

// this will update canvas with last saved snapshot image data
function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.putImageData(snapShot, 0, 0)
}

// drawing things
canvas.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        // check if drawing is true
        if (isDrawing) {
            // for (let i = 0; i < lines.length; i++) {
            //     const line = lines[i];
            //     drawLine(...line[0], ...line[1])
            // }

            switch (DrawTool) {
                case 'line':
                    // ctx.clearRect(0, 0, canvas.width, canvas.height)
                    // ctx.putImageData(snapShot, 0, 0)
                    updateCanvas()
                    drawLine(lastMouseDownPos[0], lastMouseDownPos[1], e.x, e.y,)

                    break;
                case 'pen':
                    drawPen(e, penSize)
                    break;
                case 'arc':
                    updateCanvas()
                    drawArc(
                        lastMouseDownPos[0],
                        lastMouseDownPos[1],
                        Math.sqrt(
                            Math.pow((e.x - boundingRect.left) - (lastMouseDownPos[0] - boundingRect.left), 2)
                            +
                            Math.pow((e.y - boundingRect.top) - (lastMouseDownPos[1] - boundingRect.top), 2)
                        )
                    )
                    break;
                case 'square':
                    updateCanvas()
                    drawRect(e)
                    break
                default:
                    break;
            }
        }
    })
})

/// canvas drawing functions

function drawText(event, text = 'hello there!', size = 9) {
    let style = getComputedStyle(event.target)
    ctx.font = `${size}px Arial`
    ctx.textBaseline = 'ideographic'
    console.log(style.left, style.top)
    ctx.fillText(text, style.left.split('px')[0], Number(style.top.split('px')[0]) + Number(style.height.split('px')[0]))
    ctx.fillStyle = SelectedColor
}

function drawRect(event) {
    ctx.beginPath()
    ctx.rect(
        lastMouseDownPos[0] - boundingRect.left,
        lastMouseDownPos[1] - boundingRect.top,
        (event.x - boundingRect.left) - (lastMouseDownPos[0] - boundingRect.left),
        (event.y - boundingRect.top) - (lastMouseDownPos[1] - boundingRect.top)
    )
    ctx.lineWidth = penSize
    ctx.strokeStyle = SelectedColor
    ctx.stroke()
}

function drawArc(x, y, size) {
    ctx.beginPath()
    ctx.arc(x - boundingRect.left, y - boundingRect.top, size, 0, 2 * Math.PI)
    ctx.strokeStyle = SelectedColor
    ctx.lineWidth = penSize
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











;
const notify = new alert({ autoClose: 2000 })
$('#bucketTab').addEventListener('click', () => {
    notify.rgbColor = [150, 200, 0]
    notify.show('Will Be Ready Soon!')

})


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
// All available tools
const tools = ['pen', 'line', 'arc', 'triangle', 'square', 'msgbox', 'textTab']
for (let i = 0; i < tools.length; i++) {
    const tool = tools[i];
    setDrawTool(tool)
}


