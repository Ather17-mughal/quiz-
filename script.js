const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const difficultySelection = document.getElementById('difficultySelection');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;
let difficulty = 'easy'; // Default difficulty

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Difficulty Level Selection
document.getElementById('easyButton').addEventListener('click', () => {
    difficulty = 'easy';
    startGame();
});

document.getElementById('hardButton').addEventListener('click', () => {
    difficulty = 'hard';
    startGame();
});

const startGame = () => {
    difficultySelection.style.display = 'none'; // Hide difficulty buttons
    board.style.display = 'grid'; // Show game board
    backgroundMusic.play(); // Play background music
    resetGame();
};

// Check for a Winner
const checkWinner = (player) => {
    return winPatterns.find(pattern => {
        return pattern.every(index => gameBoard[index] === player);
    });
};

const handleClick = (e) => {
    if (isGameOver || gameBoard[e.target.dataset.index] !== '') return;

    gameBoard[e.target.dataset.index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    const winnerPattern = checkWinner(currentPlayer);
    if (winnerPattern) {
        isGameOver = true;
        highlightWinner(winnerPattern);
        message.textContent = `${currentPlayer} wins!`;
        restartButton.style.display = 'block';
        return;
    }

    // Check for a draw
    if (gameBoard.every(cell => cell !== '')) {
        isGameOver = true;
        message.textContent = "It's a draw!";
        restartButton.style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O' && !isGameOver) {
        setTimeout(computerMove, 500);
    }
};

const computerMove = () => {
    let bestMove;
    if (difficulty === 'easy') {
        // Random move for "Easy" difficulty
        const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else if (difficulty === 'hard') {
        // Minimax for "Hard" difficulty
        bestMove = minimax(gameBoard, 'O').index;
    }

    gameBoard[bestMove] = 'O';
    cells[bestMove].textContent = 'O';
    cells[bestMove].classList.add('o');

    const winnerPattern = checkWinner('O');
    if (winnerPattern) {
        isGameOver = true;
        highlightWinner(winnerPattern);
        message.textContent = 'O wins!';
        restartButton.style.display = 'block';
    } else if (gameBoard.every(cell => cell !== '')) {
        isGameOver = true;
        message.textContent = "It's a draw!";
        restartButton.style.display = 'block';
    } else {
        currentPlayer = 'X';
    }
};

// Minimax Algorithm
const minimax = (board, player) => {
    const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);

    // Base case: check if the game is over
    const winnerX = checkWinner('X');
    const winnerO = checkWinner('O');

    if (winnerX) return { score: -10 };
    if (winnerO) return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availableMoves.length; i++) {
        const move = {};
        move.index = availableMoves[i];
        board[availableMoves[i]] = player;

        if (player === 'O') {
            const result = minimax(board, 'X');
            move.score = result.score;
        } else {
            const result = minimax(board, 'O');
            move.score = result.score;
        }

        board[availableMoves[i]] = ''; // Undo the move
        moves.push(move);
    }

    // Choose the best move
    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
};

const highlightWinner = (winnerPattern) => {
    winnerPattern.forEach(index => {
        cells[index].style.backgroundColor = '#333';
        cells[index].style.color = '#FFF';
    });

    // Draw a line across the winning cells
    const line = document.createElement('div');
    line.classList.add('winning-line');
    const rect = cells[winnerPattern[0]].getBoundingClientRect();
    line.style.width = `${Math.abs(cells[winnerPattern[0]].offsetLeft - cells[winnerPattern[2]].offsetLeft) + 100}px`;
    line.style.left = `${Math.min(cells[winnerPattern[0]].offsetLeft, cells[winnerPattern[2]].offsetLeft)}px`;
    line.style.top = `${rect.top + rect.height / 2 - 2}px`;
    document.body.appendChild(line);
};

const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '';
    });
    message.textContent = '';
    isGameOver = false;
    currentPlayer = 'X';
    const line = document.querySelector('.winning-line');
    if (line) line.remove();
    restartButton.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', resetGame);
