import React, {useEffect} from "react";


const Marquee = ({direction}) => {

    const skills = ['Typescript', 'React', 'Svelte', 'Three.js', 'Golang', 'Python', 'Photoshop', 'Figma', 'Firebase', 'C', 'CSS'];

    useEffect(() => {
        //Shuffle array 3 times and send those arrays to return;
    }, [])


    //Fisher-Yates Shuffle algorithm : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    return (

        <section className="marquee">

            <div className="marquee__inner" aria-hidden="true">

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

                <div className={`marquee__part ${direction} flex flex-row whitespace-nowrap"`}>
                    {skills.map(function(item, i){return <p> <span className="ml-6 hover:text-primary" key={i}>{item} </span> -</p>;})}
                </div>

            </div>
        </section>
    )
}

export default Marquee;
