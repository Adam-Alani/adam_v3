import React from "react";


const Marquee = ({direction}) => {

    const skills = ['Typescript', 'React', 'Svelte', 'Three.js', 'Golang', 'Python', 'Photoshop', 'Figma', 'Firebase'];


    return (

        <section className="marquee">

            <div className="marquee__inner" aria-hidden="true">

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

            </div>
        </section>
    )
}

export default Marquee;
