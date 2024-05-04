let sands = [];
let rocks = [];
let mySound;
let pondSound;  

function preload() {
    mySound = loadSound("assets/B1.mp3");
    pondSound = loadSound("assets/BG1.mp3");  // Load the pond sound
}

function setup() {
  createCanvas(1800, 800);
  for (let i = 0; i < 200; i++) {
    sands.push({x: random(width), y: random(height / 2), size: random(6, 8)});
  }
  initializeRocks();
}

function draw() {

    background(135, 206, 235); // Regular sky
  
  fill(210, 180, 140);
  rect(0, height / 2, width, height / 2);
  drawPond(width / 2, height * 0.75, 600, 300);
  drawTrees();
  drawRocks();
  drawSand();
  drawText();
}

function drawSand() {
  fill(194, 178, 128, 150);
  sands.forEach(sand => {
    ellipse(sand.x, sand.y, sand.size);
    sand.y += random(-0.5, 0.5);
    sand.x += 3;
    if (sand.x > width) sand.x = 0;
  });
}

function drawPond(x, y, w, h) {
  beginShape();
  for (let i = 0; i < 360; i += 5) {
    let angle = radians(i);
    let radiusX = w / 2 + noise(frameCount * 0.01 + i) * 30;
    let radiusY = h / 2 + noise(frameCount * 0.01 + i) * 30;
    let posX = x + radiusX * cos(angle);
    let posY = y + radiusY * sin(angle);
    vertex(posX, posY);
  }
  fill(0, 191, 255);
  endShape(CLOSE);
}

function drawTrees() {
  const positions = [
    {x: 40, y: height / 2 + 100}, {x: 400, y: height / 2 + 200},
    {x: 650, y: height / 2 + 250}, {x: 600, y: height / 2 - 50},
    {x: 150, y: height / 2 + 120}, {x: 600, y: height / 2 - 50},
    {x: 200, y: height / 2 + 80}, {x: 600, y: height / 2 - 50},
    {x: 350, y: height / 2 + 100}, {x: 600, y: height / 2 - 50},
    {x: 500, y: height / 2 + 220}, {x: 1400, y: height / 2 + 160},
    {x: 1650, y: height / 2 + 180}, {x: 1300, y: height / 2 - 70},
    {x: 1500, y: height / 2 + 210}, {x: 1300, y: height / 2 + 190}
  ];
  positions.forEach(pos => drawTree(pos.x, pos.y));
}

function drawTree(x, y) {
  fill(139, 69, 19);
  rect(x - 10, y + 30, 20, 100);
  fill(34, 139, 34);
  for (let i = 0; i < 5; i++) {
    triangle(
      x - 50 + i * 10, y + 30 - i * 20,
      x + 50 - i * 10, y + 30 - i * 20,
      x, y - i * 20
    );
  }
}

function initializeRocks() {
  const rockPositions = [
    {x: 100, y: height * 0.65}, {x: 440, y: height * 0.85},
    {x: 530, y: height * 0.60}, {x: 1630, y: height * 0.63},
    {x: 1270, y: height * 0.85}, {x: 1405, y: height * 0.60},
    {x: 420, y: height * 0.55}, {x: 1320, y: height * 0.95},
    {x: 1580, y: height * 0.60}, {x: 200, y: height * 0.95},
    {x: 1420, y: height * 0.52}, {x: 60, y: height * 0.95},
    {x: 1600, y: height * 0.80}, {x: 1700, y: height * 0.98}
  ];
  rockPositions.forEach(rock => {
    let components = [];
    const numEllipses = floor(random(2, 5));
    for (let i = 0; i < numEllipses; i++) {
      components.push({
        offsetX: random(-10, 10),
        offsetY: random(-10, 10),
        width: random(20, 30),
        height: random(15, 25)
      });
    }
    rocks.push({x: rock.x, y: rock.y, components});
  });
}

function drawRocks() {
  noStroke();
  rocks.forEach(rock => {
    rock.components.forEach(comp => {
      fill("grey");
      ellipse(rock.x + comp.offsetX, rock.y + comp.offsetY, comp.width, comp.height);
    });
  });
}

function drawText() {
  fill(255, 239, 213);
  rect(width / 2 - 250, height / 4 - 30, 500, 60);  // Scaled text box
  fill(0);
  textSize(24);  // Scaled text size
  textAlign(CENTER, CENTER);
  text("Let's Flashback to Africa 2024", width / 2, height / 4);
}

function mousePressed() {
    // Check if the mouse click is within the pond area
    if (dist(mouseX, mouseY, width / 2, height * 0.75) < 300) {  // Assuming the pond radius is 300 for simplicity
        if (!pondSound.isPlaying()) {
            pondSound.play();  // Play the pond sound if it's not already playing
        }
    }

    if (mySound.isPlaying()) {
        mySound.stop();
    } else {
        mySound.play();
    }
}