import React from 'react';
import Reveal, { Slide} from "react-awesome-reveal";
import Project from "../components/Project";
import Epiclass from "../assets/epiclass.png"

const Projects = () => {

    return (
        <div className=" w-screen h-screen max-w-full bg-dark border-t-4 border-dark ">
            <div className="animate-reveal">
                <Reveal triggerOnce delay={100} keyframes={"reveal"}>
                    <h1 className="revealText sm:float-right text-5xl px-8 title font-Inter pointer-events-none ">PROJECTS</h1>
                </Reveal>
            </div>
            <div className="py-8" >
                <Slide cascade damping={0.1}>
                    <Project img={Epiclass} key={0} name={"Dysto"} category={"Design and Web"} description={"Fashion branding"}/>
                    <Project key={1} name={"Afterlife"} category={"Game dev"} description={"Coding game with interpreted language"}/>
                    <Project key={2} name={"Sudetect"} category={"Software"} description={"Sudoku OCR and solver"}/>
                    <Project key={3} name={"Epiclass"} category={"Web App"} description={"School calendar"}/>
                    <Project key={3} name={"adamalani.me"} category={"Web dev"} description={"Personal portfolio"}/>
                </Slide>
            </div>
        </div>
    )
}

export default Projects;
