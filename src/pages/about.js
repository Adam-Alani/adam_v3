import React, {useEffect} from "react";
import Breakout from "../components/Breakout";



//TODO what if i made this into a pong game tho
const About = () => {

    return (
        <div  className="text-4xl w-screen max-w-full bg-dark ">

            <div className="pt-28 relative">
                <div className="font-Work-Sans flex flex-col justify-start items-start left-1/8 top-0 absolute">
                    <p className=" font-medium">Hey, I'm</p>
                    <h1 className=" text-9xl font-bold  transition hover:text-primary">Adam</h1>
                    <hr/>
                </div>
                <div>
                    <Breakout/>
                </div>
                {/*<div className="font-Recoleta pt-16 w-1/2">*/}
                {/*    <p className="pb-8">I'm a developer and designer based in <span className="text-primary">Paris, France</span></p>*/}
                {/*    <p>Currently studying computer science and actively looking for jobs and internships</p>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default About;
