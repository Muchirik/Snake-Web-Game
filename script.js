const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 700;
const GAME_HEIGHT = 700;
const SPEED = 100;
const SPACE_SIZE = 30;
const SNAKE_COLOR = "#00FF00";
const FOOD_COLOR = "#FF0000";
const BACKGROUND_COLOR = "black";

let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let direction = 'down';
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    setTimeout(function() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        if (checkCollision()) {
            gameOver();
        } else {
            gameLoop();
        }
    }, SPEED);
}

function clearCanvas() {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function drawSnake() {
    ctx.fillStyle = SNAKE_COLOR;
    snake.forEach(part => ctx.fillRect(part.x, part.y, SPACE_SIZE, SPACE_SIZE));
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'up':
            head.y -= SPACE_SIZE;
            break;
        case 'down':
            head.y += SPACE_SIZE;
            break;
        case 'left':
            head.x -= SPACE_SIZE;
            break;
        case 'right':
            head.x += SPACE_SIZE;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        createFood();
    } else {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(food.x, food.y, SPACE_SIZE, SPACE_SIZE);
}

function createFood() {
    food.x = Math.floor(Math.random() * (GAME_WIDTH / SPACE_SIZE)) * SPACE_SIZE;
    food.y = Math.floor(Math.random() * (GAME_HEIGHT / SPACE_SIZE)) * SPACE_SIZE;
}

function changeDirection(event) {
    const key = event.keyCode;
    const goingUp = direction === 'up';
    const goingDown = direction === 'down';
    const goingLeft = direction === 'left';
    const goingRight = direction === 'right';

    if (key === 37 && !goingRight) {
        direction = 'left';
    } else if (key === 38 && !goingDown) {
        direction = 'up';
    } else if (key === 39 && !goingLeft) {
        direction = 'right';
    } else if (key === 40 && !goingUp) {
        direction = 'down';
    }
}

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    if (head.x < 0 || head.x >= GAME_WIDTH || head.y < 0 || head.y >= GAME_HEIGHT) {
        return true;
    }
    return false;
}

function gameOver() {
    ctx.font = "70px Consolas";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2);
}

createFood();
gameLoop();
