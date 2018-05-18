var w;
var h;
var player;
var ballX;
var ballY;
var ballVelocity;
var opponentVelocity;
var paddleVelocity;

var paddlePosition;
var ballVelocity;
var accelLeft;
var accelRight;
var accelUp;
var accelDown;

var paused = false;

function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w,h);

  //Movement
  paddleAccel = createVector(0.25,0);
  up = createVector(0,-5);
  down = createVector(0,5);
  left = createVector(-5,0);
  right = createVector(5,0);

  //Ball
  ballPosition = createVector(w/2,h/2);
  initialBall();


  //Paddle
  paddlePosition = createVector(50,h/2);
  paddleVelocity = createVector(0,0);
}


function draw() {
  background(0);
  noStroke();
  fill(255);
  drawNet();
  drawEdge();
  drawPlayer(paddlePosition.x,paddlePosition.y);
  ballPosition.add(ballVelocity);
  drawBall(ballPosition.x,ballPosition.y);
  edgeCollision();
  hit();

}

function keyPressed() {
  console.log(keyCode);
  console.log(paused);
  if(keyCode == 80) {
    paused = !paused;
    if(paused) {
      textSize(100);
      text('PAUSED',w/2,h/2);
      fill(255);
      noLoop();
    } else if (!paused) {
      loop();
    }
  }

}

function movement() {
  if (keyIsDown(UP_ARROW)) {
    paddlePosition.add(up);
  }
  else if (keyIsDown(DOWN_ARROW)) {
    paddlePosition.add(down);
  }
}

function edgeCollision() {
  if(paddlePosition.y < 20) {
    paddlePosition.add(0,3);
  } else if (paddlePosition.y > h - 95) {
    paddlePosition.add(0,-3);
  } else {
    movement();
  }
  if ( ballPosition.y < 15 || ballPosition.y > h) {
    ballVelocity.mult(-1);
  }
  if(ballPosition.x < 15 || ballPosition.x > w) {
    ballPosition.mult(0);
    ballPosition.add(w/2,h/2);
    initialBall();

  }
}

function ballCollision() {
  if(ballPosition.x == paddlePosition.x) {
    var a = ballPosition.x;
    var b = ballPosition.y;
    ballVelocity.mult(0);
    ballVelocity.add(b,a);
    ballVelocity.mult(-1);
  }
}

var hit = false;

function paddleHit(){
  hit = collideRectCircle(paddlePosition.x, paddlePosition.y, 15,75,ballPosition.x,ballPosition.y,10);
  if(collide) {
    alert(paddlePosition.x,ballPosition.x);
    ballVelocity.add(paddleVelocity);
    ballVelocity.mult(-1);
  }
}

function drawNet(){
  rect(w/2-10,0,10,h);
}


function drawEdge() {
  noFill();
  stroke(255);
  strokeWeight(15);
  rect(0,0,w,h);
}

function drawBall(x,y) {
  fill(255);
  noStroke();
  ellipse(x,y,20,20);
}
function drawPlayer(x,y) {
  fill(255);
  noStroke();
  rect(x-30,y,15,75);
}

function initialBall() {
  var dir = Math.floor(Math.random() * 2);
  var x = 5;
  var y = 0;
  console.log(dir);
  if(dir == 1) {
    ballVelocity = createVector(-x,y);
  } else {
    ballVelocity = createVector(x,y);
  }
}
