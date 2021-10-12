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
    content:"I'm a developer and designer based in Paris, France. Currently studying computer science and actively looking for jobs and internships"
}

//TODO use "webfont" to fix weird html bug
const Breakout = () => {


    const position = useMousePosition();
    const size = useWindowSize();

    const [playing, setPlaying] = useState(false);
    const [paddle, setPaddle] = useState({x: init_paddle.x, y: init_paddle.y});
    const [ball , setBall] = useState({x : init_ball.x, y: init_ball.y});
    const [ballSpeed, setBallSpeed] = useState({x: init_ball.speedX, y:init_ball.speedY})

    const [words, setWords] = useState(init_words.content)

    const game = createRef(null);


    useEffect(() => {
        const context = game.current.getContext('2d');

        if (context != null) {
            const canvas = context.canvas;
            context.font = "30px recoleta";
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
                context.fillText(lines[i], canvas.width/2, canvas.height/4 + i*40 )
            }
            mapWords(context,canvas.width/2, canvas.height/4 + 40 )
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


    function collision(obj1, obj2) {
        if(obj1 != ball){
            if(obj1.y >= obj2.y &&
                obj1.y <= obj2.y+obj2.h &&
                obj1.x >= obj2.x &&
                obj1.x <= obj2.x+obj2.w){
                return true
            }
        }else{
            if(obj1.y+obj1.radius >= obj2.y &&
                obj1.y-obj1.radius <= obj2.y+obj2.h &&
                obj1.x-obj1.radius >= obj2.x &&
                obj1.x+obj1.radius <= obj2.x+obj2.w){
                return true
            }
        }
    }
    // Consider each word as a rectange, eliminate rectangle on contact with ball.

    function mapWords(ctx, x , y) {



        var text="I'm a developer and designer based in...";

        var words=text.split(" ");
        var wordsBB=new Array(words.length);

        ctx.font="14px arial";

        var length=ctx.measureText(words[0]).width;

        wordsBB[0]={
            x:0,
            y:0,
            width:length,
            height:16
        }

        var accumLength=length;
        for(var i=1;i<words.length;i++){
            var length=ctx.measureText(" "+words[i]).width;
            wordsBB[i]={
                x:accumLength,
                y:0,
                width:length,
                height:16
            }
            accumLength+=length;
        }

        ctx.fillText(text,50,15);
        ctx.lineWidth=0.50;

        for(var i=0;i<words.length;i++){
            var bb=wordsBB[i];
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(50+bb.x,bb.y,bb.width,bb.height);
        }
    }
    function destroyWord() {
        for (let i = 0; i < words.length; i++) {
            if (collision(ball, words[i])) {

                words.splice(i, 1);
                ball.speedY = -ball.speedY;

            }
        }
    }



    function move() {
        movePaddle();
        if (playing) {
            moveBall();

            // Check for loss
            if (ball.y > height) {
                setPlaying(false)
            }

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
        <div  style={{fontFamily: "recoleta"}} className="w-screen h-screen min-w-full ">
            <button onClick={handlePlay} className="opacity-40 fixed">Click me</button>
            <canvas ref={game} width={window.innerWidth} height={window.innerHeight}/>
        </div>
    )
}
export default Breakout;

//
// import React, {createRef, useEffect, useRef, useState} from "react";
// import useMousePosition from "../hooks/useMousePosition";
// import useInterval from "../hooks/useInterval";
// import useWindowSize from "../hooks/useWindowSize";
//
// const PureCanvas = React.forwardRef((props, ref) => <canvas ref={ref} />);
//
//
// const width = window.innerWidth;
// const height = window.innerHeight;
//
// const init_ball = {
//     x: width/2,
//     y: height/2,
//     radius: 8,
//     speedY: 2.5,
//     speedX: 0,
// };
// const init_paddle = {
//     w: 100,
//     h: 10,
//     x: width / 2 - 50,
//     y: height-10,
//     speed: 5
// };
//
// const init_words = {
//     x: 15,
//     y: 15,
//     content:"I'm a developer and designer based in Paris, France. Currently studying computer science and actively looking for jobs and internships"
// }
//
// function getLines(ctx, text, maxWidth) {
//     let words = text.split(" ");
//     let lines = [];
//     let currentLine = words[0];
//
//     for (let i = 1; i < words.length; i++) {
//         let word = words[i];
//         let width = ctx.measureText(currentLine + " " + word).width;
//         if (width < maxWidth) {
//             currentLine += " " + word;
//         } else {
//             lines.push(currentLine);
//             currentLine = word;
//         }
//     }
//     lines.push(currentLine);
//     return lines;
// }
//
//
// function draw(context, ball, paddle, words ) {
//
//     if (context != null) {
//
//         const canvas = context.canvas;
//         context.font = "30px recoleta";
//         context.clearRect(0, 0, canvas.width , canvas.height)
//         // Ball
//         context.beginPath();
//         context.arc(ball.x, ball.y, init_ball.radius, 0, Math.PI*2);
//         context.fillStyle = "#fff";
//         context.fill();
//
//         // Paddle
//         context.fillStyle = "#fff";
//         context.fillRect(paddle.x, paddle.y, init_paddle.w, init_paddle.h);
//
//         //Words
//         context.textAlign = "center"
//
//         let lines = getLines(context, words, canvas.width*2/3)
//         for (let i = 0 ; i < lines.length; i++) {
//             context.fillText(lines[i], canvas.width/2, canvas.height/4 + i*40 )
//         }
//         requestAnimationFrame(() => draw(context, ball, paddle, words));
//     }
// }
//
//
// //TODO use "webfont" to fix weird html bug
// const Breakout = () => {
//
//
//     const position = useMousePosition();
//     const size = useWindowSize();
//
//     const [playing, setPlaying] = useState(false);
//     const [paddle, setPaddle] = useState({x: size.width-10, y: size.height});
//     const [ball , setBall] = useState({x : init_ball.x, y: init_ball.y});
//     const [ballSpeed, setBallSpeed] = useState({x: init_ball.speedX, y:init_ball.speedY})
//
//     const [words, setWords] = useState(init_words.content)
//
//     const game = useRef();
//
//
//     useEffect(() => {
//         const context = game.current.getContext('2d');
//         requestAnimationFrame(() => draw(context,ball,paddle,words))
//
//         const handleResize = e => {
//             context.canvas.height = window.innerHeight;
//             context.canvas.width = window.innerWidth;
//         };
//
//         handleResize();
//         window.addEventListener("resize", handleResize);
//
//         return () => window.removeEventListener("resize", handleResize);
//
//     }, [])
//
//     function newGame() {
//         setWords(init_words.content);
//         setPaddle({x: position.x, y:init_paddle.y});
//         setBall({x : init_ball.x, y: init_ball.y});
//         setBallSpeed({x: init_ball.speedX, y:init_ball.speedY})
//         setPlaying(true);
//     }
//     function collision(obj1, obj2) {
//         if(obj1 != ball){
//             if(obj1.y >= obj2.y &&
//                 obj1.y <= obj2.y+obj2.h &&
//                 obj1.x >= obj2.x &&
//                 obj1.x <= obj2.x+obj2.w){
//                 return true
//             }
//         }else{
//             if(obj1.y+obj1.radius >= obj2.y &&
//                 obj1.y-obj1.radius <= obj2.y+obj2.h &&
//                 obj1.x-obj1.radius >= obj2.x &&
//                 obj1.x+obj1.radius <= obj2.x+obj2.w){
//                 return true
//             }
//         }
//     }
//     // Consider each word as a rectange, eliminate rectangle on contact with ball.
//     function destroyWord() {
//         for (let i = 0; i < words.length; i++) {
//             if (collision(ball, words[i])) {
//
//                 words.splice(i, 1);
//                 ball.speedY = -ball.speedY;
//
//             }
//         }
//     }
//
//
//
//     function move() {
//         if (playing) {
//             movePaddle();
//             moveBall();
//
//             // Check for loss
//             if (ball.y > height) {
//                 setPlaying(false)
//             }
//
//             // Check for win
//             // if (words.length < 1) {
//             //     newGame();
//             // }
//         }
//     }
//
//     function movePaddle() {
//         let dx = (position.x - (paddle.x+init_paddle.w/2)) * 0.125
//
//         let newPosition = paddle.x + dx;
//
//         if (newPosition > 0 && newPosition < size.width-100) {
//             setPaddle(prevPaddle => ({
//                 ...prevPaddle,
//                 x: prevPaddle.x+=dx
//             }))
//         }
//     }
//
//     function moveBall() {
//
//         // Ball movement
//         let newY = ball.y + ballSpeed.y;
//         let newX = ball.x + ballSpeed.x;
//
//         setBall(prevBall => ({
//             x: newX,
//             y: newY,
//         }))
//
//         // Ball ceiling collision
//         if (newY <= 0) {
//             setBallSpeed( prevSpeed => ({
//                 ...prevSpeed,
//                 y: -prevSpeed.y
//             }))
//         }
//
//         // Ball paddle collision
//         if (newY + init_ball.radius >= paddle.y &&
//             newX + init_ball.radius <= paddle.x+init_paddle.w &&
//             newX - init_ball.radius >= paddle.x) {
//
//             setBallSpeed( prevSpeed => ({
//                 ...prevSpeed,
//                 y: -prevSpeed.y
//             }))
//
//             let dx = newX - (paddle.x + init_paddle.w / 2)
//
//             setBallSpeed( prevSpeed => ({
//                 ...prevSpeed,
//                 x: dx * 0.15
//             }))
//         }
//
//
//         if (newX <= 0 || newX >= size.width) {
//
//             setBallSpeed( prevSpeed => ({
//                 ...prevSpeed,
//                 x: -prevSpeed.x
//             }))
//         }
//     }
//
//     function handlePlay() {
//         if (playing) {
//             setPlaying(false)
//         } else {
//             setPlaying(true)
//             newGame();
//         }
//     }
//
//     return (
//         <div  style={{fontFamily: "recoleta"}} className="w-screen h-screen max-w-full ">
//             <button onClick={handlePlay} className="opacity-40 fixed">Click me</button>
//             <PureCanvas ref={game} className="w-screen h-screen max-w-full " width={window.innerWidth} height={window.innerHeight}/>
//         </div>
//     )
// }
// export default Breakout;