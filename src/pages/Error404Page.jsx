import React from "react";
import {Container} from "@material-ui/core";
import { Block } from "@material-ui/icons";

export default (props) => {
    return (
        <Container maxWidth={"xs"}>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>4<span>0</span>4</h1>
                    </div>
                    <h1>Oops! Page Not Be Found</h1>
                    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is
                        temporarily unavailable</p>
                    <p></p>
                    <p>OR</p>
                    <p></p>
                    <p><b>Call To tomestry Administration For More Help +91 8604850890</b></p>
                    <a href="/">Back to homepage</a>
                </div>
            </div>
        </Container>
    )
}
