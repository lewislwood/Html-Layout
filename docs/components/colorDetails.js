import {helpLog as hl} from "./utils.js";
import {colorDetailStyle } from "./styles/colorDetailStyles.js";


"use strict";

/***************
 *    Used by colorCssVars   .  Provides details for the list.
 *   by Lewis Wood
 * *********/

export class colorDetails {
    names;
    curVar;
hs;
varsList = 0;
parent;
current;
container;
heading;
hasLoaded = false;
// parent must be colorVar
constructor(pColorVar) {
try {
    this.hs = hl;
    this.parent = pColorVar;
this.varsList = "xyz";


} catch(e) {
hl("colorDetails constructor error: " + e.message);
} // catch
}; // constructor


editColorDetail( colorName) {
    try {
const p = this.parent;
this.setHeading("editing " + colorName );
this.heading.focus();
    } catch(e) {
hl("colorDetail.editColorDetail error: " + e.message);
    };

}; // editColorDetail



// getContainerObjects returns the div with all radios & comboboxes
getContainerObjects() {
const div = document.createElement("div");
div.setAttribute("class", "detailsContainer");
div.setAttribute("id","detailContainter")
const h = document.createElement("h3");
h.setAttribute("id", "detailHeading");
h.setAttribute("tabindex", "0");
h.textContent = "Edit the Details for Lewis ";
div.appendChild(h);
return div;
}; // getContainerObjects
// Load up the combo boxes
LoadColorVar() {
try {
    hl("Loading Color Details");
    const c = this.container;
this.heading = c.querySelector("#detailHeading"); // detailHeading
this.hs = this.parent.hs;
} catch(e) {
hl("colorDetail.lodColorVar error: " + e.message);
}; // catch
};  // loadColorVar


connected(root) {
    try {
hl("Connected Details.");
this.container = root.querySelector("#detailContainter");
this.LoadColorVar();

} catch(e) {
    hl("colorDetail.connected error: " + e.message);
}; // catch
} // connected

setHeading(text = "Edit color") {

    try {
if (this.heading !== null) {
this.heading.textContent = text;
this.hs(text );
};
    } catch(e) {
hl("colorDetals.setHeading: " + e.message)
    }; // catch
}; // setHeading

getStyleObject() {
    try {
    const st = document.createElement("style"); 
    st.textContent = colorDetailStyle ;
    return st;
    } catch(e){
        hl("colorDetail.getStyleObjecterror: " + e.message); 
    }; //catch
    }; // getStyleObject




}; // class colorDetails

