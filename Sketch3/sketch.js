let birdImg;
let eyeSize = 35; // Initial size of the eye
let eyeZoomLevel = 1;
let deltaZoom = 0.1; // How quickly the eye zooms in and out
let maxEyeZoom = 5;
let minEyeZoom = 1;
let eyeX, eyeY; // Position of the eye
let mySound;

function preload() {
  birdImg = loadImage('Bird1.jpg'); // Make sure the image is in your project directory
  mySound = loadSound("assets/B3.mp3");
}

function setup() {
  createCanvas(birdImg.width, birdImg.height + 50); // Increased height to accommodate the text box
  eyeX = width / 2 + 47; // Adjust these values to match the eye's position
  eyeY = height / 2 - 112;
  frameRate(30); // Control the frame rate for smoother animation
}

function draw() {
  clear();
  imageMode(CENTER);
  image(birdImg, width / 2, height / 2 - 25); // Shift the image up a bit to make space for the text box

  // Update the eye zoom level
  eyeZoomLevel += deltaZoom;
  if (eyeZoomLevel > maxEyeZoom || eyeZoomLevel < minEyeZoom) {
    deltaZoom *= -1; // Reverse the direction of the zoom
  }

  // Draw the zoomable eye over the bird's eye
  drawEye();

  // Draw a box below the image
  fill(255); // White box
  noStroke();
  rectMode(CENTER);
  let boxHeight = 50; // Height of the text box
  let boxWidth = width * 0.8; // Width of the text box
  let boxX = width / 2; // X position of the box, centered
  let boxY = height - 25; // Position the box at the bottom of the canvas
  rect(boxX, boxY, boxWidth, boxHeight);

  // Display the text inside the box
  fill(0); // Black text
  textSize(40);
  textAlign(CENTER, CENTER);
  text("OUUCHHH, What happened to me?", boxX, boxY);
}

function drawEye() {
  // Use eyeZoomLevel to scale the size of the eye
  let scaledEyeSize = eyeSize * eyeZoomLevel;

  // Drawing the zoomable eye
  fill(255); // White part of the eye
  ellipse(eyeX, eyeY, scaledEyeSize, scaledEyeSize);
  fill(0); // Pupil
  ellipse(eyeX, eyeY, scaledEyeSize / 2, scaledEyeSize / 2);
}

function mousePressed() {
  if (mySound.isPlaying()) {
    mySound.stop(); // Stop the sound if it's playing
  } else {
    mySound.play(); // Play the sound if it's not playing
  }
}

