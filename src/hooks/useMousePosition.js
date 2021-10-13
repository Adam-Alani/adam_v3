import { useState, useEffect } from "react";

const useMousePosition = () => {
    const [state, setState] = useState({x: 0, y: 0})

    const handleMouseMove = e => {
        e.persist()
        setState(state => ({...state, x: e.clientX, y: e.clientY}))
    }
    return {
        x: state.x,
        y: state.y,
        handleMouseMove,
    }
};


export default useMousePosition;
