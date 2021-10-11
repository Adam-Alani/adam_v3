import {useEffect, useRef} from "react";

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            if (typeof savedCallback.current !== 'undefined') {
                savedCallback.current();
            }
        }
        if (delay !== null) {
            let wait = setInterval(tick,delay);
            return () => clearInterval(wait);
        }
    }, [delay])
}

export default useInterval;