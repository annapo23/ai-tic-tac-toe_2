import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import {
    Board,
    BottomBar,
    ComputerContainer,
    Game,
    GlobalStyle,
    Main,
    PlayerContainer,
    ResetButton,
    Square,
    Timer,
    TopBar,
} from './styledComponents';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: ["", "", "", "", "", "", "", "", ""],
      disabled: false,
      isOn: false,
      keep_playing: true,
      player_symbol: "X",
      pc_symbol: "O",
      time:  0,
      vsPC: true,
      winningIndexes: [],
      x_turn: true,
    };
    this.initialState = { ...this.state };
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
  }

  handleCellClick(index) {
    if (this.state.board[index] === "" && this.state.keep_playing === true && this.state.vsPC === true) {
      let update_board = this.state.board.slice(0);
      if (this.state.time === 0) {
        this.startTimer();
      }
      if (this.state.vsPC === true) {
        update_board[index] = this.state.player_symbol;
        this.setState({
          board: update_board,
          disabled: true,
        }, () => this.handleCheckWinner());

        let pc_index = find_best_move(update_board);
        if (pc_index !== -4) {
          setTimeout(() => {
            update_board[pc_index] = this.state.pc_symbol;
            this.setState({
              board: update_board,
              disabled: false,
            }, () => this.handleCheckWinner());
          }, 750);
        }
      }
    } 
    this.handleCheckWinner();
  }

  handleCheckWinner() {
    let hasEmptySpots = isEmpty(this.state.board.filter((el) => el === ''));
    let { hasWinner, winningIndexes } = winner(this.state.board);
    this.setState({
      keep_playing: hasWinner === null ? true : false,
      winningIndexes, 
    })
    if (hasWinner !== null || hasEmptySpots) {
      this.stopTimer();
    }
  }

  handleResetButton() {
    this.stopTimer();
    this.setState(this.initialState);
  }

  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time,
    })
    this.timer = setInterval(() => this.setState({
      time: Date.now() - this.state.start,
    }), 1);
  }

  stopTimer() {
    this.setState({
     isOn: false,
    })
    clearInterval(this.timer);
  }

  render() {
    const {
        board,
        disabled,
        pc_symbol,
        player_symbol,
        time,
        winningIndexes,
    } = this.state;
    return (
      <Fragment>
        <GlobalStyle />
        <Main>
          <TopBar>
            <ResetButton onClick={this.handleResetButton}>Reset</ResetButton>
          </TopBar>
          <Game>
            <Board>
              {board.map((cell, index) => {
                const isWinning = winningIndexes.includes(index);
                if (index !== 4) {
                  return (
                    <Square
                      key={index}
                      disabled={disabled}
                      isOccupied={board[index] !== ""}
                      isWinning={isWinning}
                      onClick={() => this.handleCellClick(index)}
                    >
                      {cell}
                    </Square>
                  );
                } else {
                    return (
                      <Square
                        key={index}
                        disabled={disabled}
                        isOccupied={board[index] !== ""}
                        isWinning={isWinning}
                        onClick={() => this.handleCellClick(index)}
                      >
                        {cell}
                        <Timer>{moment.utc(time).format('mm:ss')}</Timer>
                      </Square>
                    );
                  }
                }
              )}
            </Board>
          </Game>
          <BottomBar>
            <PlayerContainer>Player: {player_symbol}</PlayerContainer>
            <ComputerContainer>Computer: {pc_symbol}</ComputerContainer>
          </BottomBar>
        </Main>
      </Fragment>
    );
  }
}

function winner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] !== "" && squares[a] === squares[b] && squares[a] === squares[c] && squares[b] === squares[c])
      return { hasWinner: squares[a], winningIndexes: [a, b, c] };
  }
  return { hasWinner: null, winningIndexes: [] };
}

function arrayToMat(squares) {
  let mat = [];
  let k = 0;
  for (let i = 0; i < 3; i++) {
    mat[i] = [];
    for (let j = 0; j < 3; j++) mat[i][j] = squares[k++];
  }
  return mat;
}

function hasMovesLeft(mat) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mat[i][j] === "") return true;
    }
  }
  return false;
}

function evaluate(mat, depth) {
  for (let i = 0; i < 3; i++) {
    if (mat[i][0] === mat[i][1] && mat[i][0] === mat[i][2] && mat[i][1] === mat[i][2]) {
      if (mat[i][0] === 'O') return 100 - depth;
      if (mat[i][0] === 'X') return depth - 100;
    }
  }
  for (let j = 0; j < 3; j++) {
    if (mat[0][j] === mat[1][j] && mat[0][j] === mat[2][j] && mat[1][j] === mat[2][j]) {
      if (mat[0][j] === 'O') return 100 - depth;
      if (mat[0][j] === 'X') return depth - 100;
    }
  }
  if (mat[0][0] === mat[1][1] && mat[0][0] === mat[2][2] && mat[1][1] === mat[2][2]) {
    if (mat[0][0] === 'O') return 100 - depth;
    if (mat[0][0] === 'X') return depth - 100;
  }
  if (mat[0][2] === mat[1][1] && mat[0][2] === mat[2][0] && mat[1][1] === mat[2][0]) {
    if (mat[0][2] === 'O') return 100 - depth;
    if (mat[0][2] === 'X') return depth - 100;
  }
  return 0;
}

function minmax(mat, depth, get_max) {
  if (hasMovesLeft(mat) === false) {
    return evaluate(mat, depth);    
  } 
  let val = evaluate(mat, depth);
  if (val !== 0) return val;
  if (get_max) {
    let best = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mat[i][j] === "") {
          mat[i][j] = 'O';
          best = Math.max(best, minmax(mat, depth+1, !get_max));
          mat[i][j] = "";
        }
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (mat[i][j] === "") {
          mat[i][j] = 'X';
          best = Math.min(best, minmax(mat, depth+1, !get_max));
          mat[i][j] = "";
        }
      }
    }
    return best;
  }
}

function find_best_move(squares) {
  let mat = arrayToMat(squares);
  let val, row = -1, col = -1, best = -Infinity;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mat[i][j] === "") {
        mat[i][j] = 'O';
        val = minmax(mat, 0, false);
        mat[i][j] = "";
        if (val > best) {
          best = val;
          row = i;
          col = j;
        }
      }
    }
  }
  return (3 * row) + col;
}

export default App;
