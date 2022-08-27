import {helpLog as hl} from "./utils.js";


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

constructor() {
try {
    this.hs = hl;
this.varsList = "xyz";


} catch(e) {
hl("colorDetails constructor error: " + e.message);
} // catch
}; // constructor

// getContainerObjects returns the div with all radios & comboboxes
getContainerObjects() {
hl("Getting details container");
const div = document.createElement("div");
div.setAttribute("class", "detailsContainer");
div.setAttribute("id","detailContainer")
const h = document.createElement("h3");
h.setAttribute("id", "detailHeading");
h.textContent = "Edit the Details for Lewis ";
div.appendChild(h);
return div;
}; // getContainerObjects
// Load up the combo boxes
LoadColorVars() {
hl("Loading Color Details");
// this.heading = this.containter.querySelector("#detailHeading"); // detailHeading
};  // loadColorVars


connected(root) {
hl("Connected Details.");
this.container = root.querySelector("#detailContainter");
this.LoadColorVars();
} // connected

setHeading(text = "Edit color") {

    try {
if (this.heading !== null) {
this.heading.textContent = text;
this.hs(text);
};
    } catch(e) {
hl("colorDetals.setHeading: " + e.message)
    }; // catch
}; // setHeading


}; // class colorDetails

