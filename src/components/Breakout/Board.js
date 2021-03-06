import React, {useEffect, useRef} from "react";
import { BallMovement } from "./BallMovement";
import data from "./data";
import WallCollision from "./util/WallCollision";
import Paddle from "./Paddle";
import Words from "./Words";
import BrickCollision from "./util/BrickCollision";
import PaddleHit from "./util/PaddleHit";
import AllBroken from "./util/AllBroke";
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
    playing = false;
  }


  const handlePlay = () => {
    const start = !playing;
    if (start) {
      playing = start;
      ballObj.x = size.width/2;
      ballObj.y = size.height/3;
    }
  }

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");

        ctx.font = "900 90px Inter ";
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
            ctx.fillText(bb.word, bb.x, bb.y + 60 )
            // ctx.strokeRect(bb.x, bb.y, bb.w, bb.h )
          }
        }


        // Handle Ball Movement
        BallMovement(ctx, ballObj, playing);



        // Check all broken

        //TODO: Score counter and finish congratulations
        if (AllBroken(words, canvas, ballObj)) {
          resetGame();
        }


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

      }
    };
    render();
  }, []);

  return (
    <div onClick={handlePlay} onMouseMove={(event) =>
        (paddleProps.x =
            event.clientX -
            paddleProps.width / 2 -
            10)}
         className="w-screen max-w-full relative overflow-x-hidden ">
      <p  style={{bottom:'0', right:'0', position:'absolute'}} className=" font-Inter font-light px-3 pb-1">*click anywhere</p>
      <canvas
        id="canvas"
        ref={canvasRef}
        className="border-b border-t"
        height={3*window.innerHeight/4}
        width={window.innerWidth}
      />
    </div>
  );
}
