import React, { Component } from "react";
import Icon from "./Icon";
import Text from "./Text";
import Row from "./Row";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            board: [],
            score: 0,
            gameOver: false,
            bestScore: 0,
            howToPlay: false
        };
    }

    initBoard() {
        let board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        board = this.placeRandom(this.placeRandom(board));
        this.setState({board, score: 0, gameOver: false});
    }

    placeRandom(board) {
        const blankCoordinates = this.getBlankCoordinates(board);
        const randomCoordinate = blankCoordinates[Math.floor(Math.random() * blankCoordinates.length)];
        board[randomCoordinate[0]][randomCoordinate[1]] = this.randomStartingNumber();
        return board;
    }

    getBlankCoordinates(board) {
        const blankCoordinates = [];

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
                if (board[r][c] === 0) {blankCoordinates.push([r, c])}
            }
        }

        return blankCoordinates;
    }

    randomStartingNumber() {
        const startingNumbers = [2,4];
        return startingNumbers[Math.floor(Math.random() * startingNumbers.length)];
    }

    componentWillMount() {
        this.initBoard();
        document.addEventListener('keydown', this.handleOnPress.bind(this))
    }

    handleOnPress(e) {
        if (e.keyCode === 38) {this.move('up');}
        if (e.keyCode === 39) {this.move('right');}
        if (e.keyCode === 40) {this.move('down');}
        if (e.keyCode === 37) {this.move('left');}
    }

    boardMoved(original, updated) {
        return (JSON.stringify(updated) !== JSON.stringify(original));
    }

    move(direction) {
        let movedUp;
        let upWithRandom;
        let movedRight;
        let rightWithRandom;
        let movedDown;
        let downWithRandom;
        let movedLeft;
        let leftWithRandom;
        if (!this.state.gameOver) {
            if (direction === 'up') {
                movedUp = this.moveUp(this.state.board);
                if (this.boardMoved(this.state.board, movedUp.board)) {
                    upWithRandom = this.placeRandom(movedUp.board);
                    if (this.checkForGameOver(upWithRandom)) {this.setState({board: upWithRandom, gameOver: true});} // eslint-disable-next-line
                    else {this.setState({board: upWithRandom, score: this.state.score += movedUp.score});}
                }
            }
            if (direction === 'right') {
                movedRight = this.moveRight(this.state.board);
                if (this.boardMoved(this.state.board, movedRight.board)) {
                    rightWithRandom = this.placeRandom(movedRight.board);
                    if (this.checkForGameOver(rightWithRandom)) {this.setState({board: rightWithRandom, gameOver: true});} // eslint-disable-next-line
                    else {this.setState({board: rightWithRandom, score: this.state.score += movedRight.score});}
                }
            }
            if (direction === 'down') {
                movedDown = this.moveDown(this.state.board);
                if (this.boardMoved(this.state.board, movedDown.board)) {
                    downWithRandom = this.placeRandom(movedDown.board);
                    if (this.checkForGameOver(downWithRandom)) {this.setState({board: downWithRandom, gameOver: true});} // eslint-disable-next-line
                    else {this.setState({board: downWithRandom, score: this.state.score += movedDown.score});}
                }
            }
            if (direction === 'left') {
                movedLeft = this.moveLeft(this.state.board);
                if (this.boardMoved(this.state.board, movedLeft.board)) {
                    leftWithRandom = this.placeRandom(movedLeft.board);
                    if (this.checkForGameOver(leftWithRandom)) {this.setState({board: leftWithRandom, gameOver: true});} // eslint-disable-next-line
                    else {this.setState({board: leftWithRandom, score: this.state.score += movedLeft.score});}
                }
            }
        }
    }

    moveUp(inputBoard) {
        let rotatedRight = this.rotateRight(inputBoard);
        let board = [];
        let score = 0;

        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];
            for (let c = 0; c < rotatedRight[r].length; c++) {
                let current = rotatedRight[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    score += board[r][c];
                }
                else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }
        board = this.rotateLeft(board);
        return {board, score};
    }

    moveRight(inputBoard) {
        let board = [];
        let score = 0;

        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = 0; c < inputBoard[r].length; c++) {
                let current = inputBoard[r][c];
                (current === 0) ? row.unshift(current) : row.push(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = board[r].length - 1; c >= 0; c--) {
                if (board[r][c] > 0 && board[r][c] === board[r][c - 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c - 1] = 0;
                    score += board[r][c];
                }
                else if (board[r][c] === 0 && board[r][c - 1] > 0) {
                    board[r][c] = board[r][c - 1];
                    board[r][c - 1] = 0;
                }
            }
        }
        return {board, score};
    }

    moveDown(inputBoard) {
        let rotatedRight = this.rotateRight(inputBoard);
        let board = [];
        let score = 0;

        for (let r = 0; r < rotatedRight.length; r++) {
            let row = [];
            for (let c = rotatedRight[r].length - 1; c >= 0; c--) {
                let current = rotatedRight[r][c];
                (current === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c + 1] = 0;
                    score += board[r][c];
                }
                else if (board[r][c] === 0 && board[r][c + 1] > 0) {
                    board[r][c] = board[r][c + 1];
                    board[r][c + 1] = 0;
                }
            }
        }

        board = this.rotateLeft(board);
        return {board, score};
    }

    moveLeft(inputBoard) {
        let board = [];
        let score = 0;

        for (let r = 0; r < inputBoard.length; r++) {
            let row = [];
            for (let c = inputBoard[r].length - 1; c >= 0; c--) {
                let current = inputBoard[r][c];
                (current === 0) ? row.push(current) : row.unshift(current);
            }
            board.push(row);
        }

        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board.length; c++) {
                if (board[r][c] > 0 && board[r][c] === board[r][c + 1]) {
                    board[r][c] = board[r][c] * 2;
                    board[r][c + 1] = 0;
                    score += board[r][c];
                }
                else if (board[r][c] === 0 && board[r][c + 1] > 0) {
                    board[r][c] = board[r][c + 1];
                    board[r][c + 1] = 0;
                }
            }
        }
        return {board, score};
    }

    rotateRight(matrix) {
        let result = [];

        for (let c = 0; c < matrix.length; c++) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.push(matrix[r][c]);
            }
            result.push(row);
        }
        return result;
    }

    rotateLeft(matrix) {
        let result = [];

        for (let c = matrix.length - 1; c >= 0; c--) {
            let row = [];
            for (let r = matrix.length - 1; r >= 0; r--) {
                row.unshift(matrix[r][c]);
            }
            result.push(row);
        }

        return result;
    }

    checkForGameOver(board) {
        let moves = [
            this.boardMoved(board, this.moveUp(board).board),
            this.boardMoved(board, this.moveRight(board).board),
            this.boardMoved(board, this.moveDown(board).board),
            this.boardMoved(board, this.moveLeft(board).board)
        ];

        return (!moves.includes(true));
    }

    componentDidUpdate() {
        if (this.state.score > this.state.bestScore) {
            this.setState({bestScore: this.state.score})
        }
    }

    render() {
        return (
            <div className="container">
                <div className="Top">
                    <div className="upper">
                        <Icon />
                        <div className="ScoreBar">
                            <div className="Score">
                                <div className="scoreTitle" id='title1'>Score</div>
                                <div className="scorePoints">{this.state.score}</div>
                            </div>
                            <div className="BestScore">
                                <div className="bestScoreTitle" id='title2'>Best</div>
                                <div className="bestScorePoints">{this.state.bestScore}</div>
                            </div>
                        </div>
                    </div>
                    <div className="lower">
                        <Text />
                        <div className="newGame" onClick={() => (this.initBoard())}>New Game</div>
                    </div>
                </div>
                <div className="GameContainer">
                    <table>
                        {this.state.board.map((row, i) => (<Row key={i} row={row} />))}
                    </table>
                </div>
                {this.state.gameOver === true ? <div className="gameOver"><div>Game over</div><button onClick={() => (this.initBoard())}>New Game</button></div> : ``}
                <div className='howToPlay' onClick={() => (this.setState({howToPlay: !this.state.howToPlay}))}>{!this.state.howToPlay ? "How to play" : "Hide"}</div>
                {!this.state.howToPlay ? '' : <div className='instruction'>Use your <span>arrow keys</span> to move the tiles. When two tiles with the same number touch, they <span>merge into one!</span></div>}
            </div>
        );
    }
}

export default Home;