import React, {useEffect} from "react";
import {Fade} from "react-awesome-reveal";
import ProfilePic from "../assets/profile.png";
import {Draggable} from "gsap/Draggable";
import { gsap } from "gsap";
import useWindowSize from "../hooks/useWindowSize";




const About = ({color}) => {

    const size = useWindowSize()

    useEffect(() => {
        gsap.registerPlugin(Draggable)

        gsap.set(".draggable",{x:2*window.innerWidth/3,y:100,zIndex:0});
        gsap.set(".behind",{x:2*window.innerWidth/3,y:100});

        Draggable.create(".draggable", {
            type:"x,y",
            edgeResistance:0.65,
            inertia:true,
            bounds:".bounds",
            zIndex:0,
            onPress: function() {
                gsap.to(".draggable", {
                    duration: 0,
                    zIndex:0
                })
                gsap.to(".draggable", {
                    duration: 0.2,
                    ease: 'Sine.easeOut',
                    scale: 1.01,
                })
            },
            onDrag: function() {
                gsap.to(".behind", {
                    x: this.x,
                    y: this.y ,
                    stagger: -0.025,
                });
            },
            onDragEnd: function() {
                gsap.to(".behind", {
                    x: this.x,
                    y: this.y ,
                    stagger: -0.025,
                });
            },
            onRelease: function() {
                gsap.to(".draggable", {
                    duration: 0.2,
                    ease: 'Sine.easeOut',
                    scale: 1,
                })
            }
        })

    }, [size]); // Make sure the effect runs only once



    //TODO: IDK if i should make text smaller/cleaner, add resume download, make name a gradient
    return (
        <div className="flex flex-row bounds">
            <div className="lg:block hidden">
                <img src={ProfilePic} alt="Me!" className="  image behind filter brightness-200 "/>
                <img src={ProfilePic} alt="Me!" className="  image behind filter brightness-150"/>
                <img src={ProfilePic} alt="Me!" className="  image behind filter brightness-125"/>
                <img src={ProfilePic} alt="Me!" className="  image behind filter brightness-125"/>
                <img src={ProfilePic} alt="Me!" className="  image behind filter shadow-2xl brightness-110"/>
                <img src={ProfilePic} alt="Me!" className="  image draggable shadow-xl "/>
            </div>
            <section  className="font-Inter py-24 pl-8 pr-8 lg:pr-0  sm:pl-16 md:pl-32 lg:pl-56 text-2xl md:text-3xl lg:text-4xl  w-screen h-screen max-w-full pointer-events-none  mix-blend-exclusion">
                <Fade triggerOnce cascade>
                    <div className=" flex flex-col justify-start items-start  ">
                        <p className='font-bold'>Hey 👋, I'm</p>
                        <p className={` text-8xl lg:text-9xl font-black transition ${color.text}`}>Adam</p>
                        <br/>
                    </div>
                    <div className="font-extralight ">
                        <p>I'm a developer and designer based in Paris, France.</p>
                        <p className="pt-4">Currently studying computer science and actively looking for jobs and internships.</p>
                    </div>
                </Fade>
            </section>
            <div className=" md:w-2/3 ">

            </div>
        </div>
    )
}

export default About;

