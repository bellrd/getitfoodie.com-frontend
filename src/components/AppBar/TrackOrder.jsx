import { BorderAllOutlined, BorderAllRounded } from "@material-ui/icons";
import React, { Component } from "react";
import Blink from 'react-blink-text';

function Application(){
    return (
      <div className="Application" style={{fontWeight:"bold" }}>
        <Blink color='yellow' text='Track My Order' fontSize='27' border="9px" >
        </Blink> 
      </div>
      
    );
}
export default Application;