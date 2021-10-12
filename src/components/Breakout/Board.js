import React, {useEffect, useRef, useState} from "react";
import { BallMovement } from "./BallMovement";
import data from "./data";
import WallCollision from "./util/WallCollision";
import Paddle from "./Paddle";
import Words from "./Words";
import BrickCollision from "./util/BrickCollision";
import PaddleHit from "./util/PaddleHit";
import AllBroken from "./util/AllBroke";
import ResetBall from "./util/ResetBall";
import useWindowSize from "../../hooks/useWindowSize";

let words = [];
let { ballObj, paddleProps, about } = data;
let playing = false;

export default function Board() {
  const canvasRef = useRef(null);


  const size = useWindowSize();
  ballObj.x = size.width/2;
  ballObj.y = size.height/3;

  const resetGame = () => {
    words = [];
    ballObj.x = size.width/2;
    ballObj.y = size.height/3;
    playing = false;
  }


  const handlePlay = () => {
    const newState = !playing;
    if (newState === false) {
      resetGame();
    } else {
      playing = true;
    }
  }

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.font = "30px mono";
      ctx.fillStyle = "#fff";

      paddleProps.y = canvas.height - 30;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Assign and draw Words
      let newBrickSet = Words(about.content, words, canvas, ctx);


      //TODO:
      if (newBrickSet && newBrickSet.length > 0) {
        words = newBrickSet;
      }

      for (let i = 0 ; i < words.length; i++) {
        let bb = words[i];
        if (!bb.broke) {
          ctx.fillText(bb.word, bb.x, bb.y + 16 )
        }
      }


      // Handle Ball Movement
      BallMovement(ctx, ballObj, playing);



      // Check all broken

      //TODO: Score counter and finish congratulations
      AllBroken(words, canvas, ballObj);


      // Ball and Wall Collision
      let alive = WallCollision(ballObj, canvas, paddleProps, playing);
      if (!alive) {
        resetGame();
      }


      // Words Collision
      let wordCollision;

      for (let i = 0; i < words.length; i++) {
        wordCollision = BrickCollision(ballObj, words[i]);

        if (wordCollision.hit && !words[i].broke) {
          // console.log(brickCollision);
          if (wordCollision.axis === "X") {
            ballObj.dx *= -1;
            words[i].broke = true;
          } else if (wordCollision.axis === "Y") {
            ballObj.dy *= -1;
            words[i].broke = true;
          }
        }
      }
      Paddle(ctx, canvas, paddleProps);

      // Paddle + Ball Collision
      PaddleHit(ballObj, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <div onMouseMove={(event) =>
        (paddleProps.x =
            event.clientX -
            paddleProps.width / 2 -
            10)}
         className="w-screen max-w-full relative " style={{ textAlign: "center" }}>
      <button onClick={handlePlay} className="absolute opacity-40  font-Recoleta font-light px-9 left-1/2 top-1/2 ">click me!</button>
      <canvas
        id="canvas"
        ref={canvasRef}
        className="border-b-4"
        height={2*window.innerHeight/3}
        width={window.innerWidth}
      />
    </div>
  );
}
