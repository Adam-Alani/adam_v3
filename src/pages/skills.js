import React, {useCallback, useEffect, useRef, useState} from "react";
import '../index.css'
import { gsap } from "gsap";
import Marquee from "../components/marquee";


const Skills = () => {

    const animationTween = useRef(null);
    const backwardTween = useRef(null);

    const factor = 0.5;


    useEffect(() => {
        let tween = gsap.to(".forward", {xPercent: -100, repeat: -1, duration: 10, ease: "linear",
        }).totalProgress(0.5);
        let reverse = gsap.to(".backwards", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);
        gsap.set(".marquee__inner", {xPercent: -50});


        animationTween.current = tween;
        backwardTween.current = reverse;
        gsap.to(backwardTween.current, {
            timeScale: -factor
        }).play();

        return () => {
            backwardTween.current.kill();
            animationTween.current.kill();
        }
    }, [])




    const [y, setY] = useState(window.scrollY);
    const [scrollingUp, setScrollingUp] = useState(false)

    const handleNavigation = useCallback(
        e => {
            const window = e.currentTarget;
            if (y > window.scrollY && !scrollingUp) {
                setScrollingUp(true)
                gsap.to(animationTween.current, {
                    timeScale: factor
                }).play();

                gsap.to(backwardTween.current, {
                    timeScale: -factor
                }).play();

            } else if (y < window.scrollY && scrollingUp) {
                setScrollingUp(false)
                gsap.to(animationTween.current, {
                    timeScale: -factor
                }).play();

                gsap.to(backwardTween.current, {
                    timeScale: factor
                }).play();
            }

            setY(window.scrollY);
        }, [y]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);



    return (
        <div className=" relative w-screen overflow-x-hidden min-h-full  max-w-full text-9xl bg-dark border-t-4 border-white pt-14 pb-16">
            <Marquee direction={'forward'}/>
            <Marquee direction={'backwards'}/>
            <Marquee direction={'forward'}/>
        </div>
    )
}

export default Skills;



