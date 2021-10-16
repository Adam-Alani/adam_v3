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

//Smooth scroll by https://www.youtube.com/watch?v=Dz6Sg630I8M
//TODO: Random color on each visit
function App() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5000)
    }, []);

    return (
        <div className="text-white font-Rozha bg-dark w-screen max-w-full overflow-auto ">


        { loading && <div><LoadingAnimation /></div>}
            <div  className={`transition duration-2000 ${loading ? "opacity-0" : "opacity-100" }`}>
                <Home hidden={loading}/>

                <div>
                    <div className={`bg-dark max-w-full transition duration-1000 ease-in  ${loading ? "hidden" : "visible block" }`} >
                        <About/>
                        <Projects/>
                        {/*<Skills/>*/}
                        <Archives/>
                        <Contact/>
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default App;
