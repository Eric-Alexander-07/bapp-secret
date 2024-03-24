document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const tileSize = 20;
  const tileCount = 20;
  const canvasSize = tileSize * tileCount;

  let snake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 }
  ];

  let dx = 0;
  let dy = -1;

  let food = { x: 0, y: 0 }; // Food coordinates

  function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvasSize, canvasSize);

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
              alert('Game Over!');
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

  function main() {
      update();
  }

  // Generate initial food
  generateFood();

  const gameLoop = setInterval(main, 1000 / 10);

  document.addEventListener('keydown', event => {
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
  });
});
