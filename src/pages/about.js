import React, {useEffect, useState} from "react";
import Breakout from "../components/Breakout";
import {Fade} from "react-awesome-reveal";
import { gsap, Power3 } from "gsap";
import useMousePosition from "../hooks/useMousePosition";


//TODO what if i made this into a pong game tho
const About = () => {

    const [inside, setInside] = useState(false);
    const {x, y, handleMouseMove} = useMousePosition()

    useEffect(() => {
        gsap.to(".target", {
            x:x,
            y:y,
            stagger: -0.02,
            ease: Power3,
        });
    });

    const enter = () => {
        setInside(true)
    }
    const leave = () => {
        setInside(false)
    }

    return (
        <>
            <div className={`absolute pointer-events-none text-white target transition ${inside ? ' opacity-100 ' : ' opacity-0'}`}>IMAGE OF ME</div>
            <div className={`absolute pointer-events-none text-white target transition ${inside ? ' opacity-100 ' : ' opacity-0'}`}>IMAGE OF ME</div>
            <div className={`absolute pointer-events-none text-white target transition ${inside ? ' opacity-100 ' : ' opacity-0'}`}>IMAGE OF ME</div>
            <div className={`absolute pointer-events-none text-white target transition ${inside ? ' opacity-100 ' : ' opacity-0'}`}>IMAGE OF ME</div>
            <div className={`absolute pointer-events-none text-white target transition ${inside ? ' opacity-100 ' : ' opacity-0'}`}><span>IMAGE OF ME</span></div>

            <div className="flex flex-row border-t-4 border-white">
                <section  className="py-24 pl-4 sm:pl-16 md:pl-32 lg:pl-56   text-4xl  w-screen h-screen max-w-full">
                    <Fade triggerOnce cascade>
                        <div className="font-Work-Sans flex flex-col justify-start items-start ">
                            <p className=" font-medium">Hey, I'm</p>
                            <p className=" text-8xl lg:text-9xl font-bold transition hover:text-primary ">Adam</p>
                            <br/>
                        </div>
                        <div className="font-Recoleta">
                            <p>I'm a developer and designer based in Paris, France.</p>
                            <p className="pt-4">Currently studying computer science and actively looking for jobs and internships</p>
                        </div>
                    </Fade>
                </section>
                <div onMouseMove={handleMouseMove} onMouseEnter={enter} onMouseLeave={leave}  className=" md:w-2/3 bg-red-400">

                </div>
            </div>
        </>
    )
}

export default About;
