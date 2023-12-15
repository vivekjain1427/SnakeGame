    //   Display the food
    FoodElement = document.createElement("div");
    FoodElement.style.gridRowStart = Food.y;
    FoodElement.style.gridColumnStart = Food.x;
    FoodElement.classList.add("Food");
    board.appendChild(SnakeElement);
}

// Main Logic Starts Here
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDirection = { x: 0, y: 1 }; //start the game
    SnakeMoveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
            
            case "ArrowDown":
                console.log("ArrowDown");
                inputDirection.x = 0;
                inputDirection.y = 1;
                break;
                
                case "ArrowRight":
                    console.log("ArrowRight");
                    inputDirection.x = 1;
                    inputDirection.y = 0;
                    break;
                    
                    case "ArrowLeft":
                        console.log("ArrowLeft");
                        inputDirection.x = -1;
                        inputDirection.y = 0;
                        break;
                        
    default:
        break;
  }
});

