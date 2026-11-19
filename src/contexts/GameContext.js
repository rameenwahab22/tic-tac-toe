import { createContext, useCallback, useState } from "react";
import { genConfig } from "react-nice-avatar";
import { checkForWinner, pickRandomEmptyCell } from "../utils/GameUtils";

export const GameContext = createContext({});

const createPlayer = (choice, name, color) => ({
  choice,
  name,
  score: 0,
  color,
  avatarConfig: genConfig(),
});

const createInitialGame = (mode = "pvp") => ({
  board: [null, null, null, null, null, null, null, null, null],
  player1: createPlayer("x", "Player1", "#8437f9"),
  player2: createPlayer("o", mode === "cpu" ? "Computer" : "Player2", "#f9c811"),
  turn: "x",
  roundWinner: "",
  winningCombo: [],
  mode,
});

const isRoundOver = (game) => game.winningCombo.length > 0;

const toggleChoice = (choice) => (choice === "x" ? "o" : "x");

const completeRoundState = (prev, board, result) => {
  let next = { ...prev, board };

  if (result === "draw") {
    next = {
      ...next,
      player1: {
        ...prev.player1,
        score: prev.player1.score + 0.5,
      },
      player2: {
        ...prev.player2,
        score: prev.player2.score + 0.5,
      },
      roundWinner: "",
      winningCombo: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };
  } else {
    const winningMark = board[result[0]];
    const winnerKey =
      winningMark === prev.player1.choice ? "player1" : "player2";
    const winner = {
      ...prev[winnerKey],
      score: prev[winnerKey].score + 1,
    };
    next = {
      ...next,
      [winnerKey]: winner,
      roundWinner: winner,
      winningCombo: result,
    };
  }

  next.turn = "x";

  if (prev.mode !== "cpu") {
    next.player1 = {
      ...next.player1,
      choice: toggleChoice(next.player1.choice),
    };
    next.player2 = {
      ...next.player2,
      choice: toggleChoice(next.player2.choice),
    };
  }

  return next;
};

const placeMark = (prev, index) => {
  if (isRoundOver(prev) || prev.board[index] !== null) {
    return { game: prev, result: null, moved: false };
  }

  const board = [...prev.board];
  board[index] = prev.turn;
  const result = checkForWinner(board);

  if (result) {
    return {
      game: completeRoundState(prev, board, result),
      result,
      moved: true,
    };
  }

  return {
    game: {
      ...prev,
      board,
      turn: prev.turn === "x" ? "o" : "x",
    },
    result: null,
    moved: true,
  };
};

export const GameContextProvider = (props) => {
  const [game, setGame] = useState(createInitialGame());

  const startGame = useCallback((mode) => {
    setGame(createInitialGame(mode));
  }, []);

  const handlePlayerMove = useCallback((index) => {
    setGame((prev) => {
      if (prev.mode === "cpu" && prev.turn !== "x") {
        return prev;
      }

      return placeMark(prev, index).game;
    });
  }, []);

  const computerMove = useCallback(() => {
    let selectedIndex = null;

    setGame((prev) => {
      if (prev.mode !== "cpu" || prev.turn !== "o" || isRoundOver(prev)) {
        return prev;
      }

      if (selectedIndex === null) {
        selectedIndex = pickRandomEmptyCell(prev.board);
      }

      if (selectedIndex === null) {
        return prev;
      }

      return placeMark(prev, selectedIndex).game;
    });
  }, []);

  const resetBoard = useCallback(() => {
    setGame((prev) => ({
      ...prev,
      board: [null, null, null, null, null, null, null, null, null],
      turn: "x",
      winningCombo: [],
      roundWinner: "",
    }));
  }, []);

  const restartGame = useCallback(() => {
    setGame((prev) => createInitialGame(prev.mode));
  }, []);

  return (
    <GameContext.Provider
      value={{
        game,
        startGame,
        handlePlayerMove,
        computerMove,
        resetBoard,
        restartGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
