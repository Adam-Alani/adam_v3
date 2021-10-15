import React, {useEffect, useRef} from "react";

const HoverableText = ({text, cursor, url}) => {

    const span = useRef();

    const hoverHandler = (e) => {
        const { offsetX: x, offsetY: y } = e.nativeEvent;
        // const move = 25;
        // const xMove = x / e.screenX * (move * 2) - move;
        // const yMove = y / e.screenY * (move * 2) - move;
        // console.log(x)
        const move = 25;
        const xMove = x / span.current.offsetWidth * (move * 2) - move;
        const yMove = y / span.current.offsetHeight * (move * 2) - move;
        console.log(xMove)
        cursor.current.style.opacity = '1';
        span.current.style.transform = `translate(${xMove}px, ${yMove}px)`;
    }

    const leave = (e) => {
        cursor.current.style.opacity = '0';
        span.current.style.transform = '';
    }



    return (
        <a href="#" onMouseMove={hoverHandler} onMouseLeave={leave} className="  hover-this w-min"><span className=" w-min hovered-text" ref={span}>{text}</span></a>
    )
}

export default HoverableText
