const input = document.querySelector(".login-input");
const playButton = document.querySelector(".login-button");
const form = document.querySelector(".login-form");

const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    playButton.removeAttribute("disabled");
    return;
  }
  playButton.setAttribute("disabled", "");
};

const handleSubmit = (event) => {
  event.preventDefault();
  localStorage.setItem("player", input.value);
  window.location = "../level/select-level.html";
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
