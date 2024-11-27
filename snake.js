const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuración inicial
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
let gameOver = false;

// Función principal del juego
function gameLoop() {
    if (gameOver) {
        alert("¡Juego terminado! Pulsa F5 para reiniciar.");
        return;
    }

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mover la serpiente
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        // Comprobar colisiones
        if (head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            gameOver = true;
        }

        snake.unshift(head);

        // Comer comida
        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
        } else {
            snake.pop();
        }

        // Dibujar comida
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

        // Dibujar serpiente
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        requestAnimationFrame(gameLoop);
    }, 100);
}

// Manejar controles
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -1 }; break;
        case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 1 }; break;
        case 'ArrowLeft': if (direction.x === 0) direction = { x: -1, y: 0 }; break;
        case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
});

// Iniciar el juego
gameLoop();
