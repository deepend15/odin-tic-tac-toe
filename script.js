function gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(null);
        }
    }

    const getBoard = () => board;

    const selectSquare = (row, column, player) => {
        if (board[row][column] === null) {
            board[row][column] = player.token;
        } else {
            console.log(`You can't select that square! Try again.`);
            return false;
        }
    }

    const printBoard = () => console.log(board);

    return { getBoard, selectSquare, printBoard };
}

function createPlayerOne(name) {
    const token = 'x';

    return { name, token };
}

function createPlayerTwo(name) {
    const token = 'o';

    return { name, token };
}

function gameController(playerOneName = "Jim",
    playerTwoName = "Bob"
) {
    const board = gameboard();

    const playerOne = createPlayerOne(playerOneName);
    const playerTwo = createPlayerTwo(playerTwoName);

    let activePlayer = playerOne;

    const switchPlayerTurn = () => {
        if (activePlayer === playerOne) {
            activePlayer = playerTwo;
        } else if (activePlayer === playerTwo) {
            activePlayer = playerOne;
        };
    };

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn.`);
    };

    const playRound = (row, column) => {
        let squareSelection = board.selectSquare(row, column, activePlayer);
        if (squareSelection === false) {
            printNewRound();
        } else {
            console.log(`${activePlayer.name} selected row ${row}, column ${column}.`);

            switchPlayerTurn();
            printNewRound();
        }
    };

    printNewRound();

    return { playRound };
};

const game = gameController();