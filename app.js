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

// brock
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
    bricks[c][r] = { x: 0, y: 0 }
  }
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
      let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft
      let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop
      bricks[c][r].x = 0
      bricks[c][r].y = 0

      ctx.beginPath()
      ctx.rect(brickX, brickY, brickWidth, brickHeight)
      ctx.fillStyle = '#0095dd'
      ctx.fill()
      ctx.closePath()
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawBricks()
  drawPaddle()
  // 衝突検知
  // 壁にめり込まないようradiusを考慮
  if (y + dy < ballRadius) {
    dy = -dy
  } else if (y + dy > canvas.height - ballRadius) {
    alert('GAME OVER')
    document.location.reload()
    clearInterval(interval)
  }
  if (x + dx > canvas.width - ballRadius | x + dx < ballRadius) {
    dx = -dx
  }

  x += dx
  y += dy

  if (rightPressed && paddleX < canvas.width - paddleW) {
    paddleX += 7
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7
  }
}

document.addEventListener('keydown', keyDownHandle, false)
document.addEventListener('keyup', keyUpHandle, false)

function keyDownHandle(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true
  }
}

function keyUpHandle(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false
  }
  else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false
  }
}

const interval = setInterval(draw, 10)
