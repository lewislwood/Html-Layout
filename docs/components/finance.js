import {helpLog as hl} from "./utils.js";
import {myFinance} from "./myFinance.js";
"use strict";

// Testing Financial api
//


const testContainer = document.getElementById("testContainer");
const financial = new myFinance();


export const startTest = ()  => {
    try {
        hl("Starting financial Test by Lewis");
        // testContainer.appendChild( financial .getStyleObject());
        testContainer.appendChild( financial.getObjects());
        document.addEventListener('DOMContentLoaded', (event) => { financial.connected(testContainer); });      
    } catch(e) {
hl("startTest error: " + e.message);
    }; //catch



}; // startTest