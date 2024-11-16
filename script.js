let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

// دالة للتحقق من فوز اللاعب
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // صفوف
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // أعمدة
        [0, 4, 8], [2, 4, 6]  // قطرات
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameOver = true;
            statusDiv.textContent = `اللاعب ${currentPlayer} فاز!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        isGameOver = true;
        statusDiv.textContent = 'تعادل!';
    }
}

// دالة لتحديث واجهة اللعبة
function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
    });
}

// دالة لإعادة ضبط اللعبة
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    statusDiv.textContent = 'دور اللاعب X';
    updateBoard();
}

// التعامل مع ضغط الخلايا
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');

        if (gameBoard[index] || isGameOver) return;

        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();

        if (!isGameOver) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDiv.textContent = `دور اللاعب ${currentPlayer}`;
        }
    });
});

// إعادة تشغيل اللعبة عند الضغط على زر إعادة التشغيل
resetBtn.addEventListener('click', resetGame);

// تحديث واجهة اللعبة لأول مرة
updateBoard();
