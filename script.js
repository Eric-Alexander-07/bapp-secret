document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const tileSize = 20;
  const tileCount = 20;
  let canvasSize = tileSize * tileCount;

  let snake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 }
  ];

  let dx = 0;
  let dy = -1;

  let food = { x: 0, y: 0 }; // Food coordinates

  let gameLoop;

  function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw food
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

      // Draw snake
      snake.forEach((segment, index) => {
          if (index % 2 === 0) {
              ctx.fillStyle = 'green';
          } else {
              ctx.fillStyle = 'lightgreen';
          }
          ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
      });
  }

  function update() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };

      // Wrap around the canvas borders
      if (head.x < 0) {
          head.x = tileCount - 1;
      } else if (head.x >= tileCount) {
          head.x = 0;
      }

      if (head.y < 0) {
          head.y = tileCount - 1;
      } else if (head.y >= tileCount) {
          head.y = 0;
      }

      // Check for collision with food
      if (head.x === food.x && head.y === food.y) {
          generateFood(); // Generate new food
      } else {
          // Remove the tail segment only if snake didn't eat food
          snake.pop();
      }

      // Check for collision with snake's body
      for (let i = 1; i < snake.length; i++) {
          if (head.x === snake[i].x && head.y === snake[i].y) {
              // Snake collided with itself, game over
              clearInterval(gameLoop);
              document.getElementById('game-over-screen').style.display = 'flex';
              return;
          }
      }

      // Move the snake
      snake.unshift(head);

      // Draw the snake and food after updating
      draw();
  }

  function generateFood() {
      food.x = Math.floor(Math.random() * tileCount);
      food.y = Math.floor(Math.random() * tileCount);
  }

  function startGame() {
      // Reset snake position and direction
      snake = [
          { x: 10, y: 10 },
          { x: 10, y: 11 },
          { x: 10, y: 12 }
      ];
      dx = 0;
      dy = -1;

      // Hide start screen and game over screen
      document.getElementById('start-screen').style.display = 'none';
      document.getElementById('game-over-screen').style.display = 'none';

      // Generate initial food
      generateFood();

      // Start game loop
      gameLoop = setInterval(update, 1000 / 10);
  }

  function up() {
    console.log(true);
    if (dy !== 1) {
        dx = 0;
        dy = -1;
    }
  }
  function down() {
    if (dy !== -1) {
        dx = 0;
        dy = 1;
    }
  }
  function left() {
    if (dx !== 1) {
        dx = -1;
        dy = 0;
    }
  }
  function right() {
    if (dx !== -1) {
        dx = 1;
        dy = 0;
    }
  }

  function handleKeyDown(event) {
      const keyPressed = event.key;

      if (keyPressed === 'ArrowUp' && dy !== 1) {
          dx = 0;
          dy = -1;
      }
      if (keyPressed === 'ArrowDown' && dy !== -1) {
          dx = 0;
          dy = 1;
      }
      if (keyPressed === 'ArrowLeft' && dx !== 1) {
          dx = -1;
          dy = 0;
      }
      if (keyPressed === 'ArrowRight' && dx !== -1) {
          dx = 1;
          dy = 0;
      }
  }

  document.getElementById('start-screen').addEventListener('click', startGame);
  document.getElementById('game-over-screen').addEventListener('click', startGame);
  document.addEventListener('keydown', handleKeyDown);
  document.getElementById('up').addEventListener('click', up)
  document.getElementById('down').addEventListener('click', down)
  document.getElementById('left').addEventListener('click', left)
  document.getElementById('right').addEventListener('click', right)
  // Initial display: Show start screen
  document.getElementById('start-screen').style.display = 'flex';

  // Update canvas size when the window is resized
});
