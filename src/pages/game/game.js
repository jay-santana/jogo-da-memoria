const grid = document.querySelector(".grid");

const characters = [
  "beth-smith",
  "cornvelious-daniel",
  "flansian",
  // 'jerry-smith',
  // 'jessica',
  // 'morty',
  // 'mr-goldenfold',
  // 'mr-meeseeks',
  // 'pessoa-passaro',
  // 'prince-nebulon',
  // 'rick-sanchez',
  // 'scroopy',
  // 'snuffles',
  // 'squanchy',
  // 'summer',
  // 'tammy',
];

const createElementCard = (tag, classCard) => {
  const element = document.createElement(tag);
  element.className = classCard;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCard = document.querySelectorAll('.disabled-card');
  if (disabledCard.length === 6) {
    alert("Parabéns, você venceu!")
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add("disabled-card");
    secondCard.firstChild.classList.add("disabled-card");
    firstCard = "";
    secondCard = "";

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
    target.parentNode.classList.add('reveal-card');
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

loadGame();
