import React, {useCallback, useEffect, useRef, useState} from "react";
import '../index.css'
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Marquee from "../components/marquee";


// //Fisher-Yates Shuffle algorithm : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// function shuffle(array) {
//     let currentIndex = array.length,  randomIndex;
//
//     // While there remain elements to shuffle...
//     while (currentIndex !== 0) {
//
//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//
//         // And swap it with the current element.
//         [array[currentIndex], array[randomIndex]] = [
//             array[randomIndex], array[currentIndex]];
//     }
//
//     return array;
// }


const skills = ['React', 'Three.js', 'Golang', 'Python', 'Firebase', 'C', 'CSS', 'Flutter', 'Dart' , 'Photoshop', 'Figma'];
// const skills1 = shuffle(['Typescript', 'React', 'Svelte', 'Three.js', 'Golang', 'Python', 'Photoshop', 'Figma', 'Firebase', 'C', 'CSS', 'Flutter', 'Dart']);
// const skills2 = shuffle(['Typescript', 'React', 'Svelte', 'Three.js', 'Golang', 'Python', 'Photoshop', 'Figma', 'Firebase', 'C', 'CSS', 'Flutter', 'Dart']);

const Skills = () => {

    const marqueeRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger)

    useEffect(() => {
        gsap.to(".forward", {
            x: -500,
            duration: 2.5,
            scrollTrigger: {
                trigger: ".forward",
                start: " bottom",
                end: " ",
                scrub: true
            }
        })
    }, [])

    return (
        <div className=" relative w-screen overflow-x-hidden min-h-full max-w-full text-9xl bg-dark  pb-16">
            <Marquee ref={marqueeRef} direction={'forward'} key={1} skills={skills}/>
        </div>
    )
}

export default Skills;



