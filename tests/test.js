const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Draw a line on the canvas
ctx.beginPath();
ctx.moveTo(25, 25);
ctx.lineTo(100, 100);
ctx.stroke();

// Get the image data for the rectangular area that contains the line
const imgData = ctx.getImageData(25, 25, 100, 100);

// loop through the pixels of the line and change the color to green
for (let i = 0; i < imgData.data.length; i += 4) {
    // condition to check if the pixel is on the line
    if (imgData.data[i + 0] === 0 && imgData.data[i + 1] === 0 && imgData.data[i + 2] === 0) {
        imgData.data[i + 0] = 170;   // red
        imgData.data[i + 1] = 15; // green
        imgData.data[i + 2] = 54;   // blue
    }
}

console.log(imgData)
// Draw the modified image data back to the canvas
ctx.putImageData(imgData, 25, 25);
