// Game Constants and Variables
let InputDirection = { x: 0, y: 0 };
const FoodSound = new Audio("food.mp3");
const GameOverSound = new Audio("gameover.mp3");
const MoveSound = new Audio("move.mp3");
const MusicSound = new Audio("music.mp3");
let Speed = 6;
let Score = 0;
let LastPaintTimes = 0;
let SnakeHead = [{ x: 13, y: 15 }];
food = { x: 8, y: 7 };

// Game Function
function main(CurrentTimes) {
  window.requestAnimationFrame(main);
  if ((CurrentTimes - LastPaintTimes) / 1000 < 1 / Speed) {
    return;
  }
  LastPaintTimes = CurrentTimes;
  GameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < SnakeHead.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function GameEngine() {
  // Part-1: Updating the Snake Variable
  if (isCollide(SnakeHead)) {
    GameOverSound.play();
    MusicSound.pause();
    InputDirection = { x: 0, y: 0 };
    alert("Game Over, Press any key to play again");
    SnakeHead = [{ x: 13, y: 15 }];
    MusicSound.play();
    Score = 0;
  }

  //   If you haven eaten the food, increment the score and regenrate the food
  if (SnakeHead[0].y === food.y && SnakeHead[0].x === food.x) {
    FoodSound.play(); 
    // MusicSound.play();
    Score += 1;
    if(Score>hiscoreVal){
      hiscoreVal = Score;
      localStorage.setItem(" hiScore ", JSON.stringify(hiscoreVal))
      hiscoreBox.innerHTML = " HiScore " + hiscoreVal;
    }
    ScoreBox.innerHTML = " Score: " + Score;
    SnakeHead.unshift({
      x: SnakeHead[0].x + InputDirection.x,
      y: SnakeHead[0].y + InputDirection.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //   Moving the Snake
  for (let i = SnakeHead.length - 2; i >= 0; i--) {
    SnakeHead[i + 1] = { ...SnakeHead[i] };
  }
  SnakeHead[0].x += InputDirection.x;
  SnakeHead[0].y += InputDirection.y;

  // Part-2: Display the snake and Food
  //   Display the Snake
  board.innerHTML = "";
  SnakeHead.forEach((e, index) => {
    SnakeElement = document.createElement("div");
    SnakeElement.style.gridRowStart = e.y;
    SnakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      SnakeElement.classList.add("head");
    } else {
      SnakeElement.classList.add("snake");
    }
    board.appendChild(SnakeElement);
  });
  // Display the Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main Function Starts Here
let hiscore = localStorage.getItem("hiScore");
if(hiscore === null){ 
  hiscoreVal =0;
  localStorage.setItem("hiScore",JSON.stringify(hiscoreVal))
}
else{
  hiscoreVal = JSON.parse(hiscore);
  hiscoreBox.innerHTML ="HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  InputDirection = { x: 0, y: 1 }; //Start the Game
  MoveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      InputDirection.x = 0;
      InputDirection.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      InputDirection.x = 0;
      InputDirection.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      InputDirection.x = -1;
      InputDirection.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      InputDirection.x = 1;
      InputDirection.y = 0;
      break;
    default:
      break;
  }
});
