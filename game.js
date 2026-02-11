'use strict';

// Pong game logic implementation

let canvas = document.getElementById('pong');
let context = canvas.getContext('2d');

// Create the pong paddle
const paddleWidth = 10, paddleHeight = 100;
let player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: 'white', score: 0 };
let computer = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: 'white', score: 0 };

// Create the pong ball
const ballSize = 10;
let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballSize, speed: 4, velocityX: 5, velocityY: 5, color: 'white' };

// Draw everything on the canvas
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);

    context.fillStyle = computer.color;
    context.fillRect(computer.x, computer.y, computer.width, computer.height);

    // Draw ball
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.fill();
}

// Update game logic
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with paddles
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }
    if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.velocityX = -ball.velocityX;
    }
    if (ball.x + ball.radius > computer.x && ball.y > computer.y && ball.y < computer.y + computer.height) {
        ball.velocityX = -ball.velocityX;
    }

    // Reset the ball if it goes beyond paddle
    if (ball.x - ball.radius < 0) {
        computer.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = 5 * (Math.random() < 0.5 ? 1 : -1);
    ball.velocityY = 5 * (Math.random() < 0.5 ? 1 : -1);
}

// Game loop
function game() {
    draw();
    update();
    requestAnimationFrame(game);
}

// Start the game
game();
