function createBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < maxAttempts * 5; i++) {
    const square = document.createElement("div");
    square.setAttribute("row", Math.floor(i / 5));
    square.style.fontFamily = "Georgia";
    square.classList.add("square");
    square.id = `square-${i}`;
    board.appendChild(square);
  }
}
