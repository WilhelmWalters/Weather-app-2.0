let inputBar = document.querySelector("#input-bar");
inputBar.addEventListener("submit", rollDice);

function rollDice() {
  let randomNumber = Math.floor(Math.random() * 6 + 1);
  alert(`${randomNumber}`);
}
