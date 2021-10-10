import React, {useEffect,useRef} from "react";
import './index.css';
import useWindowSize from "./hooks/useWindowSize";
import Home from "./pages/home";
import Nav from "./components/nav";
import Skills from "./pages/skills";

//Smooth scroll by https://www.youtube.com/watch?v=Dz6Sg630I8M
function App() {
    const size = useWindowSize();

    // Ref for parent div and scrolling div
    const app = useRef();
    const scrollContainer = useRef();

    // Configs
    const data = {
        ease: 0.1,
        current: 0,
        previous: 0,
        rounded: 0
    };

    // Run scrollrender once page is loaded.
    useEffect(() => {
        requestAnimationFrame(() => skewScrolling());
    }, []);

    //set the height of the body.
    useEffect(() => {
        setBodyHeight();
    }, [size.height]);

    //Set the height of the body to the height of the scrolling div
    const setBodyHeight = () => {
        document.body.style.height = `${
            scrollContainer.current.getBoundingClientRect().height
        }px`;
    };

    // Scrolling
    const skewScrolling = () => {
        //Set Current to the scroll position amount
        data.current = window.scrollY;
        // Set Previous to the scroll previous position
        data.previous += (data.current - data.previous) * data.ease;
        // Set rounded to
        data.rounded = Math.round(data.previous * 100) / 100;

        // Difference between
        const difference = data.current - data.rounded;
        const acceleration = difference / size.width;
        const velocity = +acceleration;
        const skew = velocity * 20;

        //Assign skew and smooth scrolling to the scroll container
        scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`;

        //loop vai raf
        requestAnimationFrame(() => skewScrolling());
    };


    return (
        <div ref={app} className="text-white font-Rozha bg-dark">
            <Nav/>

            <div ref={scrollContainer} className="scroll">

                <div>
                    <Home/>
                    <Skills/>



                </div>
            </div>
        </div>
    )
}
export default App;
