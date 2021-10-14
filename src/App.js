import React, {useEffect, useRef, useState} from "react";
import useWindowSize from "./hooks/useWindowSize";
import Home from "./pages/home";
import Nav from "./components/nav";
import Skills from "./pages/skills";
import Archives from "./pages/archives";
import About from "./pages/about";
import LoadingAnimation from "./components/loadingAnimation";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import './index.css';
import './styles/tailwind.css';
import './styles/animations.css';
import './styles/fonts.css';

//Smooth scroll by https://www.youtube.com/watch?v=Dz6Sg630I8M
//TODO: Random color on each visit
function App() {

    const [loading, setLoading] = useState(false);
    const size = useWindowSize();

    // Ref for parent div and scrolling div
    const app = useRef();
    const scrollContainer = useRef();

    // Configs
    const data = {
        ease: 0.05,
        current: 0,
        previous: 0,
        rounded: 0
    };

    // Run scrollrender once page is loaded.


    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 5000)
    // }, []);

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
        const skew = +acceleration;

        //Assign skew and smooth scrolling to the scroll container
        scrollContainer.current.style.transform = `translate3d(0, -${data.rounded}px, 0) skewY(${skew}deg)`;

        //loop vai raf
        requestAnimationFrame(() => skewScrolling());
    };




    return (
        <div ref={app} className="text-white font-Rozha bg-dark w-screen max-w-full overflow-auto">


        { loading && <div ><LoadingAnimation /></div>}
            <div className={`transition duration-2000 ${loading ? "opacity-0" : "opacity-100" }`}>
                {/*<Nav className={`transition duration-1000 ease-in ${loading ? "hidden" : "" }`}/>*/}
                <Home hidden={loading}/>

                <div ref={scrollContainer}>
                    <div className={`bg-dark transition duration-1000 ease-in ${loading ? "hidden" : "visible block" }`} >
                        <About/>
                        <Projects/>
                        <Skills/>
                        <Archives/>
                        <Contact/>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default App;
