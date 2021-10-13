import React, {useCallback, useEffect, useState} from 'react';

const Projects = () => {

    const onClick = () => { /** Handle mousedown or click */ }

    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        const handleDocumentMouseUp = event => {
            if (event.button !== 2) {
                setTimeout(() => setMouseDown(false), 10);
            }
        };

        document.addEventListener('mouseup', handleDocumentMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleDocumentMouseUp);
        };
    }, []);

    const handleMouseDown = event => {
        if (event.button !== 2) {
            setMouseDown(true);
        }
    };

    const handleClick = useCallback(() => {
        if (!mouseDown) {
            onClick();
        }
    }, [mouseDown]);

    return (
        <div  className=" w-screen h-screen max-w-full pt-8 bg-dark border-t-4 border-dark ">
            <h1 className="text-5xl px-28 ">Projects</h1>
            <div>
            </div>
        </div>
    )
}

export default Projects;
