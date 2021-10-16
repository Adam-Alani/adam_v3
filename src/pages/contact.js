import React from "react";
import Board from "../components/Breakout/Board";

const Contact = () => {

    return (
        <>
            <div className="bg-dark hidden md:block">
                <Board />
            </div>
            <div className="md:hidden block px-8 font-Inter font-black text-5xl">
                Let's work on your next cool project together
            </div>
        </>


    )
};
export default Contact;
