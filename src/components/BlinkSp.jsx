import React, { Component } from "react";
import Blink from 'react-blink-text';

function Application(){
    return (
      <div className="Application">
        <Blink color='black' text='Self Pick-Up (20% OFF)' fontSize='24' style={{fontweight:"bold"}} >
        </Blink> 
      </div>
      
    );
}
export default Application;