// === Seleciona os elementos do DOM ===
const input = document.querySelector(".login-input");
const playButton = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

// === Valida o campo de entrada em tempo real ===
const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    playButton.removeAttribute("disabled");
    return;
  }
  playButton.setAttribute("disabled", "");
};

// === Lida com o envio do formulário ===
const handleSubmit = (event) => {
  event.preventDefault();
  localStorage.setItem("player", input.value);
  window.location = "./src/pages/level/select-level.html";
};

// === Eventos ===
input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
