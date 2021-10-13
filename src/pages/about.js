import React, {useEffect} from "react";
import Breakout from "../components/Breakout";



//TODO what if i made this into a pong game tho
const About = () => {

    return (
        <div  className="text-4xl w-screen max-w-full relative">
            <div className="">
                <Breakout/>
            </div>
        </div>
    )
}

export default About;
