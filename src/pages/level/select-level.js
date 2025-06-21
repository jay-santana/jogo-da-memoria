function selectLevel(level) {
  localStorage.setItem("level", level);
  window.location.href = "../game/game.html";
}

window.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-facil")
    .addEventListener("click", () => selectLevel("facil"));
  document
    .getElementById("btn-medio")
    .addEventListener("click", () => selectLevel("medio"));
  document
    .getElementById("btn-dificil")
    .addEventListener("click", () => selectLevel("dificil"));
});
