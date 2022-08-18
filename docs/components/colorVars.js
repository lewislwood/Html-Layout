import {helpLog as hl, getJSON} from "./utils.js";




"use strict"

/*  
   Color Css Vars Class encapsulation

*/
export class colorCssVars   {
names ;
variables;
constructor() {
try {
    const ln = (data) => {        this.names = data;hl("Names loaded.")};
    const lv = (data) => {        this.variables = data;hl("Variables loaded.")};
    hl("Getting names...");
    getJSON("../data/colorNames.json", ln)
    hl("Getting variables...");
    getJSON("../data/ColorDefaults.json", lv)
} catch(e) {
    hl("cssColorVar constructor error: "+ e.message)
}

} // constructor

} // class colorCssVars  
