let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");


let shapePos = []
// Draw a rectangle
function rectDraw(drawPos = [15, 10], drawSize = [50, 25]) {
    context.rect(...drawPos, ...drawSize);
    context.stroke()
    shapePos.push(drawPos)
}

let setDrawStartPos = []
canvas.addEventListener('mousedown', (e) => {
    setDrawStartPos.push(e.x, e.y)
    console.log(setDrawStartPos)
})

canvas.addEventListener('mouseup', (e) => {
    rectDraw(setDrawStartPos, [e.clientX, e.clientY])
    setDrawStartPos = []
})

rectDraw([24, 22], [50, 25])

// canvas.addEventListener('mousemove', e => {
//     if (setDrawStartPos.length > 0) {
//         rectDraw(setDrawStartPos, e.clientX, e.clientY)
//     }
// })
// Restore the initial state of the canvas

// Draw another rectangle
