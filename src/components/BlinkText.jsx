import React, { Component } from "react";
import Blink from 'react-blink-text';

function Application(){
    return (
      <div className="Application">
        <Blink color='red' text='Tomestry Services Available from 11:00 a.m To 9:30 p.m.' fontSize='22'>
        </Blink> 
      </div>
      
    );
}
export default Application;
