const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

let x = canvas.width / 2
let y = canvas.height - 30
let dx = 2
let dy = -2
let ballRadius = 10

// paddle
const paddleH = 10
const paddleW = 75
let paddleX = (canvas.width - paddleW) / 2

// paddle flag
let rightPressed = false
let leftPressed = false

// score
let score = 0

// life
let lives = 3

// brick
let brickRowCount = 3
let brickColCount = 5
let brickWidth = 75
let brickHeight = 20
let brickPadding = 10
let brickOffsetTop = 30
let brickOffsetLeft = 30
const bricks = []

// 先にbricksの配列が入っているように
for (let c = 0; c < brickColCount; c++) {
  bricks[c] = []
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 }
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r]
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy
          b.status = 0
          score++

          if (score === brickRowCount * brickColCount) {
            alert('YOU WIN, CONGRATULATIONS!')
            document.location.reload()
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095dd"
  ctx.fillText(`Score: ${score}`, 8, 20)
}

function drawLives() {
  ctx.font = "16px Arial"
  ctx.fillStyle = "#0095dd"
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20)
}

function drawBall() {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleH, paddleW, paddleH)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

function drawBricks() {
  for (let c = 0; c < brickColCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[c][r].x = brickX
        bricks[c][r].y = brickY

        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = '#0095dd'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawBricks()
  drawPaddle()
  drawScore()
  drawLives()
  collisionDetection()
  // 衝突検知
  // 壁にめり込まないようradiusを考慮
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleW) {
      if (y = y - paddleH) {
        dy = -dy
      }
    } else {
      lives--

      if (!lives) {
        alert('GAME OVER')
        document.location.reload()
      } else {
        x = canvas.width / 2
        y = canvas.height - 30
        dx = 3
        dy = 3
        paddleX = (canvas.width - paddleW) / 2
      }
    }
  }
  if (x + dx > canvas.width - ballRadius | x + dx < ballRadius) {
    dx = -dx
  }

  x += dx
  y += dy

  requestAnimationFrame(draw)

  if (rightPressed && paddleX < canvas.width - paddleW) {
    paddleX += 7
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener('mousemove', mouseMoveHandler, false)

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleW / 2
  }
}

draw()
