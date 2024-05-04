let birdImg;
let fishImg;
let birdPosition;
let fishPosition;
let birdSize = 30;
let fishSize = 40;
let trees = []; // Array to hold the tree positions
let clouds = []; // Array to hold the cloud positions
let mySound;
let x = 1;
let y = 1;
let easing = 0.1;
let noiseOffset = 0;  // Global variable to track noise offset over time
var capture;
var tracker;
var w = 640,
  h = 480;

  function preload() {
    mySound = loadSound("assets/B2.mp3");
    birdImg = loadImage('assets/Bird.gif');
    fishImg = loadImage("assets/Frogfish.png");
  }

function setup() {
  birdImg.resize(200,100);
  createCanvas(1800, 800);
  //resize bird pgn make canvas size
  birdPosition = { x: width * 0.75, y: height * 0.25 };
  fishPosition = { x: width * 0.1, y: height * 0.85 };
  // define he initla birpositon and fihs position
  noStroke();
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h,
    },
  }, function () {
    console.log("capture ready.");
  });
  capture.elt.setAttribute("playsinline", "");
  capture.size(1800, 800);
  capture.hide();

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

  // Manually set positions for trees
  trees = [
    { x: 100, y: 700 }, { x: 200, y: 750 }, { x: 300, y: 620 },
    { x: 400, y: 530 }, { x: 500, y: 790 }, { x: 600, y: 650 },
    { x: 700, y: 600 }
  ];
// define each posiron of tree
  // Manually set positions for clouds
  clouds = [
    { x: 200, y: 100 }, { x: 400, y: 150 }, { x: 600, y: 120 },
    { x: 800, y: 140 }, { x: 1000, y: 100 }, { x: 1200, y: 150 },
    { x: 1400, y: 130 }, { x: 1600, y: 120 }, { x: 1700, y: 140 },
    { x: 180, y: 50 }
  ];
}

//deinfe each position of clouds

function draw() {
  background(135, 206, 235);
  drawIsland();
  drawClouds();
  drawDesertAndOcean();
  drawTrees();
  drawBird();
  drawFish();  // Only draw the fish if it has not been caught
  }
// define draw functions

function drawIsland() {
  fill(124, 252, 0);
  ellipse(160, 500, 300, 100);
}
//drwa island using ellipse of the deset

function drawClouds() {
  fill(255);
  clouds.forEach(cloud => {
    drawCloud(cloud.x, cloud.y);
  });
}
// define clouds for each of the position define in the cosnant

function drawCloud(x, y) {
  ellipse(x, y, 60, 40);
  ellipse(x + 30, y + 10, 80, 60);
  ellipse(x - 30, y + 10, 80, 50);
  ellipse(x, y - 10, 100, 50);
}
//drwa ellipse the each curving of the clouds wihc ellispes that combines into one


//define draw function, draw desert definig midpoint, color th desert with brown, and rectangle
//drwa ocean with four traingle using begim shape, use for loop to amke noise for each triangle, we will map tjhe y suing nouse offset
//vertex to define the position of the point of each triangle.
// end shape to clsoe
//a nd define the noise offset 
function drawDesertAndOcean() {
  let midpoint = width / 2;
  fill(244, 164, 96); // Desert
  rect(0, height / 2 , midpoint, height / 2);

  fill(0, 105, 148); // Ocean
  // Draw the top edge of the ocean with noise
  beginShape();
  for (let x = midpoint; x <= width; x++) {
    let y = map(noise(x * 0.05, noiseOffset), 0, 1, height / 2 - 10, height / 2 + 10);
    vertex(x, y);
  }
  // Draw the right edge of the ocean
  for (let y = height / 2; y <= height; y++) {
    let x = width - map(noise(y * 0.05, noiseOffset), 0, 1, 0, 10);
    vertex(x+10, y);
  }
  // Draw the bottom edge of the ocean
  for (let x = width; x >= midpoint; x--) {
    let y = height - map(noise(x * 0.05, noiseOffset), 0, 1, 0, 10);
    vertex(x, y+10);
  }
  // Draw the left edge of the ocean
  for (let y = height; y >= height / 2; y--) {
    let x = midpoint + map(noise(y * 0.05, noiseOffset), 0, 1, 0, 10);
    vertex(x - 20, y);
  }
  endShape(CLOSE);

  noiseOffset += 0.1;  // Increment noise offset to animate the waves
}


function drawTrees() {
  trees.forEach(tree => {
    drawTree(tree.x, tree.y);
  });
}

function drawTree(x, y) {
  fill(139, 69, 19); // Trunk
  rect(x - 10, y - 70, 20, 70);
  fill(34, 139, 34); // Leaves
  ellipse(x, y - 100, 80, 80);
  ellipse(x - 30, y - 80, 80, 80);
  ellipse(x + 30, y - 80, 80, 80);
  ellipse(x, y - 120, 100, 100);
}

//draw tree using ellips position and rectangle

function drawFish() {
  // Draw the fish image with larger size
  image(fishImg, 1300, 500, fishSize * 5, fishSize * 3);
}
//redraw the fish usinf the img, and rezie 5 times more and 3 times more,in the canas of 1300 and 500

// Function to draw the bird
function drawBird(){
  push();
  translate(width,0);
  scale(-1,1);
  //image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();
  if (positions.length > 0) {
    let targetX = positions[62][0];
    let dx = targetX - x;
    x += dx * easing;

    let targetY = positions[62][1];
    let dy = targetY - y;
    y += dy * easing;
  }
  noStroke();
    push();
    translate(x,y);
    rotate(PI/2);
    image(birdImg,0,0);
     pop();
   pop();
}

function mousePressed() {
  if (mySound.isPlaying()) {
    mySound.stop(); // Stop the sound if it's playing
  } else {
    mySound.play(); // Play the sound if it's not playing
  }
}