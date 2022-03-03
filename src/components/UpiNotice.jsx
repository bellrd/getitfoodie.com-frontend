import React, { Component } from "react";
import Blink from 'react-blink-text';

function Application(){
    return (
      <div className="Application">
        <Blink color='blue' text='If You are Ordering As Self-Pickup then You need to pay on 9161419412 online by any payment mehod.' fontSize='24' style={{fontweight:"bold"}} >
        </Blink> 
      </div>
      
      
    );
}
export default Application;