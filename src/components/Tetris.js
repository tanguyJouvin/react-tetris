import React, { useState } from 'react';
 
import { createStage, checkCollision } from '../gameHelpers'; // need to import the stage cleared when the game begins

//styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

//Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';



const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const[player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const[stage, setStage] = useStage(player);

  const movePlayer = dir => {
    if(!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0})
    }
  }

  const startGame = () => {
    console.log('test');
    
    //Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
  }

  const drop = () => {
    if(!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false })
    } else {
      // GAME OVER
      if(player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0,y: 0, collided:true });
    }
  }

  const keyUp = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 40) {
        console.log("interval on");
        setDropTime(1000)
      }
    }
  }

  const dropPlayer = () => {
    console.log("interval off");
     // We don't need to run the interval when we use the arrow down to
    // move the tetromino downwards. So deactivate it for now.
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if(!gameOver) {
      if (keyCode === 37) { //37 is the left button on arrow keyboard
        movePlayer(-1);// -1 moves to the left of the screenff
      } else if (keyCode === 39) { //39 is the right button on arrow keyboard
        movePlayer(1);
      } else if (keyCode === 40) { //down button
        dropPlayer();
      } else if (keyCode === 38) { // up arrow
        playerRotate(stage, 1); // 1 is the direction to turn in clockwise, stage is for collision
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime)
  
  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          { gameOver ? (
            <Display
              gameOver={gameOver}
              text="Game Over"
            />
          ) : (
            <div>
              <Display text="score" />
              <Display text="rows" />
              <Display text="level" />
            </div>
          )}
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;

