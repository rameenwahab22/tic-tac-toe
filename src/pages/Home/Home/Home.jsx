import React, { useContext } from "react";
import { Container, Title, Subtitle } from "../../../styles/General.styled";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../../contexts/GameContext";
import { ModeButtons } from "./Home.styled";

function Home() {
  const navigate = useNavigate();
  const { startGame } = useContext(GameContext);

  const play = (mode) => {
    startGame(mode);
    navigate("/game-on");
  };

  return (
    <Container columnBased>
      <Title>TicTacToe</Title>
      <Subtitle>Choose a mode to start playing</Subtitle>
      <ModeButtons>
        <Button onClick={() => play("pvp")}>2 Players</Button>
        <Button onClick={() => play("cpu")}>Play vs Computer</Button>
      </ModeButtons>
    </Container>
  );
}

export default Home;
