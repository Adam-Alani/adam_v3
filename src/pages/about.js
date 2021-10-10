import React from "react";

const About = () => {

    return (
        <div className="px-28 pt-24 text-4xl w-screen h-screen max-w-full">
            <div className="font-Work-Sans flex flex-col justify-start items-start">
                <p className=" font-medium">Hey, I'm</p>
                <h1 className=" text-9xl font-bold pb-8  transition hover:text-primary">Adam</h1>
                <hr/>
            </div>
            <div className="font-Recoleta pt-16 w-1/2">
                <p className="pb-8">I'm a developer and designer based in <span className="text-primary">Paris, France</span></p>
                <p>Currently studying computer science and actively looking for jobs and internships</p>
            </div>
        </div>
    )
}

export default About;
