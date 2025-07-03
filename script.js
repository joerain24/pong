const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

let paddleX = 200;
let paddleY = 480;
let paddleWidth = 100;
let paddleHeight = 20;

let ballX = 250;
let ballY = 250;
let ballRadius = 10;

let vx = 3;
let vy = 3;
let count = 0;

function update() {
  ballX += vx;
  ballY += vy;

  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    vx = -vx;
  }

  if (ballY - ballRadius < 0) {
    let angle = Math.random() * Math.PI / 2 - Math.PI / 4;
    vx = vy * Math.tan(angle);
    vy = -vy;
  }

  if (
    ballY + ballRadius > paddleY &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    vy = -vy;
    count++;
  }

  if (ballY + ballRadius > canvas.height) {
    ballX = 250;
    ballY = 250;
    vx = 3;
    vy = 3;
    count = 0;
  }
}

function gameLoop() {
  update();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // Paddle
  ctx.fillStyle = 'black';
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);

  // Top wall
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let i = 0; i < canvas.width; i += 20) {
    ctx.lineTo(i, 10 * Math.sin(i * Math.PI / 100));
  }
  ctx.lineTo(canvas.width, 0);
  ctx.fillStyle = 'black';
  ctx.fill();

  // Score
  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Count: ${count}`, 10, 20);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    paddleX -= 40;
  } else if (event.key === 'ArrowRight') {
    paddleX += 40;
  }
});
