const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const attemptsDisplay = document.querySelector(".attempts");
const matchesDisplay = document.querySelector(".matches");

let firstCard = "";
let secondCard = "";
let attempts = 0;
let matches = 0;

const allCharacters = [
  "arthricia",
  "beth-smith",
  "cornvelious-daniel",
  "flansian",
  "jerry-smith",
  "jessica",
  "morty",
  "mr-goldenfold",
  "mr-meeseeks",
  "mr-poopybutthole",
  "pessoa-passaro",
  "prince-nebulon",
  "rick-sanchez",
  "scroopy",
  "snuffles",
  "squanchy",
  "summer",
  "tammy",
];

let characters = [];

const setLevel = () => {
  const level = localStorage.getItem("level");

  if (level === "facil") {
    characters = allCharacters.slice(0, 3);
    grid.classList.add("facil");
  } else if (level === "medio") {
    characters = allCharacters.slice(0, 6);
    grid.classList.add("medio");
  } else if (level === "dificil") {
    characters = allCharacters.slice(0, 9);
    grid.classList.add("dificil");
  } else {
    characters = allCharacters.slice(0, 3);
    grid.classList.add("facil");
  }
};

const createElementCard = (tag, classCard) => {
  const element = document.createElement(tag);
  element.className = classCard;
  return element;
};

const checkEndGame = () => {
  const disabledCard = document.querySelectorAll(".disabled-card");
  if (disabledCard.length === characters.length * 2) {
    clearInterval(this.loop);
    setTimeout(() => {
      const level = localStorage.getItem("level");

      document.getElementById("modalPlayer").innerText = spanPlayer.innerHTML;
      document.getElementById("modalTime").innerText = timer.innerHTML;
      document.getElementById("modalAttempts").innerText = attempts;
      document.getElementById("modalMatches").innerText = matches;

      const nextLevelBtn = document.getElementById("nextLevelBtn");
      if (level === "facil" || level === "medio") {
        nextLevelBtn.style.display = "inline-block";
      } else {
        nextLevelBtn.style.display = "none";
      }

      document.getElementById("endGameModal").style.display = "flex";
    }, 500);
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  attempts++;
  attemptsDisplay.innerText = attempts;

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";

    matches++;
    matchesDisplay.innerText = matches;

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }
  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const creatCard = (character) => {
  const card = createElementCard("div", "card");
  const front = createElementCard("div", "face front");
  const back = createElementCard("div", "face back");

  front.style.backgroundImage = `url('../../assets/image/cards/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters].sort(
    () => Math.random() - 0.5
  );
  duplicateCharacters.forEach((character) => {
    const card = creatCard(character);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = Number(timer.innerHTML);
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  setLevel();
  loadGame();
  startTimer();

  document.getElementById("playAgainBtn").addEventListener("click", () => {
    location.reload();
  });

  document.getElementById("backToHomeBtn").addEventListener("click", () => {
    window.location.href = "../login/login.html";
  });

  document.getElementById("nextLevelBtn").addEventListener("click", () => {
    const currentLevel = localStorage.getItem("level");

    let nextLevel = "";
    if (currentLevel === "facil") {
      nextLevel = "medio";
    } else if (currentLevel === "medio") {
      nextLevel = "dificil";
    }

    if (nextLevel) {
      localStorage.setItem("level", nextLevel);
      location.reload(); // isso recarrega o game.html com o novo nível
    }
  });
};

