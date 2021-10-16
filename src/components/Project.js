import Reveal from "react-awesome-reveal";
import React, {useRef} from "react";
import {getMousePos} from "../utils/utils";
import {gsap} from "gsap";

let oldy = 0;
const Project = ({name, category, description, img}) => {

    const filler = useRef();
    const inner = useRef();
    const imgRef = useRef();

    const handleMouse = (e) => {
        oldy = e.pageY;
    }

    const enter = (e) => {
        inner.current.className += " project-btn--hover"

        gsap.killTweensOf(filler.current);
        gsap.killTweensOf(inner.current);
        gsap.killTweensOf(imgRef.current)

        let value = "-75%"

        //Going up
        if (e.pageY < oldy) {
            value = "75%"
        }

        gsap
            .timeline()
            .to(filler.current,  {
                duration:0.5,
                ease: 'Power3.easeOut',
                startAt: {y: value},
                y: '0%'
            })
            .to(inner.current, {
                duration:0.1,
                ease: 'Power3.easeOut',
                opacity: 0,
                startAt: {y: '30%', opacity: 1},
                y: '0%'
            }, 0)
            .to(inner.current, {
                duration:0.25,
                ease: 'Power3.easeOut',
                opacity: 1,
                color: "#070707",
            }, 0.1)
            .to(imgRef.current, {
                duration: 1,
                ease: 'Power3.easeOut',
                opacity: 1,
                force3D:false
            }, 0)
    }

    const leave = (e) => {
        inner.current.className.replace("project-btn--hover", "")
        imgRef.current.style.opacity = 0;


        gsap.killTweensOf(filler.current);
        gsap.killTweensOf(inner.current);
        gsap.killTweensOf(imgRef.current)


        let value = "75%"

        if (e.pageY < oldy) {
            value = "-75%"
        }

        gsap
            .timeline()
            .to(filler.current, {
                duration:0.4,
                ease: 'Power3.easeOut',
                y: value
            })
            .to(inner.current, {
                duration:0.25,
                ease: 'Power3.easeOut',
                opacity: 1,
                color: "#ffffff",
            }, 0.1)
            .to(imgRef.current, {
                duration: 2,
                ease: 'Power3.easeOut',
                opacity: 0,
                force3D:false
            }, 0)

    }

    return (
        <div className="relative">
            <img ref={imgRef} src={img} style={{left:"25%", top:"50%"}} className="absolute pointer-events-none w-56 opacity-0 z-50" alt={name}/>
            <div onMouseEnter={enter} onMouseMove={handleMouse} onMouseLeave={leave}  className="project-btn border-b font-Inter  border-gray py-4 animate-reveal">
                <div ref={filler} className="project-btn--filler"/>
                <div ref={inner} className="grid grid-cols-2  relative px-8">
                    <div className="w-max ">
                        <span className="project-text--inner  text-4xl  font-bold  ">{name}</span>
                    </div>
                    <div className="flex  h-full items-center font-light text-sm">
                        <span className="w-80 hidden lg:block ">{description}</span>
                        <span className="opacity-50 lg:w-max w-full lg:text-left text-right">{category}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Project;
