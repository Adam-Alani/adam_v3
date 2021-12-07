import {useEffect} from "react";

const RedirectTo = ({link}) => {
    useEffect(() => {
        window.open(link);
    },[])
    return (
        <div/>
    )
}

export default RedirectTo;
