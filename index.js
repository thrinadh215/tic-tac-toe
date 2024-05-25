// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    let isXNext = true;
    let gameActive = true;
    const boardState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (boardState[index] || !gameActive) {
            return;
        }

        boardState[index] = isXNext ? 'X' : 'O';
        cell.textContent = boardState[index];

        if (checkWin()) {
            setTimeout(() => alert(`${boardState[index]} has won!`), 100);
            gameActive = false;
            return;
        }

        if (!boardState.includes(null)) {
            setTimeout(() => alert('It\'s a draw!'), 100);
            gameActive = false;
            return;
        }

        isXNext = !isXNext;
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function restartGame() {
        isXNext = true;
        gameActive = true;
        boardState.fill(null);
        cells.forEach(cell => (cell.textContent = ''));
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
