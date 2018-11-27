let video;

let vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);

  fire = loadImage("lit.gif");  // Load the image
  // video.hide();
}

function draw() {
  background(212, 161, 232);
  // image(capture, 0, 0, windowWidth/2, windowHeight/2); 
  // filter('THRESHOLD');
  // filter('BLUR');

  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      // get the index of current pixel in array:

      let index = (video.width - x + 1 + (y * video.width))*4;
      
      // set RGBA values of current pixel: 
      let r = video.pixels[index+0];
      let g = video.pixels[index+1];
      let b = video.pixels[index+2];
      // let a = pixels[index+4];

      // get average brightness of current pixel:

      let bright = (r+g+b)/3;
      let w = map(bright, 0, 255, 0, vScale);

      
      //draw new pixel: 
      drawPixel(x*vScale, y*vScale, w, w);
      // noStroke();
      // fill(random(255));
      // rectMode(CENTER);
      
    }
  } 
 
}


function drawPixel(xPos, yPos, pixelSize) { 
  noStroke();
  fill(color(139, 34, 228));
  rectMode(CENTER);

  // draw circle : 
  ellipse(xPos, yPos, pixelSize, pixelSize);
  // print(pixelSize)
  // textSize(pixelSize)
  // if (pixelSize > 10) { 
  //   text('✅', xPos, yPos)
  // } 
  // else { 
  //   text('😍', xPos, yPos)
  //   // image(fire , xPos, yPos, pixelSize * 4, pixelSize * 4);
    
  //   // box(pixelSize);
  // }
}

// Direct pixel manimpulation
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