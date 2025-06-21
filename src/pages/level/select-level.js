function selectLevel(level) {
  localStorage.setItem('level', level);
  window.location.href = '../game/game.html';
}

