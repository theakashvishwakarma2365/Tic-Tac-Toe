let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true = O's turn, false = X's turn
let winnerfound = false;
let gameOver = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameOver || box.innerText !== "") return; // Prevent clicks on filled boxes or after game ends
    
    console.log("Box clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWin();
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const checkDraw = () => {
  let filledBoxes = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      filledBoxes++;
    }
  });
  
  // If all 9 boxes are filled and no winner found, it's a draw
  if (filledBoxes === 9 && !winnerfound) {
    msg.innerText = "It's a Draw! Game Over.";
    msgContainer.classList.remove("hide");
    gameOver = true;
    disableBoxes();
    return true;
  }
  return false;
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  gameOver = true;
  disableBoxes();
};

const resetGame = () => {
  turnO = true;
  winnerfound = false;
  gameOver = false;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const checkWin = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    
    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        winnerfound = true;
        showWinner(pos1val);
        return; // Exit early if winner found
      }
    }
  }
  
  // Check for draw only if no winner found
  if (!winnerfound) {
    checkDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);