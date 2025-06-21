// === Seletores DOM ===
const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timerDisplay = document.querySelector(".timer");
const attemptsDisplay = document.querySelector(".attempts");
const matchesDisplay = document.querySelector(".matches");

// === Variáveis do jogo ===
let firstCard = null;
let secondCard = null;
let attempts = 0;
let matches = 0;
let characters = [];
let timer = 0;
let intervalId = null;
let gridMatrix = []; // <== Agora usamos matriz

// === Lista de personagens ===
const allCharacters = [
  "arthricia", "beth-smith", "cornvelious-daniel", "flansian", "jerry-smith",
  "jessica", "morty", "mr-goldenfold", "mr-meeseeks", "mr-poopybutthole",
  "pessoa-passaro", "prince-nebulon", "rick-sanchez", "scroopy",
  "snuffles", "squanchy", "summer", "tammy"
];

// === Define o nível e personagens ===
const setLevel = () => {
  const level = localStorage.getItem("level") || "facil";
  const levels = { facil: 3, medio: 6, dificil: 9 };
  characters = allCharacters.slice(0, levels[level]);
  grid.classList.add(level);
};

// === Criação de elementos HTML das cartas ===
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

// === Criação da carta ===
const createCard = (character, rowIndex, colIndex) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../../assets/image/cards/${character}.png')`;

  card.append(front, back);
  card.setAttribute("data-character", character);
  card.setAttribute("data-row", rowIndex);
  card.setAttribute("data-col", colIndex);
  card.addEventListener("click", handleCardClick);

  return card;
};

// === Gera matriz embaralhada de cartas ===
const generateGridMatrix = () => {
  const level = localStorage.getItem("level") || "facil";
  const layout = {
    facil: { rows: 2, cols: 3 },
    medio: { rows: 3, cols: 4 },
    dificil: { rows: 3, cols: 6 }
  };

  const { rows, cols } = layout[level];
  const cards = [...characters, ...characters].sort(() => Math.random() - 0.5);
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(cards[i * cols + j]);
    }
    matrix.push(row);
  }

  return matrix;
};

// === Revela carta clicada ===
const handleCardClick = ({ target }) => {
  const parent = target.parentNode;

  if (parent.classList.contains("reveal-card") || secondCard) return;

  parent.classList.add("reveal-card");

  if (!firstCard) {
    firstCard = parent;
  } else {
    secondCard = parent;
    validateMatch();
  }
};

// === Verifica se as cartas são iguais ===
const validateMatch = () => {
  const char1 = firstCard.getAttribute("data-character");
  const char2 = secondCard.getAttribute("data-character");

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (char1 === char2) {
    disableMatchedCards();
  } else {
    setTimeout(resetUnmatchedCards, 500);
  }
};

// === Desativa cartas corretas ===
const disableMatchedCards = () => {
  firstCard.firstChild.classList.add("disabled-card");
  secondCard.firstChild.classList.add("disabled-card");

  resetSelection();

  matches++;
  matchesDisplay.textContent = matches;

  checkGameEnd();
};

// === Esconde cartas erradas ===
const resetUnmatchedCards = () => {
  firstCard.classList.remove("reveal-card");
  secondCard.classList.remove("reveal-card");
  resetSelection();
};

// === Reseta seleção das cartas ===
const resetSelection = () => {
  firstCard = null;
  secondCard = null;
};

// === Carrega cartas no tabuleiro com matriz ===
const loadGame = () => {
  gridMatrix = generateGridMatrix();

  gridMatrix.forEach((row, rowIndex) => {
    row.forEach((character, colIndex) => {
      const card = createCard(character, rowIndex, colIndex);
      grid.appendChild(card);
    });
  });
};

// === Inicia o cronômetro ===
const startTimer = () => {
  intervalId = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
};

// === Verifica se o jogo acabou ===
const checkGameEnd = () => {
  const totalCards = characters.length * 2;
  const matchedCards = document.querySelectorAll(".disabled-card").length;

  if (matchedCards === totalCards) {
    clearInterval(intervalId);
    setTimeout(showEndGameModal, 500);
  }
};

// === Exibe modal de fim de jogo ===
const showEndGameModal = () => {
  const level = localStorage.getItem("level");
  document.getElementById("modalPlayer").textContent = spanPlayer.textContent;
  document.getElementById("modalTime").textContent = timer;
  document.getElementById("modalAttempts").textContent = attempts;
  document.getElementById("modalMatches").textContent = matches;

  const nextLevelBtn = document.getElementById("nextLevelBtn");
  nextLevelBtn.style.display = level !== "dificil" ? "inline-block" : "none";

  document.getElementById("endGameModal").style.display = "flex";
};

// === Botões da interface ===
const setupUIButtons = () => {
  document.getElementById("playAgainBtn").addEventListener("click", () => location.reload());

  document.getElementById("backToHomeBtn").addEventListener("click", () => {
    window.location.href = "../login/login.html";
  });

  document.getElementById("nextLevelBtn").addEventListener("click", () => {
    const currentLevel = localStorage.getItem("level");
    const nextLevel = currentLevel === "facil" ? "medio" :
                      currentLevel === "medio" ? "dificil" : null;

    if (nextLevel) {
      localStorage.setItem("level", nextLevel);
      location.reload();
    }
  });
};

// === Inicializa o jogo ===
window.onload = () => {
  spanPlayer.textContent = localStorage.getItem("player");
  setLevel();
  loadGame();
  startTimer();
  setupUIButtons();
};
