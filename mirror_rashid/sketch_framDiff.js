// import processing.video.*;
let video;
let numPixels;
let previousFrame = [];
// Capture video;

let vScale = 16;

function setup() {
        
    createCanvas(640, 480);  // Uses the default video input, see the reference if this causes an error
    video = createCapture(VIDEO); // capture webcam
    video.size(width/vScale, height/vScale);
  
    numPixels = width/vScale * height/vScale;

  // Create an array to store the previously captured frame
    previousFrame = new int[numPixels];
}

function draw() {

  video.loadPixels();

  
    // When using video to manipulate the screen, use video.available() and
    // video.read() inside the draw() method so that it's safe to draw to the screen
    
    let movementSum = 0; // Amount of movement in the frame
    for (let i = 0; i < numPixels; i++) { // For each pixel in the video frame...
      
      let  currColor = color(video.pixels[i]);
      let  prevColor = color(previousFrame[i]);
      // Extract the red, green, and blue components from current pixel
      let currR = (currColor >> 16) & 0xFF; // Like red(), but faster
      let currG = (currColor >> 8) & 0xFF;
      let currB = currColor & 0xFF;
      // Extract red, green, and blue components from previous pixel
      let prevR = (prevColor >> 16) & 0xFF;
      let prevG = (prevColor >> 8) & 0xFF;
      let prevB = prevColor & 0xFF;
      // Compute the difference of the red, green, and blue values
      let diffR = abs(currR - prevR);
      let diffG = abs(currG - prevG);
      let diffB = abs(currB - prevB);
      // Add these differences to the running tally
      movementSum += diffR + diffG + diffB;
      // Render the difference image to the screen
      pixels[i] = color(diffR, diffG, diffB);
      // The following line is much faster, but more confusing to read
      //pixels[i] = 0xff000000 | (diffR << 16) | (diffG << 8) | diffB;
      // Save the current color into the 'previous' buffer
      previousFrame[i] = currColor;
    
    // To prevent flicker from frames that are all black (no movement),
    // only update the screen if the image has changed.
    if (movementSum > 0) {
      updatePixels();
      println(movementSum); // Print the total amount of movement to the console
    }
  }
}