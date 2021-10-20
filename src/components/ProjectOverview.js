import React, {useEffect} from "react";
import {Redirect, useLocation} from "react-router";

const ProjectOverview = () => {

    const {state} = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    if (!state) {
        return (
            <Redirect to={"/"}/>
        )
    }


    console.log(state);

    return (
        <div className=" w-screen  max-w-full text-white bg-dark ">
            <div className="inline-flex justify-between ">
                <div className=" w-1/3 px-8 py-8 font-Inter">
                    <div className="flex flex-col items-start">
                        <h2 className=" font-bold opacity-60">{state.category}</h2>
                        <h1 className="text-7xl  font-black">{state.name}</h1>
                    </div>
                    <div className="py-4">
                        <p className="font">{state.detailed}</p>
                    </div>
                </div>
                <div className="h-screen w-2/3">
                    <img className="object-contain relative  " src={state.img} alt={state.name}/>
                </div>
            </div>
        </div>
    )
};
export default ProjectOverview;
