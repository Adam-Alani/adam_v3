import React, {createRef, useEffect, useRef, useState} from "react";
import getRepositories from "../utils/github";
import "../styles/animations.css"
import Reveal, {Fade} from "react-awesome-reveal";


const Archives = () => {

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
        <div className="px-8 border-t-4 border-white bg-dark font-Work-Sans">

            <div className="animate-reveal">
                <Reveal triggerOnce keyframes={"reveal"} delay={300}>
                    <h1 className=" title">ARCHIVES</h1>
                </Reveal>
            </div>
            <div className="py-16">
                {repos ? repos.map((repo, idx) => {
                    return (
                        <div className="animate-reveal">
                        <Reveal   keyframes={"reveal"}>
                            <div className="md:w-2/3 revealText">
                                <a target="_blank" rel="noopener" href={repo.html_url}  className="py-1 border-b-2 group  border-dotted transition duration-500 ease-in-out transform flex flex-row  justify-between">
                                    <div>
                                        <h1  className=" pt-2 pr-8 text-xl repo_hover ">{(repo.name)}</h1>
                                        <p className="hidden md:block pr-8 pb-2 text-sm text-gray-300 font-light repo_hover">{(repo.description)}</p>
                                    </div>
                                    <div className="text-right pt-2 items-start flex flex-row float-right">
                                        <div className="pr-4">
                                            <h1 className="  text-initial repo_hover">{getDate(repo)}</h1>
                                            <p className="hidden md:block  text-initial repo_hover  ">{(repo.language)}</p>
                                        </div>
                                        <svg className="w-6 transform -rotate-45  transition group-hover:text-primary duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
        // <div className="px-8 border-t-4 border-white bg-dark">
        //     <h1 className="text-9xl font-Work-Sans font-black  ">ARCHIVES</h1>
        //     <div className="py-16 font-Work-Sans">
        //         {repos ? repos.map((repo, idx) => {
        //             return (
        //                 <div className="w-2/3">
        //                     <a target="_blank" rel="noopener" href={repo.html_url}  className="py-1 border-b-2 group  border-dotted transition duration-500 ease-in-out transform flex flex-row  justify-between">
        //                         <div>
        //                             <h1 className=" pt-2 pr-8 text-xl select-none transition group-hover:text-primary duration-75 ">{(repo.name)}</h1>
        //                             <p className=" pr-8 pb-2 text-sm text-gray-300 select-none overflow-ellipsis font-light  transition group-hover:text-primary duration-75">{(repo.description)}</p>
        //                         </div>
        //                         <div className="text-right pt-2 items-start flex flex-row float-right">
        //                             <div className="pr-4">
        //                             <h1 className="  text-initial select-none  transition group-hover:text-primary duration-75">{getDate(repo)}</h1>
        //                             <p className="  text-initial select-none  transition group-hover:text-primary duration-75">{(repo.language)}</p>
        //                             </div>
        //                             <svg className="w-6 transform -rotate-45  transition group-hover:text-primary duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        //                                 <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd"/>
        //                             </svg>
        //                         </div>
        //
        //                     </a>
        //                 </div>
        //
        //             )
        //         }) : (
        //             <h1>Loading...</h1>
        //         )}
        //     </div>
        // </div>
    )
}
export default Archives;
