import React, {useRef, useState} from "react";
import "../styles/animations.css"
import HoverableText from "./HoverableText";


const Footer = () => {

    const span = useRef();
    const cursor = useRef();


    const hoverHandler = (e) => {
        const { offsetX: x, offsetY: y } = e.nativeEvent;

        // const move = 25;
        // const xMove = x / e.screenX * (move * 2) - move;
        // const yMove = y / e.screenY * (move * 2) - move;
        // console.log(x)
        const move = 25;
        const xMove = x / span.current.offsetWidth * (move * 2) - move;
        const yMove = y / span.current.offsetHeight * (move * 2) - move;
        console.log(xMove)
        span.current.style.transform = `translate(${xMove}px, ${yMove}px)`;
    }

    const leave = (e) => {
        span.current.style.transform = '';
    }

    const editCursor = e => {
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
            <div className="sm:w-3/4 md:w-2/3 lg:w-1/2">
                <div className="border-t border-gray py-8 grid grid-cols-2 ">
                    <h1 className="text-xs md:text-sm">SOCIAL MEDIA</h1>
                    {/*<div className="">*/}
                    {/*                     <a href="github.com" className="hover-link"><span ref={span}  onMouseMove={hoverHandler} onMouseLeave={leave}>Github</span></a>*/}
                    {/*                     <p>LinkedIn</p>*/}
                    {/*                     <p>Twitter</p>*/}
                    {/*                 </div>*/}
                    <div onMouseMove={editCursor} className="flex flex-col">
                        <HoverableText key={1} text={"Github"} cursor={cursor}/>
                        <HoverableText key={2} text={"LinkedIn"} cursor={cursor}/>
                        <HoverableText key={3} text={"Twitter"} cursor={cursor}/>
                        <div  ref={cursor} className="cursor transition"/>
                    </div>
                </div>
                <div className="border-t border-gray py-8 grid grid-cols-2">
                    <h1 className="text-xs md:text-sm">EMAIL</h1>
                    <div className="">
                        <p>adamalany@gmail.com</p>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-sm  md:text-base font-light  pt-4">©adamalani</p>
                <p>Paris, France</p>
            </div>
        </div>


)
}

export default Footer
