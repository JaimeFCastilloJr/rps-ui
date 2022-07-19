const choices = ["rock", "paper", "scissors"];
let winners = [];

function resetGame() {
  winners = []
  document.querySelector(".playerScore").textContent = "Score: 0";
  document.querySelector(".computerScore").textContent = "Score: 0";
  document.querySelector(".ties").textContent = "Ties: 0";
  document.querySelector(".winner").textContent = "";
  document.querySelector(".playerChoice").textContent = "";
  document.querySelector(".computerChoice").textContent = "";
  document.querySelector(".reset").style.display = "none";
}

function startGame() {
  // play the game until someone wins 5 times
  let imgs = document.querySelectorAll("img");
  imgs.forEach((img) => 
    img.addEventListener("click", () => {
      if (img.id) {
        playRound(img.id);
      }
    })
  );
}

function playRound(playerChoice) {
  let wins = checkWins();
  if (wins >= 5) {
    return;
  }

  const computerChoice = computerSelect();

  const winner = checkWinner(playerChoice, computerChoice);
  winners.push(winner);
  tallyWins();
  displayRound(playerChoice, computerChoice, winner);
  wins = checkWins();
  if (wins == 5) {



    displayEnd();
  }
}

function displayEnd() {
  let playerWins = winners.filter((item) => item == "Player").length;

  if (playerWins == 5) {
    document.querySelector(".winner").textContent =
      "You have won the match, Congratulations!";
  } else {
    document.querySelector(".winner").textContent =
      "Computer has won the match! Better luck next time!";
  }
  document.querySelector(".reset").style.display = "flex";
}

function displayRound(playerChoice, computerChoice, winner) {
  document.querySelector(".playerChoice").textContent = `You Chose: ${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }`;
  document.querySelector(".computerChoice").textContent = `The Computer Chose: ${
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
  }`;
  displayRoundWinner(winner);
}

function displayRoundWinner(winner) {
  if (winner == "Player") {
    document.querySelector(".winner").textContent = "You won the Round!";
  } else if (winner == "Computer") {
    document.querySelector(".winner").textContent =
      "The Computer won the Round!";
  } else {
    document.querySelector(".winner").textContent = "The Round was a tie!";
  }
}

function tallyWins() {
  let pWinsCount = winners.filter((item) => item == "Player").length;
  let cWinsCount = winners.filter((item) => item == "Computer").length;
  let ties = winners.filter((item) => item == "Tie").length;
  document.querySelector(".playerScore").textContent = `Score: ${pWinsCount}`;
  document.querySelector(".computerScore").textContent = `Score: ${cWinsCount}`;
  document.querySelector(".ties").textContent = `Ties: ${ties}`;
}

function computerSelect() {
  // - update the dom with the computer selection
  const choice = choices[Math.floor(Math.random() * choices.length)]

  document.querySelector(`.${choice}`).classList.add("active");

  setTimeout(() => {
    document.querySelector(`.${choice}`).classList.remove("active");
  }, 1000);

  return choice;
}

function checkWins() {
  const pWinsCount = winners.filter((item) => item == "Player").length;
  const cWinsCount = winners.filter((item) => item == "Computer").length;
  return Math.max(pWinsCount, cWinsCount);
}

function checkWinner(choiceP, choiceC) {
  if (
    (choiceP === "rock" && choiceC == "scissors") ||
    (choiceP === "paper" && choiceC == "rock") ||
    (choiceP === "scissors" && choiceC == "paper")
  ) {
    return "Player";
  } else if (choiceP == choiceC) {
    return "Tie";
  } else {
    return "Computer";
  }
}

function setWins() {
  const pWinsCount = winners.filter((item) => item == "Player").length;
  const cWinsCount = winners.filter((item) => item == "Computer").length;
  const ties = winners.filter((item) => item == "Tie").length;
}
startGame();
