import {useLocation } from "react-router-dom"
import {useEffect} from "react";

export default (props) => {
    const {pathname} = useLocation();
    useEffect(()=>{
        window.scrollTo(
            {top:0,behavior:"smooth"}
        )
    }, [])
    return null
}