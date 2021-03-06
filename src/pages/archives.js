import React, {useEffect, useState} from "react";
import getRepositories from "../utils/github";
import "../styles/animations.css"
import Reveal from "react-awesome-reveal";


const Archives = ({color}) => {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        getRepositories().then((data) => {
            setRepos(data);
        })

    }, [])


    const getDate = (day) => {
        let created = new Date(day.created_at)
        return created.toLocaleDateString()
    }

    //ref={ref} className={`transition ${inViewport ? 'fade-in' : ' '}
    return (
        <div className="px-8 border-t border-white bg-dark font-Inter">

            <div className="animate-reveal">
                <Reveal triggerOnce keyframes={"reveal"} delay={300}>
                    <h1 className="pointer-events-none title">ARCHIVES</h1>
                </Reveal>
            </div>
            <div className="py-16">
                {repos ? repos.map((repo, idx) => {
                    return (
                        <div key={idx} className="animate-reveal">
                        <Reveal keyframes={"reveal"}>
                            <div className="md:w-2/3 revealText">
                                <a target="_blank" rel="noreferrer" href={repo.html_url}  className="py-1 border-b-2 border-gray group  border-dotted transition duration-500 ease-in-out transform flex flex-row  justify-between">
                                    <div>
                                        <h1  className={`pt-1 pr-8 font-light capitalize sm:text-xl repo_hover ${"group-hover:"+color.text} `}>{(repo.name)}</h1>
                                        <p className={`hidden md:block pr-8 pb-2 text-sm text-gray-300 font-light repo_hover  ${"group-hover:"+color.text}`}>{(repo.description)}</p>
                                    </div>
                                    <div className="text-right pt-2 items-start flex flex-row float-right">
                                        <div className="pr-4">
                                            <h1 className={`text-initial repo_hover ${"group-hover:"+color.text}`}>{getDate(repo)}</h1>
                                            <p className={`hidden md:block  text-initial repo_hover ${"group-hover:"+color.text}`}>{(repo.language)}</p>
                                        </div>
                                        <svg className={`w-6 transform -rotate-45  transition ${"group-hover:"+color.text} duration-75}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd"/>
                                        </svg>
                                    </div>

                                </a>
                            </div>
                        </Reveal>
                        </div>

                    )
                }) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    )
}
export default Archives;
