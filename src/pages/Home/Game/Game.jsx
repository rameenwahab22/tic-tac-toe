import React, { useContext, useEffect } from "react";
import { Container } from "../../../styles/General.styled";
import { GameBoardStyle } from "./Game.styled";
import GameCell from "../../../components/GameCell/GameCell";
import { GameContext } from "../../../contexts/GameContext";
import { ModalContext } from "../../../contexts/ModalContext";
import Player from "../../../components/Player/Player";
import RoundOverModal from "../../../components/Modal/RoundOverModal/RoundOverModal";

function Game() {
  const { game, computerMove } = useContext(GameContext);
  const { handleModal } = useContext(ModalContext);
  const roundOverKey = game.winningCombo.join(",");

  useEffect(() => {
    if (game.mode !== "cpu" || game.turn !== "o" || roundOverKey) {
      return;
    }

    const computerTurn = setTimeout(() => {
      computerMove();
    }, 400);

    return () => clearTimeout(computerTurn);
  }, [game.mode, game.turn, roundOverKey, computerMove]);

  useEffect(() => {
    if (!roundOverKey) {
      return;
    }

    const modalTimer = setTimeout(() => {
      handleModal(<RoundOverModal />);
    }, 2000);

    return () => clearTimeout(modalTimer);
  }, [roundOverKey, handleModal]);

  return (
    <Container>
      <Player
        player={game.player1}
        isPlayerActive={game.player1.choice === game.turn}
      />
      <GameBoardStyle>
        {game.board.map((item, index) => (
          <GameCell
            key={index}
            cellItem={item}
            index={index}
            isWinningCell={game.winningCombo.includes(index)}
          />
        ))}
      </GameBoardStyle>
      <Player
        player={game.player2}
        isPlayerActive={game.player2.choice === game.turn}
      />
    </Container>
  );
}

export default Game;
