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
    const ln = (data) => {        this.names = data;};
    const lv = (data) => {        this.variables = data;};
    getJSON("../data/colorNames.json", ln)
    getJSON("../data/ColorDefaults.json", lv)
} catch(e) {
    hl("cssColorVar constructor error: "+ e.message)
}

} // constructor

getListBox() {
const div = document.createElement("div");
div.setAttribute("class ", "containerColorVarsList");
const h = document.createElement("h3");
h.textContent = "Select a color Variable to view or edit?";tC
div.appendChild(h);

const s = document.createElement("select");
s.setAttribute("id", "colorVariableSelect");
s.setAttribute("class","colorVrSelect");
s.setAttribute("size", "6");
s.appendChild( this.makeOption("Placeholder", "place"));
div.appendChild(s);

return div;
} // getListBox

makeOption( text, value) {
    const o = document.createElement("option")
    o.setAttribute("value", value);
    o.textContent = text;
    return o;
} //makeOption

// Loaded Color Names and Color Defaults/variables
hasLoaded() {
return ( (this.names !== undefined) && ( this.variables !== undefined));
} // hasLoaded
} // class colorCssVars  
