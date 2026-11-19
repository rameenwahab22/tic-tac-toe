import React, { useContext } from "react";
import { CellStyle } from "./GameCell.styled";
import { GameContext } from "../../contexts/GameContext";
import { ReactComponent as IconX } from "../../assets/svgs/icon-x.svg";
import { ReactComponent as XIconOutline } from "../../assets/svgs/icon-x-outline.svg";
import { ReactComponent as IconO } from "../../assets/svgs/icon-o.svg";
import { ReactComponent as OIconOutline } from "../../assets/svgs/icon-o-outline.svg";

function GameCell({ cellItem, index, isWinningCell }) {
  const { handlePlayerMove, game } = useContext(GameContext);

  const isRoundOver = game.winningCombo.length > 0;
  const isComputerTurn = game.mode === "cpu" && game.turn === "o";
  const canPlay = !cellItem && !isRoundOver && !isComputerTurn;

  const cellClickHandler = () => {
    if (!canPlay) {
      return;
    }

    handlePlayerMove(index);
  };

  if (cellItem === "x") {
    return (
      <CellStyle isWinningCell={isWinningCell ?? false}>
        <IconX className="markedItem" />
      </CellStyle>
    );
  } else if (cellItem === "o") {
    return (
      <CellStyle isWinningCell={isWinningCell ?? false}>
        <IconO className="markedItem" />
      </CellStyle>
    );
  }

  return (
    <CellStyle onClick={canPlay ? cellClickHandler : undefined}>
      {game.turn === "x" ? (
        <XIconOutline className="outlineIcon" />
      ) : (
        <OIconOutline className="outlineIcon" />
      )}
    </CellStyle>
  );
}

export default GameCell;
