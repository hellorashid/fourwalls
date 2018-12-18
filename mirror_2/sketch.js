let video;
let vScale = 10;
let angle = 0 
let test = 20
let inverted = false
let backgroundColor = '#000000'
let pixelScale = 1
let pixelType = 'gradient'

let globalColor = 'random'

function setup() {
  // createCanvas(640, 480);
  createCanvas(window.innerWidth, window.innerHeight);
  pixelDensity(1); // for high-denstity displays

  video = createCapture(VIDEO); // capture webcam
  video.size(width/(vScale * 2), height/(vScale * 2) );

  frameRate(10);

  // Show or hide the live webcam feed: 
  // video.hide(); 

  
}

function draw() {
  background(backgroundColor);
  let scaleSlider = select('#myRange') 
  vScale = scaleSlider.value()

  let sizeSlider = select('#sizeSlider') 
  pixelScale = sizeSlider.value()

  let invertedValue = select('#inverted') 
  inverted = invertedValue.checked()

  let backgroundColorPicker = select('#backgroundColor') 
  backgroundColor = backgroundColorPicker.value()

  let pixelTypeValue = select('#pixelType') 
  pixelType = pixelTypeValue.value()

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
      let bright = (r+g+b)/3 ;
      // map the brightness to width, using vScale
      let w = map(bright, 0, 255, 0, vScale); 

      //draw new pixel, directly, or using drawPixel function below: 
      drawPixel(x*vScale, y*vScale, w, w);
      // noStroke();
      // fill(random(255));
      // rectMode(CENTER);
      
    }
  } 
  

  test = (sin(angle) * test) + 5
  // angle += 0.1;
  
  // console.log(angle)
  // Circles : 
  // ellipse(width - 20, height - 20, test, test);

 
}


function drawPixel(xPos, yPos, pixelSize) { 
  // this function whatever in each pixel 
  // use xPos & yPos for positioning pixel
  // use pixelSize to play around with shit getting bigger & smaller
  noStroke();
  rectMode(CENTER);

  //  ------ COLOR ------ : 

  if (pixelType == 'random') { 
    fill(color(random(0,255) , random(0,255), random(0,255)));
  } else if (pixelType == 'gradient') { 
    fill(color(sin(angle) * 209,  73, 126));
  }

  //  ------ SETTINGS ------ : 
  if (inverted == true) { 
    pixelSize = (vScale - pixelSize) 
  }
  pixelSize = pixelSize * pixelScale 


  // pixelSize = (sin(angle) * pixelSize/2) + 5
  angle += 0.2;
  
  let r = random(0, 255)
  let g = random(0, 255)
  let b = random(0, 255)

  

  //  ------ SHAPE ------ : 
  
  if (pixelType == 'emoji') { 
    //  Emojis
    textSize(pixelSize)
    if (pixelSize > (vScale/2)) { 
      fill(color(r, g, b))
      text('❤', xPos, yPos)
    } 
    else { 
      // text('✔', xPos, yPos)    
    }
  } else { 

    // if (pixelSize > 8 && yPos < height/3) { 
    //   globalColor = 'red'
    // } else if (pixelSize > 8 && xPos < width/ 3) { 
    //   globalColor = 'green'
    // } else if (pixelSize > 8 && xPos > 2 * (width/ 3)) { 
    //   globalColor = 'blue'
    // } else { 
    //   // globalColor = 'random'
    // }

    // if (globalColor == 'red') { 
    //   r = 255
    //   g = 0 
    //   b = 0
    // } else if (globalColor == 'green') { 
    //   r = 0
    //   g = 255
    //   b = 0
    // } else if (globalColor == 'blue') { 
    //   r = 0
    //   g = 0 
    //   b = 255
    // } 

    // console.log(pixelSize)

    
    // fill(color(r, g, b))
    ellipse(xPos, yPos, pixelSize, pixelSize);
  }
 
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

  function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      vScale += 1 
      console.log('New Scale: ', vScale);
    } else if (keyCode === LEFT_ARROW) { 
      vScale -= 1 
      console.log('New Scale: ', vScale);
    } else if (keyCode === UP_ARROW) {
     
      console.log(pixelType)

    }

    if (key == ' ') { 
      let settings = select('#settings') 

      if (settings.style('display') == 'block') { 
        settings.style('display', 'none')
      } else { 
        settings.style('display', 'block')
      }
    }
  }



