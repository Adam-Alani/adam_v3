import React, {useEffect, useState} from "react";
import getRepositories from "../utils/github";
import "../animations.css"

const Archives = () => {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        getRepositories().then((data) => {
            console.log(data);
            setRepos(data);
        })
    }, [])


    const getDate = (day) => {
        let created = new Date(day.created_at)
        return created.toLocaleDateString()
    }




    return (
        <div className="px-28 ">
            <h1 className="text-5xl ">Archives</h1>
            <div className="py-16 font-Work-Sans">
                {repos && repos.map((repo, idx) => {
                    return (
                        <div className="w-2/3">
                            <div className="py-1 border-b-2 border-dotted transition duration-500 ease-in-out transform flex flex-row  justify-between">
                                <div>
                                    <h1 className=" pt-2 pr-8 text-xl select-none ">{(repo.name)}</h1>
                                    <p className=" pr-8 pb-2 text-sm text-gray-300 select-none overflow-ellipsis font-light">{(repo.description)}</p>
                                </div>
                                <div className="text-right pt-2 items-start flex flex-row float-right">
                                    <div className="pr-4">
                                    <h1 className="  text-initial select-none ">{getDate(repo)}</h1>
                                    <p className="  text-initial select-none">{(repo.language)}</p>
                                    </div>
                                    <svg className="w-6 transform -rotate-45" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd"/>
                                    </svg>
                                </div>

                            </div>

                        </div>

                    )
                })}
            </div>
        </div>
    )
}
export default Archives;
