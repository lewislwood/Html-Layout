import {helpLog as hl, getJSON} from "./utils.js";
import { colorDetails } from "./colorDetails.js";




"use strict";

/*  
   Color Css Vars Class encapsulation

*/
export class colorCssVars   {
names ;
variables;
select;
hs;
details;
constructor() {
try {
    this.hs = hl;
    const ln = (data) => {        this.names = data;};
    const lv = (data) => {        this.variables = data;};
    getJSON("../data/colorNames.json", ln)
    getJSON("../data/ColorDefaults.json", lv)

    this.details = new colorDetails();
} catch(e) {
    hl("cssColorVar constructor error: "+ e.message)
}

} // constructor

getListBox() {
    const div = document.createElement("div");

    try {
        div.setAttribute("class", "containerColorVarsList");
        const h = document.createElement("h3");
        h.textContent = "Select a color Variable to view or edit?";
        h.setAttribute("id","colorVarsHeader");
        div.appendChild(h);
        
        const s = document.createElement("select");        
        s.setAttribute("id", "colorVariableSelect");
        s.setAttribute("aria-labeledby", "colorVarsHeader");
        s.setAttribute("class","colorVrSelect");
        s.setAttribute("size", "6");
        s.appendChild( this.makeOption("Placeholder", "place"));
        div.appendChild(s);
        
        
    } catch(e) {
hl( "ColorVars getListBox Error: " + e.message);
    } // catch
return div;
} // getListBox

makeOption( text, value) {
    const o = document.createElement("option")
    o.setAttribute("value", value);
    o.setAttribute("aria-label", text)
    o.textContent = text;
    return o;
} //makeOption

// Loaded Color Names and Color Defaults/variables
hasLoaded() {
return ( (this.names !== undefined) && ( this.variables !== undefined));
} // hasLoaded

// Connectedd... Should call after DOM has loaded
connected(root, tries = 0) {
// hl("Color Vars Connected called.");
try {
     if ( ! this.hasLoaded()) {
        if ( tries < 5 ) {
const tryAgain = (r, t) =>  { this.connected(r, t);};
// hl("Connected waiting for load of colorVars trying again.. " + tries)
setTimeout(tryAgain, 100, root, ++tries );
        } else { 
hl("Color Vars failed to load, Connected is aborting..");
     } // tries
    } else {
        // hl("Redy to connect");
this.select = root.querySelector("#colorVariableSelect");
if (this.select === undefined) { hl("color var listbox not found.");};
this.details.connected(root);
this.LoadColorVars();
this.details.names = this.names;



    } // if ! hasLoaded
} catch(e) {
hl( "connected colorVars error: " + e.message);
} // catch
} // connected

LoadColorVars() {
    try {
// hl("Loading color Vars");
const s = this.select ;
        const options = Array.from(s.options);
        // Remove any placeholder options
        options.forEach(option => { 
            option.remove();
            option.selected = false;
    }); // forEach
    const vs = this.variables;
vs.forEach( cv => { s.appendChild(this.makeOption(cv.name, cv.name));});
this.hs("Color Variables Loaded by Lewis");
const det = (e) => {this.setDetails(e);};

document.addEventListener( "input", det)

} catch(e) {
hl("colorVArs LoadColorVars error: " + e.message);
    } // catch

} // loadColorVars

// Event setDetails
setDetails (e) {
this.hs( "You selected: " + e.target.value);
} // setDetails

} // class colorCssVars  
