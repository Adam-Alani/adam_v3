import React, {useEffect, useState} from "react";
import Logo from '../assets/White.png';
const Nav = () => {


    return (
        <div className='sticky leading-none text-white inset-0 bg-transparent inline-flex justify-between px-10 pt-10 w-full z-50 text-sm' >
            <div>
            <img src={Logo} className="w-6" alt=""/>
            </div>
            <div className="inline-flex">
                <h1>About</h1>
            </div>
        </div>
    )
}
export default Nav;
