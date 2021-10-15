import React from "react";
import {ReactComponent as Animation} from "../assets/Animation2_animated.svg"

const LoadingAnimation = () => {

    return (
        <div className="fixed bg-dark  inset-0 w-screen h-screen w-full h-full max-w-full flex justify-center z-50 overflow-hidden">
            <Animation className="w-52 sm:w-64 md:w-72 lg:w-96 logo-fill" />
        </div>
    )
}

export default LoadingAnimation
