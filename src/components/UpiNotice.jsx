import React, { Component } from "react";
import Blink from 'react-blink-text';

function Application(){
    return (
      <div className="Application">
        <Blink color='black' text='You can pay by any UPI Method(Google Pay, PhonePe, Paytm,etc) to Delivery Agent.' fontSize='24' style={{fontweight:"bold"}} >
        </Blink> 
      </div>
      
    );
}
export default Application;