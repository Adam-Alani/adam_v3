import React, { useRef} from "react";

const HoverableText = ({text, cursor, url}) => {

    const span = useRef();

    const hoverHandler = (e) => {
        const { offsetX: x, offsetY: y } = e.nativeEvent;
        const move = 25;
        const xMove = x / span.current.offsetWidth * (move * 2) - move;
        const yMove = y / span.current.offsetHeight * (move * 2) - move;

        cursor.current.style.opacity = '1';
        span.current.style.transform = `translate(${xMove}px, ${yMove}px)`;
    }

    const leave = () => {
        cursor.current.style.opacity = '0';
        span.current.style.transform = '';
    }



    return (
        <a href={url} target="_blank" rel="noopener noreferrer" onMouseMove={hoverHandler} onMouseLeave={leave} className="  hover-this w-min"><span className=" w-min hovered-text" ref={span}>{text}</span></a>
    )
}

export default HoverableText
