import React, {useEffect} from "react";
import {Fade} from "react-awesome-reveal";




const Marquee = ({direction, skills}) => {

    return (
        <Fade>
        <section className="marquee">

            <div className="marquee__inner " aria-hidden="true">

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 transition duration-100 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 transition duration-100 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 transition duration-100 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 transition duration-100 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

            </div>
        </section>
        </Fade>
    )
}

export default Marquee;
