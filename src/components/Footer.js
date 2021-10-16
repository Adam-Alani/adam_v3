import React, {useRef, useState} from "react";
import "../styles/animations.css"
import HoverableText from "./HoverableText";
import Reveal, {Fade} from "react-awesome-reveal";


const Footer = () => {

    const cursor = useRef();
    const cursor2 = useRef();

    const editCursor = (e, cursor) => {
        const { clientX: x, clientY: y } = e;
        cursor.current.style.left = x + 'px';
        cursor.current.style.top = y + 'px';
    };

    return (
        // <div className="nav-wrapper">
        //     <nav className="nav " onMouseMove={editCursor}>
        //         <HoverableText text={"Github"} cursor={cursor}/>
        //         <a href="#" onMouseMove={hoverHandler} onMouseLeave={leave} className="hover-this"><span ref={span}>Home</span></a>
        //         <a href="#" className="hover-this"><span>Our Story</span></a>
        //         <a href="#" className="hover-this"><span>Studio</span></a>
        //         <a href="#" className="hover-this"><span>Contact</span></a>
        //         <div  ref={cursor} className="cursor"></div>
        //     </nav>
        // </div>
        <div className="py-4 px-8 mt-16 md:text-3xl flex flex-col justify-between font-Inter" style={{height:"50vh"}}>
            <div className="w-max">
                <div className=" border-t border-gray py-8 grid grid-cols-2 animate-reveal ">
                    <div className="animate-reveal">
                    <Reveal keyframes={"reveal"} >
                        <h1 className="text-xs md:text-sm pointer-events-none">SOCIAL MEDIA</h1>
                    </Reveal>
                    </div>
                    <Fade cascade>
                    <div onMouseMove={(e) => {editCursor(e, cursor)}}  className="flex flex-col lg:pl-16">
                        <HoverableText key={1} text={"Github"} cursor={cursor}/>
                        <HoverableText key={2} text={"LinkedIn"} cursor={cursor}/>
                        <HoverableText key={3} text={"Twitter"} cursor={cursor}/>
                        <div ref={cursor} className="cursor transition"/>
                    </div>
                    </Fade>

                </div>
               <div className=" animate-reveal border-t border-gray py-8 grid grid-cols-2">
                    <div className="animate-reveal">
                        <Reveal keyframes={"reveal"} >
                            <h1 className="text-xs md:text-sm pointer-events-none">EMAIL</h1>
                        </Reveal>
                    </div>
                   <Fade cascade>
                       <div onMouseMove={(e) => {editCursor(e, cursor2)}} className="lg:pl-16">
                            <HoverableText key={4} text={"adamalany@gmail.com"} cursor={cursor2}/>
                            <div ref={cursor2} className="cursor transition"/>
                        </div>
                   </Fade>
               </div>
            </div>
            <div className="animate-reveal pointer-events-none">
                <Reveal keyframes={"reveal"}>
                <p className="text-sm  md:text-base font-light  pt-4">©adamalani</p>
                <p>Paris, France</p>
                </Reveal>
            </div>
        </div>


)
}

export default Footer
