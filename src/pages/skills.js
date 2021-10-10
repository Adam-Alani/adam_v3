import React, {useCallback, useEffect, useRef, useState} from "react";
import '../index.css'
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Marquee from "../components/marquee";


const Skills = () => {

    const animationTween = useRef(null);
    const backwardTween = useRef(null);

    const factor = 0.5;

    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }

    useEffect(() => {


        gsap.registerPlugin(ScrollTrigger);
        let tween = gsap.to(".forward", {xPercent: -100, repeat: -1, duration: 10, ease: "linear",   scrollTrigger: {
                trigger: ".forward",
                pin: true,
                start: 'top top',
                end: "+=10000",
                onUpdate: self => {

                    let velo = self.getVelocity();
                    let speed = velo*0.01;

                    console.log(speed)

                    // if (self.direction > 0 ) {
                    //     gsap.to(animationTween.current, {timeScale: -1.5, duration:1})
                    // } else if (self.direction < 0 ) {
                    //     gsap.to(animationTween.current, {timeScale: 1.5, duration:1})
                    // }

                    if (self.direction > 0 ) {
                        animationTween.current.timeScale(-1.5)
                        ScrollTrigger.addEventListener("scrollEnd", function() {
                            animationTween.current.timeScale(-0.5)
                        });
                    } else if (self.direction < 0 ) {
                        animationTween.current.timeScale(1.5);
                        ScrollTrigger.addEventListener("scrollEnd", function() {
                            animationTween.current.timeScale(0.5)
                        });
                    }


                }
            }}).totalProgress(0.5);
        let reverse = gsap.to(".backwards", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);
        gsap.set(".marquee__inner", {xPercent: -50});

        animationTween.current = tween;
        backwardTween.current = reverse;

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
        <div className="h-screen relative w-screen overflow-x-hidden min-h-full  max-w-full text-9xl">



            <Marquee direction={'forward'}/>
            <Marquee direction={'backwards'}/>
            <Marquee direction={'forward'}/>



        </div>
    )
}

export default Skills;


// import React, {useCallback, useEffect, useRef, useState} from "react";
// import '../index.css'
// import { gsap } from "gsap";
//
//
// const Skills = () => {
//
//     const animationTween = useRef(null);
//     const backwardTween = useRef(null);
//
//     let tween;
//
//     useEffect(() => {
//
//         let tween = gsap.to(".forward", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);
//         let reverse = gsap.to(".backward", {xPercent: -100, repeat: -1, duration: 10, ease: "linear"}).totalProgress(0.5);
//         gsap.set(".marquee__inner", {xPercent: -50});
//
//         animationTween.current = tween;
//         backwardTween.current = reverse;
//
//         return () => {
//             backwardTween.current.kill();
//             animationTween.current.kill();
//         }
//     }, [])
//
//
//
//
//     const [y, setY] = useState(window.scrollY);
//     const [scrollingUp, setScrollingUp] = useState(false)
//
//     const handleNavigation = useCallback(
//         e => {
//             const window = e.currentTarget;
//             if (y > window.scrollY && !scrollingUp) {
//                 setScrollingUp(true)
//                 gsap.to(animationTween.current, {
//                     timeScale: 0.5
//                 }).play();
//
//                 gsap.to(backwardTween.current, {
//                     timeScale: -0.5
//                 }).play();
//
//             } else if (y < window.scrollY && scrollingUp) {
//                 setScrollingUp(false)
//                 gsap.to(animationTween.current, {
//                     timeScale: -0.5
//                 }).play();
//
//                 gsap.to(backwardTween.current, {
//                     timeScale: 0.5
//                 }).play();
//
//             }
//             setY(window.scrollY);
//         }, [y]
//     );
//
//     useEffect(() => {
//         setY(window.scrollY);
//         window.addEventListener("scroll", handleNavigation);
//
//         return () => {
//             window.removeEventListener("scroll", handleNavigation);
//         };
//     }, [handleNavigation]);
//
//
//
//
//     return (
//         <div className="h-screen relative w-screen overflow-x-hidden min-h-full  max-w-full text-9xl">
//
//             <section className="marquee">
//                 <div className="marquee__inner" aria-hidden="true">
//                     <div className="marquee__part forward">
//                         TypeScript - React - Svelte - Three.js - Golang - Python - Photoshop - Figma - Firebase -
//                     </div>
//                     <div className="marquee__part forward">
//                         TypeScript - React - Svelte - Three.js - Golang - Python - Photoshop - Figma - Firebase -
//                     </div>
//                     <div className="marquee__part forward">
//                         TypeScript - React - Svelte - Three.js - Golang - Python - Photoshop - Figma - Firebase -
//                     </div>
//                     <div className="marquee__part forward">
//                         TypeScript - React - Svelte - Three.js - Golang - Python - Photoshop - Figma - Firebase -
//                     </div>
//                 </div>
//             </section>
//
//             <section className="marquee">
//                 <div className="marquee__inner" aria-hidden="true">
//                     <div className="marquee__part backward">
//                         Photoshop - Figma - Firebase - TypeScript - React - Svelte - Three.js - Golang - Python -
//                     </div>
//                     <div className="marquee__part backward">
//                         Photoshop - Figma - Firebase - TypeScript - React - Svelte - Three.js - Golang - Python -
//                     </div>
//                     <div className="marquee__part backward">
//                         Photoshop - Figma - Firebase - TypeScript - React - Svelte - Three.js - Golang - Python -
//                     </div>
//                     <div className="marquee__part backward">
//                         Photoshop - Figma - Firebase - TypeScript - React - Svelte - Three.js - Golang - Python -
//                     </div>
//                 </div>
//             </section>
//
//
//             <section className="marquee">
//                 <div className="marquee__inner" aria-hidden="true">
//                     <div className="marquee__part forward">
//                         Three.js - Golang - Python - Photoshop - Figma - Firebase - TypeScript - React - Svelte -
//                     </div>
//                     <div className="marquee__part forward">
//                         Three.js - Golang - Python - Photoshop - Figma - Firebase - TypeScript - React - Svelte -
//                     </div>
//                     <div className="marquee__part forward">
//                         Three.js - Golang - Python - Photoshop - Figma - Firebase - TypeScript - React - Svelte -
//                     </div>
//                     <div className="marquee__part forward">
//                         Three.js - Golang - Python - Photoshop - Figma - Firebase - TypeScript - React - Svelte -
//                     </div>
//                 </div>
//             </section>
//
//         </div>
//     )
// }
//
// export default Skills;
