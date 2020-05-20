import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./Board";
import Scores from "./Scores";




var winningOptions = [
  //horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6]
];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movesNumber: 0,
      currentPlayer: 'X',
      xPoints: 0,
      oPoints: 0,
      gameIsActive: true,
      changePossible: true,
      restartClickable: false,
      round: 1,
      gameBoard: ["", "", "", "", "", "", "", "", ""],
      msj: 'Playing . . .',
      table: [1, 2, 3, 4, 5],
      currentXresult: [0,0,0,0,0],
      currentOresult: [0,0,0,0,0]
    };

    this.btnClickedHandler = this.btnClickedHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);
    this.addwinner = this.addwinner.bind(this);

  }


  addwinner() {
    const { currentPlayer, round} = this.state;
    this.setState({ msj: 'The Winner In Round # ' + this.state.round + '  is Player  ' + currentPlayer });
    if (round == 5) {
      this.displayFinalResult();
    }
  }

  addDraw = () => {
    const { round } = this.state;
    this.setState({ msj: 'It Is a Draw' });
    if (round == 5) {
      this.displayFinalResult();
    }
  }
  displayFinalResult = () => {
    const{xPoints,oPoints} = this.state;
    if (xPoints > oPoints) {
      this.setState({ msj: 'Congrats X - Good Job ! !' })
    }
    else if (oPoints > xPoints) {
      this.setState({ msj: 'Congrats O - Good Job ! !' })
    }
    else {
      this.setState({ msj: 'It is a DRAW . . Try Again : )' })
    }
  }

  btnClickedHandler(i) {
    const { currentPlayer, movesNumber } = this.state;
    if (this.state.gameBoard[i] !== "" || !this.state.gameIsActive)
      return;
    this.setOnBoard(currentPlayer, i);
    this.setState({ movesNumber: movesNumber + 1 });
    if (movesNumber > 3) {
      this.checkResult();
    }
    this.swapPlayer();
  }

  resetHandler() {
    //reset the board
    const { round, xPoints, oPoints } = this.state;
    let tmpRound = round, xPoint = xPoints, oPoint = oPoints;
    if (tmpRound == 5) {
      tmpRound = 1;
      xPoint = 0;
      oPoint = 0;
      this.setState({currentXresult:[0,0,0,0,0], currentOresult:[0,0,0,0,0]})
    }
    else {
      tmpRound++;
    }
    if (this.state.restartClickable) {
      this.setState({
        movesNumber: 0,
        currentPlayer: 'X',
        xPoints: xPoint,
        oPoints: oPoint,
        gameIsActive: true,
        changePossible: true,
        restartClickable: false,
        round: tmpRound,
        gameBoard: ["", "", "", "", "", "", "", "", ""],
        msj: 'Playing . . .',
        table: [1, 2, 3, 4, 5],
      })
    }
  }

  checkResult = () => {
    const { xPoints, oPoints, currentPlayer, gameBoard,round,currentXresult,currentOresult } = this.state;
    let isThereWinner = false;
    for (let i = 0; i < winningOptions.length; i++) {
      const winOption = winningOptions[i];
      let firstCellInOption = gameBoard[winOption[0]];
      let secondCellInOption = gameBoard[winOption[1]];
      let thirdCellInOption = gameBoard[winOption[2]];
      if (firstCellInOption === '' || secondCellInOption === '' || thirdCellInOption === '') {
        continue;
      }
      if (firstCellInOption === secondCellInOption && secondCellInOption === thirdCellInOption) {
        isThereWinner = true;
        break
      }
    }//end for loop

    if (isThereWinner) {
      let i = round-1;
      if (currentPlayer == 'X') {
        currentXresult[i]=1;
        this.setState({ xPoints: xPoints + 1 ,currentXresult })
      } else {
        currentOresult[i]=1;
        this.setState({ oPoints: oPoints + 1  ,currentOresult})
      }
      this.setState({ restartClickable: true, gameIsActive: false })
      this.addwinner();
      return;
    }
    let isDraw = !gameBoard.includes("");
    if (isDraw) {
      this.setState({ restartClickable: true, changePossible: false, gameIsActive: false });
      this.addDraw();
      return;
    }
  }

  swapPlayer = () => {
    const { currentPlayer } = this.state;
    if (currentPlayer === 'X')
      this.setState({ currentPlayer: 'O' });
    else {
      this.setState({ currentPlayer: 'X' });
    }
  }

  setOnBoard = (symbole, i) => {
    const { gameBoard } = this.state;
    gameBoard[i] = symbole;
    this.setState({ gameBoard });
  }


  render() {
    const { currentPlayer, gameBoard, msj, round, table, currentXresult, currentOresult } = this.state;
    return (
      <div id="main">
        <div className="container">
          <div className="row d-flex">
            <div className="col-md-4 col-sm-12">
              <div>
                <div id="turnsBoardUpdates">
                  <div>{msj}</div>
                </div>
                <div id="round">Round #{round}</div>
                <div id="firstPlayer" className={`x ${currentPlayer === 'X' ? 'active' : ''}`}> Player X - 1</div>
                <div id="secondPlayer" className={`o ${currentPlayer === 'O' ? 'active' : ''}`}> Player O - 2</div>
                <table id="scoreTable" border="1" className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th id="score">X Player</th>
                      <th id="score">O Player</th>
                    </tr>
                  </tbody>
                  <tbody>
                    {
                      table.map((row, i) => {
                        return (<Scores i={row} round={row} p1={currentXresult[i]} p2={currentOresult[i]}></Scores>)
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="container-fluid text-center" id="box">
                <h1 id="h1">Tic Tac Toe </h1>
                <div id="message"></div>
                <ul id="gameBoard" >
                  {gameBoard.map((cell, i) => {
                    return (<Board i={i} key={i} onbtnClickedHandler={this.btnClickedHandler} cell={cell} />)
                  })}
                </ul>
                <footer>
                  <h2 className="game--status"></h2>
                  <button id="reset" className="game--restart" onClick={this.resetHandler}>Play Again</button>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
