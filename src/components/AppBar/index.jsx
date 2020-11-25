import React, {useContext, useEffect} from "react"
import {GlobalContext} from "../../GlobalContext";
import MobileAppBar from "./MobileAppBar";
import DesktopAppBar from "./DesktopAppBar";
import Axios from "axios";

export default (props) => {
    
    const ctx = useContext(GlobalContext);
   
    return ctx.state.isMobile ? <MobileAppBar/> : <DesktopAppBar position={"sticky"}/>
}