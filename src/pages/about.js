import React, {useEffect, useRef, useState} from "react";
import Breakout from "../components/Breakout";
import {Fade} from "react-awesome-reveal";
import { gsap, Power1, Quint } from "gsap";
import useMousePosition from "../hooks/useMousePosition";
import ProfilePic from "../assets/profile.png";
import {clamp} from "gsap/gsap-core";
import useWindowSize from "../hooks/useWindowSize";

const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;
const lerp = (a, b, n) => (1 - n) * a + n * b;
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY)    {
        posx = e.clientX + window.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + window.scrollTop + document.documentElement.scrollTop;
    }

    return { x : posx, y : posy }
};


//TODO what if i made this into a pong game tho
let mousePos = {x:0, y:0}
let mouseCache = mousePos;
let direction = {x: mouseCache.x-mousePos.x, y: mouseCache.y-mousePos.y};
let tl;
let animated ={
    x: {previous: 0, current: 0, amt: 0.08},
    y: {previous: 0, current: 0, amt: 0.08},
    rotation: {previous: 0, current: 0, amt: 0.08},
    brightness: {previous: 1, current: 1, amt: 0.08}
};
let first = true;

const About = () => {

    const requestRef = useRef()
    const imageRef = useRef();
    const el = useRef();
    const reveal = useRef();


    // const [mousePos, setMousePos] = useState({x:0, y:0})
    // const [mouseCache, setMouseCache] = useState({x:0, y:0})
    // const [direction, setDirection] = useState({x: mouseCache.x-mousePos.x, y: mouseCache.y-mousePos.y})

    const [inside, setInside] = useState(false);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(loopRender);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once

    const handleMouseMove = (e) => {
        mousePos = (getMousePos(e))
    }

    const enter = () => {

        console.log("Entered")
        gsap.killTweensOf(".image")
        tl = gsap.timeline({
            onStart: () => {
                // show the image element
                setInside(true)
                // set a high z-index value so image appears on top of other elements
            },
            startAt: {opacity: 0, scale: 1},
        })

            // animate the image element
            .to(".image",  {
                duration: 0.5,
                ease: 'Sine.easeOut',
                autoAlpha: 1,
                opacity: 1,
                scale: 1,
                // width: "100%",
                // startAt: {x: direction.x < 0 ? '100%': '-100%'},
                // x: '0%'
            }, 0);

        first = true;
        loopRender();
    }

    const leave = () => {
        // kill any current tweens
        gsap.killTweensOf(".image")


        tl = gsap.timeline({
            onComplete: () => {
                setInside(false)
            }
        }).to('.image', {
            duration: 1,
            ease: Power1.easeOut,
            opacity: 0
        }, 0.4).to('.image', {
            duration: 1,
            ease: Quint.easeOut,
            scale: 0.2
        }, 0.4)
        stopRendering();
    }


    const loopRender = () => {
        if ( !requestRef.current ) {
            requestRef.current = requestAnimationFrame(() => render());
        }
    }
    // stop the render loop animation (rAF)
    const stopRendering = () => {
        if ( requestRef.current ) {
            cancelAnimationFrame(requestRef.current);
            requestRef.current = undefined;
        }
    }

    //
    const render = () => {
        requestRef.current = undefined

        const mouseDistanceX = clamp(Math.abs(mouseCache.x - mousePos.x), 0, 100);
        // direction where the mouse is moving
        direction = {x: mouseCache.x-mousePos.x, y: mouseCache.y-mousePos.y};
        // updated cache values
        mouseCache = {x: mousePos.x, y: mousePos.y};

        animated.x.current = Math.abs(mousePos.x  - el.current.offsetLeft) - imageRef.current.offsetWidth /2;
        animated.y.current = Math.abs(mousePos.y  - el.current.offsetTop) - imageRef.current.offsetHeight * 1.5;

        animated.rotation.current = first ? 0 : map(mouseDistanceX,0,100,0,direction.x < 0 ? 60 : -60);

        animated.x.previous = first ? animated.x.current : lerp(animated.x.previous, animated.x.current, 0.3);
        animated.y.previous = first ? animated.y.current : lerp(animated.y.previous, animated.y.current, 0.3);

        animated.rotation.previous = first ? animated.rotation.current : lerp(animated.rotation.previous, animated.rotation.current, animated.rotation.amt);
        console.log(animated.y.current)
        gsap.set(".profile", {
            x:animated.x.previous ,
            y:animated.y.previous ,
            rotation: animated.rotation.previous,
            stagger: -0.05,
            // filter: `brightness(${this.animatableProperties.brightness.previous})`
        });
        first = false;
        loopRender();
    }

    return (
        <>
            {/*<div ref={reveal}  className={`profile hover-reveal w-96 `}>*/}
            {/*    <img ref={imageRef} src={ProfilePic} alt="Me!" className="image hover-reveal__img"/>*/}
            {/*</div>*/}
            {/*<div ref={reveal}  className={`profile hover-reveal w-96  `}>*/}
            {/*    <img ref={imageRef} src={ProfilePic} alt="Me!" className="image hover-reveal__img"/>*/}
            {/*</div>*/}
            {/*<div ref={reveal}  className={`profile hover-reveal w-96  `}>*/}
            {/*    <img ref={imageRef} src={ProfilePic} alt="Me!" className="image hover-reveal__img"/>*/}
            {/*</div>*/}
            {/*<div ref={reveal}  className={`profile hover-reveal w-96  `}>*/}
            {/*    <img ref={imageRef} src={ProfilePic} alt="Me!" className="image hover-reveal__img"/>*/}
            {/*</div>*/}
            <div ref={reveal}  className={`profile hover-reveal w-96  `}>
                <img ref={imageRef} src={ProfilePic} alt="Me!" className="image hover-reveal__img"/>
            </div>

            <div ref={el} onMouseMove={handleMouseMove} onMouseEnter={enter} onMouseLeave={leave}   className="flex flex-row border-t-4 border-white">
                <section  className="py-24 pl-4 sm:pl-16 md:pl-32 lg:pl-56   text-4xl  w-screen h-screen max-w-full">
                    <Fade triggerOnce cascade>
                        <div className="font-Work-Sans flex flex-col justify-start items-start ">
                            <p className='font-medium'>Hey, I'm</p>

                            <p className=" text-8xl lg:text-9xl font-bold transition hover:text-primary ">Adam</p>
                            <br/>
                        </div>
                        <div className="font-Recoleta">
                            <p>I'm a developer and designer based in Paris, France.</p>
                            <p className="pt-4">Currently studying computer science and actively looking for jobs and internships</p>
                        </div>
                    </Fade>
                </section>
                <div className=" md:w-2/3 ">

                </div>
            </div>
        </>
    )
}

export default About;
