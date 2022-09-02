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
lbSuffix;  // ListBox fg/bg
loading= true; // Disables auto event handling wile loading
computedColor = { "fg": null, "bg": null  }; // quick access to computed values.
Parents = { "fgName": "",  "fg": null,"bgName": "",  "bg": null };  // used to reset to default if they do not change color.
fgChildren = []; // Current descendants of currentVar
bgChildren = []; // Current format: { 'name', "suffix"}
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

async  setCurrentVariable(  colorName ) {
try {
const vs = this.parent.variables;
this.loading = true;
const cv = vs.find((v) => { return (v.name === colorName);});
this.currentVar = cv;
this.setHeading("editing " + cv.name);
this.setParents();
const fg = this.setChildren("fg");
const bg = this.setChildren("bg");
// Debugging...
hl("Children: " + [JSON.stringify(this.fgChildren), JSON.stringify(this.bgChildren)].join(" | "))

this.loading = false;
} catch(e) {
hl('colorDetails.setCurrentVariable error: '+ e.message);
}; //  catch
}; // setCurrentVariable 

 setChildren(  fg_bg="fg" ) {
try {
const colorName = this.currentVar.name + "_" + fg_bg;
const children = this.getChildren(colorName);
// Help debug the JSON file. spaces are common.
// hl(fg_bg + " childeren found: " + children.length + " " + children.join(", "));
const sfx = (( fg_bg === "fg") ? this.fgChildren : this.bgChildren); 
sfx.slice(0);
//Now parse children to name, suffix parts for quick setting color value
const p = this.parent;
children .forEach( ( cn) => {
const [n, suffix] = p.parseColorVar(cn);
sfx.push({ 'name': n, "suffix": suffix});
}); // forEach
// Debugging purposes...
// if (sfx.length > 0 ) { hl( JSON.stringify( sfx));}



} catch(e) {
hl('colorDetails.setChildren error: '+ e.message);
}; //  catch
}; // setChildren 

 getChildren(  colorName ) {
try {
const cvs = this.parent.variables;
let children = [];
cvs.forEach((v) => {
    // hl( [colorName, v.parent_fg, v.parent_bg].join(","));
    if (v.parent_fg === colorName) { children.push(v.name + "_fg");};
    if (v.parent_bg === colorName) { children.push(v.name + "_bg");};
}); // forEach
if (children.length > 0) {
  let rv = [];  
children.forEach((p) => {
const ch = this.getChildren (p);      
children = [... children, ... ch]
}); // forEach children
}; // if children
return children;



} catch(e) {

hl('colorDetails.getChildren error: '+ e.message);
}; //  catch
}; // getChildren 





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

div.appendChild(this.makeSuffixRadios());
div.appendChild( this.makeColorRadios());

return div;
}; // getContainerObjects

 makeColorRadios(    ) {
try {
// Radio Suffix fg_bg
const div = document.createElement("div");
div.setAttribute("class", "rdColorContainter");
div.setAttribute("id","rdColorContainter");

// custom Radio
const spCU = document.createElement("span");
spCU.setAttribute("class","spanColorRadio");
const lCU = document.createElement("label");
lCU.setAttribute("class","labelRadios");
lCU.setAttribute("id","lblCU");
lCU.textContent  = "Custom Color";
lCU.setAttribute("for","rdCustom");
const cu= document.createElement("input");
cu.setAttribute("type","radio");

cu.setAttribute("name","editColor");
cu.setAttribute("id","rdCustom");
cu.setAttribute("aria-labeledby","lblCU");

spCU.appendChild(lCU);
spCU.appendChild(cu);

// parentRadioRadio
const spPA= document.createElement("span");
spPA.setAttribute("class","spanColorRadio");
const lPA= document.createElement("label");
lPA.setAttribute("class","labelRadios");
lPA.setAttribute("id","lbspPAlPA");
lPA.textContent  = "Parent Color";
lPA.setAttribute("for","rdParent");
const pa= document.createElement("input");
pa.setAttribute("type","radio");

pa.setAttribute("name","editColor");
pa.setAttribute("id","rdParent");
pa.setAttribute("aria-labeledby","lblPA");

spPA.appendChild(lPA);
spPA.appendChild(pa);

// Named radio
const spNA = document.createElement("span");
spNA.setAttribute("class","spanColorRadio");
const lNA= document.createElement("label");
lNA.setAttribute("class","labelRadios");
lNA.setAttribute("id","lblNamed");
lNA.textContent  = "Named Color";
lNA.setAttribute("for","rdNamed");
const na = document.createElement("input");
na.setAttribute("type","radio");

na.setAttribute("name","editColor");
na.setAttribute("id","rdNamed");
na.setAttribute("aria-labeledby","lblNamed");

spNA.appendChild(lNA);
spNA.appendChild(na);


div.appendChild(spCU);
div.appendChild(spPA);
div.appendChild(spNA);
return div;
} catch(e) {
        
hl('colorDetails.makeColorRadios error: '+ e.message);
}; //  catch
}; // makeColorRadios 


 makeSuffixRadios(    ) {
try {
// Radio Suffix cu_bg
const div = document.createElement("div");
div.setAttribute("class", "rdSuffixContainer");
div.setAttribute("id","rdSuffixContainer");

//custom Radio
const spFG = document.createElement("span");
spFG.setAttribute("class","spanSuffix");
const lFG = document.createElement("label");
lFG.setAttribute("class","labelRadios");
lFG.setAttribute("id","lblFG");
lFG.textContent  = "foreground";
lFG.setAttribute("for","rdFG");
const fg = document.createElement("input");
fg.setAttribute("type","radio");

fg.setAttribute("name","fg_bg");
fg.setAttribute("id","rdFG");
fg.setAttribute("aria-labeledby","lblFG");

    spFG.appendChild(lFG);
spFG.appendChild(fg);



// BG Radio
const spBG = document.createElement("span");
spBG.setAttribute("class","spanSuffix");
const lBG = document.createElement("label");
lBG.setAttribute("class","labelRadios");
lBG.setAttribute("id","lblBG");
lBG.textContent  = "background";
lBG.setAttribute("for","rdBG");
const bg = document.createElement("input");
bg.setAttribute("type","radio");

bg.setAttribute("name","fg_bg");
bg.setAttribute("id","rdBG");
bg.setAttribute("aria-labeledby","lblBG");

spBG.appendChild(lBG);
spBG.appendChild(bg);


fg.setAttribute("checked", "true");
div.appendChild(spFG);
div.appendChild(spBG);
return div;
} catch(e) {
hl('colorDetails.makeSuffixRadios error: '+ e.message);
}; //  catch
}; // makeSuffixRadios 



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

 hasParent(  bgbgbg_bg = 'fg' ) {
try {
    const cv = this.currentVar;
const p = ((fg_bg === "fg") ? cv.parent_fg : cv.parent_bg);
return (p !== "");
} catch(e) {
hl('colorDetails.hasParent error: '+ e.message);
}; //  catch
}; // hasParent 

    




}; // class colorDetails

