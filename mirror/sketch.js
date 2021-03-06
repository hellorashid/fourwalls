let video;
let vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1); // for high-denstity displays

  video = createCapture(VIDEO); // capture webcam
  video.size(width/vScale, height/vScale);

  fire = loadImage("lit.gif");  // Load local image
  frameRate(12);

  // Show or hide the live webcam feed: 
  // video.hide(); 
}

function draw() {
  background(0);

  //Show the camera feed as image, can also apply filters: 
  // image(video, 0, 0, windowWidth/2, windowHeight/2); 
  // filter('THRESHOLD');
  // filter('BLUR');

  video.loadPixels();
  loadPixels(); // <- Loads all pixels from video into a hugeass array
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) { //  <- loop over said hugeass array

      // get the index of current pixel in array:
      let index = (video.width - x + 1 + (y * video.width))*4;
      
      // get the RGBA values of current pixel: 
      // note that said hugeass array is weird because pixel 1 has values in the order R, G, B in index 0, 1, 2
      // and so pixel 2 has values starting index 3, 4, 5 etc
      // hence the code below:
      let r = video.pixels[index+0];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      // let a = pixels[index+4]; 

      // get average brightness of current pixel:
      let bright = (r+g+b)/3;
      // map the brightness to width, using vScale
      let w = map(bright, 0, 255, 0, vScale); 

      
      //draw new pixel, directly, or using drawPixel function below: 
      drawPixel(x*vScale, y*vScale, w, w);
      // noStroke();
      // fill(random(255));
      // rectMode(CENTER);
      
    }
  } 
 
}


function drawPixel(xPos, yPos, pixelSize) { 
  // this function whatever in each pixel 
  // use xPos & yPos for positioning pixel
  // use pixelSize to play around with shit getting bigger & smaller


  // Rectangles : 
  noStroke();
  fill(color(random(255), random(255), random(255)));
  rectMode(CENTER);
  // ellipse(xPos, yPos, pixelSize, pixelSize);


  // Circles : 
  ellipse(xPos, yPos, pixelSize, pixelSize);

  // Emojis
  // textSize(pixelSize)
  // if (pixelSize > 10) { 
  //   text('✅', xPos, yPos)
  // } 
  // else { 
  //   text('😍', xPos, yPos)    
  // }
}

// Direct pixel manimpulation, in draw() 
  // loadPixels();
  // for (let y = 0; y < height; y++) { 
  //   for (let x=0; x < width; x++) { 
  //     let index = (x + y * width) * 4
  //     let r =  pixels[index+0] ; 
  //     let g =  pixels[index+1] ; 
  //     let b =  pixels[index+2] ; 
  //     let a = pixels[index+4];
  //     // if (r > 240) { 
  //     //   pixels[index+0] = 0
  //     // }
  //   }
  // }
  // updatePixels();