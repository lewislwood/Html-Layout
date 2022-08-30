import {helpLog as hl} from "./utils.js";
import {colorDetailStyle } from "./styles/colorDetailStyles.js";


"use strict";

/***************
 *    Used by colorCssVars   .  Provides details for the list.
 *   by Lewis Wood
 * *********/

export class colorDetails {
    names;
    currentVar;
hs;
varsList = 0;
parent;
current;
container;
heading;
loading= true; // Disables auto event handling wile loading
computedColor = { "fg": null, "bg": null  }; // quick access to computed values.
Parents = { "fgName": "",  "fg": null,"bgName": "",  "bg": null };  // used to reset to default if they do not change color.
fgChildren = []; // Current descendants of currentVar
bgChildren = []; // Current descendants of currentVar
listStylesUpdate = [];// List of variables to update list style. Reset just after update.
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
this.setCurrentVariable(colorName);

this.heading.focus();
    } catch(e) {
hl("colorDetail.editColorDetail error: " + e.message);
    };


}; // editColorDetail

 setCurrentVariable(  colorName ) {
try {
const vs = this.parent.variables;
this.loading = true;
const cv = vs.find((v) => { return (v.name === colorName);});
this.currentVar = cv;
this.setHeading("editing " + cv.name);
this.setParents();


this.loading = false;
} catch(e) {
hl('colorDetails.setCurrentVariable error: '+ e.message);
}; //  catch
}; // setCurrentVariable 







 setParents(    ) {
try {
    const ps = this.Parents; 
    const cv = this.currentVar;
// Clear parents first
ps.fg = null; ps.bg = null;
ps.fgName = ""; ps.bgName = "";
const p = this.parent;

if ( this.hasParent("fg") === true) {
ps.fgName = cv.parent_fg;
ps.fg = this.getParentComputedValue(ps.fgName);
}; // if hasParent fg

if ( this.hasParent("bg") === true) {
    ps.bgName = cv.parent_bg;
    ps.bg = this.getParentComputedValue(ps.bgName);
    }; // if hasParent fg

} catch(e) {
hl('colorDetails.setParents error: '+ e.message);
}; //  catch
}; // setParents 

 getParentComputedValue(  theParent ) {
try {
const p = this.parent;
const [n, suffix] = p.parseColorVar(theParent);
const color = p.getComputedValue(n, suffix);
return color;
} catch(e) {
hl('colorDetails.getParentComputedValue error: '+ e.message);
}; //  catch
}; // getParentComputedValue 




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

 hasParent(  fg_bg = 'fg' ) {
try {
    const cv = this.currentVar;
const p = ((fg_bg === "fg") ? cv.parent_fg : cv.parent_bg);
return (p !== "");
} catch(e) {
hl('colorDetails.hasParent error: '+ e.message);
}; //  catch
}; // hasParent 

    




}; // class colorDetails

