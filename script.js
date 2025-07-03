const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Set the dimensions of the canvas
canvas.width = 500;
canvas.height = 500;

// Set the initial position and dimensions of the paddle
let paddleX = 200;
let paddleY = 480;
let paddleWidth = 100;
let paddleHeight = 20;

// Set the initial position and dimensions of the ball
let ballX = 250;
let ballY = 250;
let ballRadius = 10;

// Set the initial velocity of the ball
let vx = 4;
let vy = 4;

function update() {
  // Update the position of the ball based on its velocity
  ballX += vx;
  ballY += vy;

  // Check if the ball has collided with the walls or paddle
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    vx = -vx;
  }
  if (ballY - ballRadius < 0) {
    // Generate a random angle for the ball to bounce off the top wall
    let angle = Math.random() * Math.PI / 2 - Math.PI / 4;
    vx = vy * Math.tan(angle);
    vy = -vy;
  }
  if (ballY + ballRadius > paddleY && ballX > paddleX && ballX < paddleX + paddleWidth) {
    vy = -vy;
  }
  if (ballY + ballRadius > canvas.height) {
    // Restart the game if the ball has fallen off the bottom of the screen
    ballX = 250;
    ballY = 250;
    vx = 4;
    vy = 4;
  }
}

function gameLoop() {
  // Update the ball's position
  update();

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball on the canvas
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // Draw the paddle on the canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

  // Draw the jagged top wall on the canvas
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.lineTo(i, 10 * Math.sin(i * Math.PI / 100));
  }
  ctx.lineTo(canvas.width, 0);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Request the next frame of the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);

// Handle keyboard input to move the paddle
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      paddleX -= 40;
      break;
    case 'ArrowRight':
      paddleX += 40;
      break;
  }
});

let count = 0;

function update() {
  // Update the position of the ball based on its velocity
  ballX += vx;
  ballY += vy;

  // Check if the ball has collided with the walls or paddle
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    vx = -vx;
  }
  if (ballY - ballRadius < 0) {
    // Generate a random angle for the ball to bounce off the top wall
    let angle = Math.random() * Math.PI / 2 - Math.PI / 4;
    vx = vy * Math.tan(angle);
    vy = -vy;
  }
  if (ballY + ballRadius > paddleY && ballX > paddleX && ballX < paddleX + paddleWidth) {
    vy = -vy;
    count++;
  }
  if (ballY + ballRadius > canvas.height) {
    // Restart the game if the ball has fallen off the bottom of the screen
    ballX = 250;
    ballY = 250;
    vx = 3;
    vy = 3;
    count = 0;
  }
}

function gameLoop() {
  // Update the ball's position
  update();

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ball on the canvas
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // Draw the paddle on the canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

  // Draw the jagged top wall on the canvas
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.lineTo(i, 10 * Math.sin(i * Math.PI / 100));
  }
  ctx.lineTo(canvas.width, 0);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Draw the count on the canvas
  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Count: ${count}`, 10, 20);

  // Request the next frame of the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
