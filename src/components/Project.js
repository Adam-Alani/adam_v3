import Reveal from "react-awesome-reveal";
import React from "react";

const Project = ({name, category, description}) => {


    return (
        <div className="border-b font-Inter  border-gray py-4 mx-8 grid grid-cols-2 animate-reveal">
            <Reveal cascade keyframes={"reveal"}>
                <div className="w-max ">
                    <h1 className="text-4xl  font-bold ">{name}</h1>
                </div>
                <div className="flex h-full items-center font-light text-sm">
                    <p  className="w-80 ">{description}</p>
                    <p className="opacity-60">{category}</p>
                </div>
            </Reveal>
        </div>
    )
}

export default Project;