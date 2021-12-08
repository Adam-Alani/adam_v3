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

function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                            <Home hidden={loading}/>
                            <div>
                                <div className={`bg-dark max-w-full transition duration-1000 ease-in  ${loading ? "invisible" : "visible" }`} >
                                    <About/>
                                    <Projects/>
                                    <Skills/>
                                    <Archives/>
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
