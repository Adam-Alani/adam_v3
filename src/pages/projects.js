import React from 'react';
import Reveal, { Slide} from "react-awesome-reveal";
import Project from "../components/Project";
import Epiclass from "../assets/epiclass.png";
import Dysto from "../assets/dysto.png";
import Adam from "../assets/adamalani.png";
import Sudetekt from "../assets/sudetekt.png";
import {gsap} from "gsap";

const Projects = () => {


    return (
        <div className=" w-screen h-screen max-w-full bg-dark border-t-4 border-dark ">
            <div className="animate-reveal">
                <Reveal triggerOnce delay={100} keyframes={"reveal"}>
                    <h1 className="revealText sm:float-right text-5xl px-8 title font-Inter pointer-events-none ">PROJECTS</h1>
                </Reveal>
            </div>
            <div className="py-8 relative" >
                <Project img={Dysto} key={0} name={"Dysto"} category={"Design and Web"} description={"Fashion branding"} detailed={"Worked on the design and the development of Dysto, an upcoming fashion brand. Built on Firebase and React"}/>
                <Project img={Adam} key={3} name={"adamalani"} category={"Web dev"} description={"Personal portfolio"} detailed={"My old portfolio, made with Three.js, Svelte and alot of colors."}/>
                <Project img={Sudetekt} key={2} name={"Sudetect"} category={"Software"} description={"Sudoku OCR and solver"} detailed={"Latest school project, Optical character recognition and sudoku solver software, built with C and GTK."}/>
                {/*<Project  key={1} name={"Afterlife"} category={"Game dev"} description={"Coding game with interpreted language"}/>*/}
                {/*<Project img={Epiclass} key={3} name={"Epiclass"} category={"Web App"} description={"School calendar"}/>*/}
            </div>
        </div>
    )
}

export default Projects;
