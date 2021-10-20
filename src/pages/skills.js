import React, {useCallback, useEffect, useRef, useState} from "react";
import '../index.css'
import { gsap } from "gsap";
import Marquee from "../components/marquee";


//Fisher-Yates Shuffle algorithm : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


const skills = ['Typescript', 'React', 'Svelte', 'Three.js', 'Golang', 'Python', 'Photoshop', 'Figma', 'Firebase', 'C', 'CSS', 'Flutter', 'Dart'];
const skills1 = shuffle(['Typescript', 'React', 'Svelte', 'Three.js', 'Golang', 'Python', 'Photoshop', 'Figma', 'Firebase', 'C', 'CSS', 'Flutter', 'Dart']);
const skills2 = shuffle(['Typescript', 'React', 'Svelte', 'Three.js', 'Golang', 'Python', 'Photoshop', 'Figma', 'Firebase', 'C', 'CSS', 'Flutter', 'Dart']);

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
        }, [y, scrollingUp]
    );

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);




    return (
        <div className=" relative w-screen overflow-x-hidden min-h-full max-w-full text-9xl bg-dark pt-14 pb-16">
            <Marquee direction={'forward'} key={1} skills={skills}/>
        </div>
    )
}

export default Skills;



