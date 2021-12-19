import React, {useEffect, useState} from "react";
import Home from "./pages/home";
import Archives from "./pages/archives";
import About from "./pages/about";
import LoadingAnimation from "./components/loadingAnimation";
import Projects from "./pages/projects";
import Contact from "./pages/contact";
import './index.css';
import './styles/tailwind.css';
import './styles/animations.css';
import './styles/fonts.css';
import Footer from "./components/Footer";
import Skills from "./pages/skills";
import {Route, Switch} from "react-router";
import ProjectOverview from "./components/ProjectOverview";
import RedirectTo from "./components/RedirectTo";

const colors = [
    {style:"bg-rYellow", text:"text-rYellow", color:"#ff7b00"},
    {style:"bg-rGreen", text:"text-rGreen", color: "#00ab5f"},
    {style:"bg-rPurple", text:"text-rPurple", color: "#8521f5"},
    {style:"bg-rRed", text:"text-rRed", color: "#f52121"},
    {style:"bg-rDGreen", text:"text-rDGreen", color: "#3fd30e"},
    {style:"bg-rBlue", text:"text-rBlue", color: "#0eccd3"},
];
function App() {

    const [loading, setLoading] = useState(true);
    const [randomColor, setColor] = useState("");

    useEffect(() => {
        setColor(colors[Math.floor(Math.random() * colors.length)]);
        setTimeout(() => {
            setLoading(false);
             }, 5000)
    }, []);

    return (
        <>
            { loading && <div><LoadingAnimation /></div>}
            <Switch>
                <Route exact path="/">
                    <div  className="text-white font-Rozha bg-dark w-screen max-w-full overflow-auto ">
                        <div className={`transition duration-2000 ${loading ? "opacity-0" : "opacity-100" }`}>
                            <Home color={randomColor} hidden={loading}/>
                            <div>
                                <div className={`bg-dark max-w-full transition duration-1000 ease-in  ${loading ? "invisible" : "visible" }`} >
                                    <About color={randomColor}/>
                                    <Projects/>
                                    <Skills/>
                                    <Archives color={randomColor}/>
                                    <Contact key={document.location.href}/>
                                    <Footer/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path="/projects/:name">
                    <ProjectOverview/>
                </Route>
                <Route exact path="/make-me-rich-bitch">
                    <RedirectTo link={"https://paypal.me/makeadamrichagain?country.x=FR&locale.x=fr_FR"}/>
                </Route>
            </Switch>
        </>
    )
}
export default App;
