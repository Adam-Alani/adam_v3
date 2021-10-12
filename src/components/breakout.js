import React, {createRef, useEffect, useRef, useState} from "react";
import useMousePosition from "../hooks/useMousePosition";
import useInterval from "../hooks/useInterval";
import useWindowSize from "../hooks/useWindowSize";
import useIntersection from "../hooks/useIntersection";

const width = window.innerWidth;
const height = window.innerHeight;

const init_ball = {
    x: width/2,
    y: height/2,
    radius: 8,
    speedY: 3,
    speedX: 0,
};
const init_paddle = {
    w: 100,
    h: 10,
    x: width / 2 - 50,
    y: height-10,
    speed: 5
};

const init_words = {
    x: 15,
    y: 15,
    // content:"I'm a developer and designer based in Paris, France. Currently studying computer science and actively looking for jobs and internships"
    content: "I'm a dev and shit yea trying out multiple lines please skip line "
}

//TODO use "webfont" to fix weird html bug

/*TODO: Change words render mechanism:
 1: one object with words positions, rectangles.
 2: on contact, replace word with n spaces and remove collision
 */

const Breakout = () => {


    const position = useMousePosition();
    const size = useWindowSize();

    const [playing, setPlaying] = useState(false);
    const [paddle, setPaddle] = useState({x: init_paddle.x, y: init_paddle.y});
    const [ball , setBall] = useState({x : init_ball.x, y: init_ball.y});
    const [ballSpeed, setBallSpeed] = useState({x: init_ball.speedX, y:init_ball.speedY})

    const [words, setWords] = useState(init_words.content)
    const [wordsBox, setWordsBox] = useState([]);

    const game = createRef(null);


    useEffect(() => {
        const context = game.current.getContext('2d');

        if (context != null) {
            const canvas = context.canvas;
            context.font = "30px mono";
            context.clearRect(0, 0, canvas.width , canvas.height)
            // Ball

            context.beginPath();
            context.arc(ball.x, ball.y, init_ball.radius, 0, Math.PI*2);
            context.fillStyle = "#fff";
            context.fill();

            // Paddle
            context.fillStyle = "#fff";
            context.fillRect(paddle.x, paddle.y, init_paddle.w, init_paddle.h);

            //Words
            // context.textAlign = "center"

            let lines = getLines(context, words, canvas.width*2/3)
            for (let i = 0 ; i < lines.length; i++) {
                // mapWords(context,lines[i],canvas.width/8 , canvas.height/4 + i*40 )
                context.fillText(lines[i], canvas.width/8, canvas.height/4 + i*40 )
            }
            mapWords(context,lines, canvas.width/8, canvas.height/4)

        }
    }, [ball, paddle, words,window.innerWidth, window.innerHeight,])

    function newGame() {
        setWords(init_words.content);
        setPaddle({x: position.x, y:init_paddle.y});
        setBall({x : init_ball.x, y: init_ball.y});
        setBallSpeed({x: init_ball.speedX, y:init_ball.speedY})
        setPlaying(true);
    }


    function getLines(ctx, text, maxWidth) {
        let words = text.split(" ");
        let lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            let word = words[i];
            let width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }


    function mapWords(ctx, lines, x ,y) {

        let wordsBB = [];

        for (let j = 0; j < lines.length; j++) {
            let input = lines[j]

            let canvasText = input.split(" ");
            // var length=ctx.measureText(canvasText[0]).width;
            //
            // wordsBB = [{
            //     x:x,
            //     y:y-16 ,
            //     w:length,
            //     h:16
            // }]

            let accumLength=0;
            for(let i=0;i<canvasText.length;i++){
                let length=ctx.measureText(" " + canvasText[i]).width;
                wordsBB.push({
                    x:accumLength+x,
                    y:y-16 + j * 40,
                    w:length,
                    h:16,
                    word: canvasText[i]
                });
                let bb = wordsBB.at(-1);
                ctx.strokeStyle = "#FF0000";
                ctx.strokeRect(bb.x,bb.y,bb.w,bb.h);
                accumLength+=length;
            }

        }
        setWordsBox(wordsBB)
    }

    // function mapWords(ctx, input, x , y) {
    //
    //
    //     let canvasText = input.split(" ");
    //     var wordsBB=new Array(canvasText.length);
    //     var length=ctx.measureText(canvasText[0]).width;
    //
    //     wordsBB[0]={
    //         x:x,
    //         y:y-16,
    //         w:length,
    //         h:16
    //     }
    //
    //     var accumLength=length;
    //     for(var i=1;i<canvasText.length;i++){
    //         var length=ctx.measureText(" " + canvasText[i]).width;
    //         wordsBB[i]={
    //             x:accumLength+x,
    //             y:y-16,
    //             w:length,
    //             h:16,
    //             word: canvasText[i]
    //         }
    //         accumLength+=length;
    //     }
    //     setWordsBox(prevWords => [...prevWords,wordsBB])
    //
    //     for(var i=0;i<canvasText.length;i++){
    //         var bb=wordsBB[i];
    //         ctx.strokeStyle = "#FF0000";
    //         ctx.strokeRect(bb.x,bb.y,bb.w,bb.h);
    //     }
    // }

    //TODO: Replace words with spaces inorder to not mess up spacing
    function destroyWord() {
        for (let i = 0; i < wordsBox.length; i++) {
            if (collision(ball, wordsBox[i])) {
                console.log(wordsBox[i]);
                console.log(words);
                // words.splice(i, 1);

                let newWords = words.replace(wordsBox[i].word," ".repeat(wordsBox[i].word.length) );
                console.log(newWords)

                setWordsBox(wordsBox.filter((_, el) => el !== i))
                setWords(newWords.toString())

                setBallSpeed(prevSpeed => ({
                    ...prevSpeed,
                    y: -prevSpeed.y
                }))
            }
        }
    }
    function collision(ball, obj2) {
        return ball.y+ballSpeed.y + init_ball.radius > obj2.y &&
            ball.y+ballSpeed.y - init_ball.radius < obj2.y + obj2.h &&
            ball.x+ballSpeed.x - init_ball.radius > obj2.x &&
            ball.x+ballSpeed.x + init_ball.radius < obj2.x + obj2.w;
    }
    // Consider each word as a rectange, eliminate rectangle on contact with ball.



    function move() {
        movePaddle();
        if (playing) {
            moveBall();

            // Check for loss
            if (ball.y > height) {
                setPlaying(false)
            }
            destroyWord()

            // Check for win
            // if (words.length < 1) {
            //     newGame();
            // }
        }
    }

    function movePaddle() {
        let dx = (position.x - (paddle.x+init_paddle.w/2)) * 0.125

        let newPosition = paddle.x + dx;

        if (newPosition > 0 && newPosition < size.width-100) {
            setPaddle(prevPaddle => ({
                ...prevPaddle,
                x: prevPaddle.x+=dx
            }))
        }
    }

    function moveBall() {

        // Ball movement
        let newY = ball.y + ballSpeed.y;
        let newX = ball.x + ballSpeed.x;

        setBall(prevBall => ({
            x: newX,
            y: newY,
        }))

        // Ball ceiling collision
        if (newY <= 0) {
            setBallSpeed( prevSpeed => ({
                ...prevSpeed,
                y: -prevSpeed.y
            }))
        }

        // Ball paddle collision
        if (newY + init_ball.radius >= paddle.y &&
            newX + init_ball.radius <= paddle.x+init_paddle.w &&
            newX - init_ball.radius >= paddle.x) {

            setBallSpeed( prevSpeed => ({
                ...prevSpeed,
                y: -prevSpeed.y
            }))

            let dx = newX - (paddle.x + init_paddle.w / 2)

            setBallSpeed( prevSpeed => ({
                ...prevSpeed,
                x: dx * 0.15
            }))
        }


        if (newX <= 0 || newX >= size.width) {

            setBallSpeed( prevSpeed => ({
                ...prevSpeed,
                x: -prevSpeed.x
            }))
        }
    }

    function handlePlay() {
        if (playing) {
            setPlaying(false)
        } else {
            setPlaying(true)
            newGame();
        }
    }

    useInterval(() => move(), 5)
    return (
        <div  style={{fontFamily: "recoleta"}} className="w-screen h-screen max-w-full relative ">
            <button onClick={handlePlay} className="absolute opacity-40 ab font-Work-Sans font-light left-1/2 top-1/2 ">click me!</button>
            <canvas ref={game} className="max-w-full border-b-4" width={window.innerWidth} height={window.innerHeight}/>
        </div>
    )
}
export default Breakout;
