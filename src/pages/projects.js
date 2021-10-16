import React, {useCallback, useEffect, useState} from 'react';
import Reveal from "react-awesome-reveal";
import Project from "../components/Project";

const Projects = () => {

    const onClick = () => { /** Handle mousedown or click */ }

    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        const handleDocumentMouseUp = event => {
            if (event.button !== 2) {
                setTimeout(() => setMouseDown(false), 10);
            }
        };

        document.addEventListener('mouseup', handleDocumentMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
        };
    }, []);

    const handleMouseDown = event => {
        if (event.button !== 2) {
            setMouseDown(true);
        }
    };

    const handleClick = useCallback(() => {
        if (!mouseDown) {
            onClick();
        }
    }, [mouseDown]);

    return (
        <div  className=" w-screen h-screen max-w-full bg-dark border-t-4 border-dark ">
            <div className="animate-reveal">
                <Reveal triggerOnce delay={100} keyframes={"reveal"}>
                    <h1 className="revealText sm:float-right text-5xl sm:px-8 title font-Inter ">PROJECTS</h1>
                </Reveal>
            </div>
            <div>
                <Project name={"Dysto"} category={"Design and Web"} description={"Fashion branding"}/>
                <Project name={"Afterlife"} category={"Game dev"} description={"Coding game with interpreted language"}/>
                <Project name={"Sudetect"} category={"Software"} description={"Sudoku OCR and solver"}/>
                <Project name={"Epiclass"} category={"Web App"} description={"School calendar"}/>
            </div>
        </div>
    )
}

export default Projects;
