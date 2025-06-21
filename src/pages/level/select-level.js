// === Função principal: define o nível e redireciona para o jogo ===
function selectLevel(level) {
  localStorage.setItem("level", level);
  window.location.href = "../game/game.html";
}

// === Adiciona eventos aos botões após o carregamento da página ===
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
