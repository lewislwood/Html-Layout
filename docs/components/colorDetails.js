import {helpLog as hl} from "./utils.js";
import {colorDetailStyle } from "./styles/colorDetailStyles.js";


"use strict";

/***************
 *    Used by colorCssVars   .  Provides details for the list.
 *   by Lewis Wood
 * *********/

export class colorDetails {
    currentVar;
hs;
varsList = 0;
parent;
current;
container; // Main Color Detail Containter
heading; // Heading for the container
rdFG; // Foreground Radio 
rdBG;// background radio
rdCustom; // Custom Color Radio
rdParent; // Parent Color radio
rdNamed;  // Named Color radio
cbColorParent; // Parent color combobox
cbColorNamed; // Named Colors combobox
lblEdit; // label for input color picker
inputColorEdit; // input Color Picker
loading= true; // Disables auto event handling wile loading
fgChildren = []; // Current descendants of currentVar
bgChildren = []; // Current format: { 'name', "suffix"}
childrenString = { "fg": "", "bg": "" };   // Quick search for isChild
listStylesUpdate = [];// List of variables to update list style. Reset just after update.
parentOptions;  // Array of Options, easy searches
namedOptions;
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


editColorDetail( colorName, moveTo = true) {
    try {
this.setCurrentVariable(colorName);

if (moveTo === true) {this.heading.focus();};
    } catch(e) {
hl("colorDetail.editColorDetail error: " + e.message);
    };


}; // editColorDetail

async  setCurrentVariable(  colorName ) {
try {
const vs = this.parent.variables;
const reg = new RegExp(colorName, "i");
this.loading = true;
const cv = vs.find(v => reg.test(v.name) );
this.currentVar = cv;
const p = this.parent;
const proper = (name) => { return (name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase()) ;}
// make description with proper names
const makeDesc = (name) => {
const an = name.split("-");
return an.map((n)=> { return proper(n)  } ).join(" ");
}; // makeDesc

this.setHeading("Editing " + makeDesc (cv.name));
const fg = this.setChildren("fg");
const bg = this.setChildren("bg");
this.setSuffix("fg");

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
const sfx = (( fg_bg === "fg") ? this.fgChildren : this.bgChildren); 
sfx.slice(0);
const nBase = this.currentVar.name ;
const str = ((children.length > 0) ? children.join(" ") : "") + " " +nBase + "_fg " + nBase + "_bg" ;
if (fg_bg === 'fg') {    this.childrenString.fg = str;
} else {    this.childrenString.bg = str;    };// setting search string
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







// getContainerObjects returns the div with all radios & comboboxes
getContainerObjects() {
const div = document.createElement("div");
div.setAttribute("class", "detailsContainer");
div.setAttribute("id","detailContainter")
// const h = document.createElement("h3");
// h.setAttribute("id", "detailHeading");
// h.setAttribute("tabindex", "0");
// h.textContent = "Editing Color";
// div.appendChild(h);

div.appendChild(this.makeSuffixRadios(div));
// this.makeSuffixRadios(div)
div.appendChild( this.makeColorRadios());

div.appendChild( this.makeColorComboBoxes());
return div;
}; // getContainerObjects


 makeColorComboBoxes(    ) {
try {
const div = document.createElement("div");
div.setAttribute( "class", "cbColorContainer");
div.setAttribute( "id", "cbColorContainer");
// span to contain label and color input
const spn = document.createElement("span");
spn.setAttribute("class", "spanEditColor")

// Label  Edit Color edit disabled
const lbl  = document.createElement("label");
lbl.setAttribute( "class", "lblEdit");
lbl.setAttribute( "id", "lblEdit");
lbl.textContent = "Edit Color";
lbl.setAttribute("for", "inputColorEdit");

const inp = document.createElement("input");
inp.setAttribute("type","color");
inp.setAttribute("id","inputColorEdit");
inp.setAttribute("class","inputColorEdit");
inp.setAttribute("aria-labeledby","lblEdit");

spn.appendChild(lbl);
spn.appendChild(inp);


// cbParent color combobox
const cbP = document.createElement("select");
cbP.setAttribute( "class", "cbColorParent");
cbP.setAttribute( "id", "cbColorParent");
cbP.setAttribute( "aria-label", "Select Parent Color");


// cbNamed color combobox
const cbN = document.createElement("select");
cbN.setAttribute( "class", "cbColorNamed");
cbN.setAttribute( "id", "cbColorNamed");
cbN.setAttribute( "aria-label", "Select Named Color");

div.appendChild(cbN);
div.appendChild(cbP);
div.appendChild(spn);

return div;
} catch(e) {
hl('colorDetails.makeColorComboBoxes error: '+ e.message);
}; //  catch
}; // makeColorComboBoxes 

 makeColorRadios(    ) {
try {
// Radio Custom, parent, named
const div = document.createElement("div");
div.setAttribute("class", "rdColorContainter");
div.setAttribute("id","rdColorContainter");

// Named radio
const spNA = document.createElement("span");
spNA.setAttribute("class","spanColorRadio");
const lNA= document.createElement("label");
lNA.setAttribute("class","labelRadios");
lNA.setAttribute("id","lblNamed");
lNA.textContent  = "Named Color.";
lNA.setAttribute("for","rdNamed");
const na = document.createElement("input");
na.setAttribute("type","radio");
na.setAttribute("name","editColor");
na.setAttribute("id","rdNamed");
na.setAttribute("aria-labeledby","lblNamed");
spNA.appendChild(lNA);
spNA.appendChild(na);

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
lPA.textContent  = "Parent Color..";
lPA.setAttribute("for","rdParent");
const pa= document.createElement("input");
pa.setAttribute("type","radio");

pa.setAttribute("name","editColor");
pa.setAttribute("id","rdParent");
pa.setAttribute("aria-labeledby","lblPA");

spPA.appendChild(lPA);
spPA.appendChild(pa);




div.appendChild(spNA);
div.appendChild(spPA);
div.appendChild(spCU);

return div;
} catch(e) {
        
hl('colorDetails.makeColorRadios error: '+ e.message);
}; //  catch
}; // makeColorRadios 


 makeSuffixRadios() {
try {
// Radio Suffix cu_bg
const div = document.createElement("div");
div.setAttribute("class", "rdSuffixContainer");
div.setAttribute("id","rdSuffixContainer");

const h = document.createElement("h3");
h.setAttribute("id", "detailHeading");
h.setAttribute("tabindex", "0");
h.textContent = "Editing Color";
div.appendChild(h);


//FG
const spFG = document.createElement("span");
spFG.setAttribute("class","spanSuffix");
const lFG = document.createElement("label");
lFG.setAttribute("class","labelRadios");
lFG.setAttribute("id","lblFG");
lFG.textContent  = "Fore Ground ";
lFG.setAttribute("for","rdFG");
const fg = document.createElement("input");
fg.setAttribute("type","radio");
fg.setAttribute("class", "ColorRadio");
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
lBG.textContent  = "Back Ground";
lBG.setAttribute("for","rdBG");
const bg = document.createElement("input");
bg.setAttribute("type","radio");
bg.setAttribute("class", "ColorRadio");
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
async LoadColorVar() {
try {
    hl("Loading Color Details");
    this.hs = this.parent.hs;
    await this.queryControls();
await     this.makeNamedOptions();
await this.makeParentOPtions(); 
await  setTimeout( () => {
    let cb = this.cbColorParent;
this.parentOptions =   Array.from( cb.options);
cb = this.cbColorNamed;
this.namedOptions = Array.from( cb.options);
},300) // setTimeOut


const p = this.parent;
// edit 1st color after array , do not set focus
const name = p.variables[0].name;
// Change tab order

this.rdFG.setAttribute("tabIndex", 1);
this.rdBG.setAttribute("tabIndex", 2);
this.rdNamed.setAttribute("tabIndex", 3);
this.cbColorNamed.setAttribute("tabIndex", 4);
this.rdParent.setAttribute("tabIndex", 5);
// this.cbColorParent.setAttribute("tabIndex", 6);
// this.rdCustom.setAttribute("tabIndex", 7);



const editColor = () => { this.editColorDetail(name, true);};
await setTimeout( editColor , 1000);

await this.addListeners();
} catch(e) {
hl("colorDetail.lodColorVar error: " + e.message);
}; // catch
};  // loadColorVar

 addListeners(    ) {
try {
    hl("Adding Listeners...");
const setSuffix  = (sfx) => {
    this.setSuffix(sfx);
}; //setSuffix("sfg")
this.rdFG.onchange = (e) => { setSuffix("fg");} ;
this.rdBG.onchange = (e) => { setSuffix("bg");} ;;
const evColor = (e) => { this.changeColorRadio(e); };
this.rdNamed.onchange = (e) => {  evColor(e);};
this.rdParent.onchange = (e) => {  evColor(e);};
this.rdCustom.onchange = (e) => {  evColor(e);};

const evColorValue = ( m, e) => { this.changeColorValue(m, e); };
this.cbColorNamed.onchange = (e) => {evColorValue("n", e);};
this.cbColorParent.onchange = (e) => {evColorValue("p", e);};
this.inputColorEdit.onchange = (e) => {evColorValue("c", e);};

} catch(e) {
hl('colorDetails.addListeners error: '+ e.message);
}; //  catch
}; // addListeners 

 changeColorValue(  mode = "c" , event) {
try {
const cur = this.currentVar;
const colorName = cur.name;
const p = this.parent;
const suffix = ((this.rdFG.checked === true) ? "fg" : "bg");


switch(mode) {
    case 'n':
hl("Named color changed.: " + this.cbColorNamed.value);
this.inputColorEdit.value = this.cbColorNamed.value;
p.setColorValue(colorName, suffix, this.inputColorEdit.value);


break   ;
case 'p':
hl("Parent color changed");
const i  = this.cbColorParent.selectedIndex;
const o =  ((i >= 0) ?    this.cbColorParent.options[i ] : null);
if (i > 0) {
p.setColorParent(colorName, suffix, o.getAttribute("data-name") );
}  else {
    p.setColorValue( colorName, suffix, this.inputColorEdit.value);
};
    break;
    case "c":
        hl("Color Picker changed.");
        p.setColorValue(colorName, suffix, this.inputColorEdit.value);
        break;
}; // switch
// hl("New Color is: " + this.inputColorEdit.value);
if (mode !== 'n') { this.findNamedColor(suffix);};
this.styleColor();

} catch(e) {
hl('colorDetails.changeColorValue error: '+ e.message);
}; //  catch
}; // changeColorValue 

// Style Color for details and children if any
 styleColor(  skipChildren = false ) {
try {
const p = this.parent;
const cv = this.currentVar;
const fg = p.getColorValue( cv.name, "fg");
const bg = p.getColorValue( cv.name, "bg");

this.inputColorEdit.setAttribute("style", `backgroud-color: $${this.inputColorEdit.value};`);
this.heading.setAttribute("style", `color: ${fg};background-color:${bg};`)
// hl("Styled color");
if (skipChildren === false) {
    // const parsed = color.replace("--","").toLowerCase().split("_");
const ch = ((this.rdFG.checked === true)? this.fgChildren : this.bgChildren );
ch.forEach((c) => {
p.setListStyle(c.name);
}); // forEach child
// Now update this colorslist item style
p.setListStyle(cv.name);
};  // skip Children ? 
} catch(e) {
hl('colorDetails.styleColor error: '+ e.message);
}; //  catch
}; // styleColor 





 changeColorRadio(  event ) {
try {
this.cbColorNamed.disabled = (  this.rdNamed.checked === false);
this.cbColorParent.disabled = (  this.rdParent.checked === false);
this.inputColorEdit.disabled = (  this.rdCustom.checked === false);
const lbl = ((this.inputColorEdit.disabled === true) ? "Editing Disabled": "Edit Color");
this.lblEdit.textContent = lbl;

} catch(e) {
hl('colorDetails.changeColorRadio error: '+ e.message);
}; //  catch
}; // changeColorRadio 


 queryControls(    ) {
try {
const c = this.container    ;
this.heading = c.querySelector("#detailHeading"); // detailHeading
if (this.heading  === null) { throw new Error("detailHeading not found."); };
    this. rdFG = c.querySelector("#rdFG");
    if (this.rdFG === null) { throw new Error("rdFG not found."); };

    this. rdBG = c.querySelector("#rdBG");
    if (this.rdBG === null) { throw new Error("rdBG not found."); };

    this. rdCustom = c.querySelector("#rdCustom");
    if (this.rdCustom === null) { throw new Error("rdCustom not found."); };

    this. rdParent = c.querySelector("#rdParent");
    if (this.rdParent === null) { throw new Error("rdParent not found."); };
    this. rdNamed = c.querySelector("#rdNamed");
    if (this.rdNamed === null) { throw new Error("rdNamed not found."); };
    this. cbColorParent = c.querySelector("#cbColorParent");
    if (this.cbColorParent === null) { throw new Error("cbColorParent not found."); };
    this. cbColorNamed = c.querySelector("#cbColorNamed");
    if (this.cbColorNamed === null) { throw new Error("cbColorNamed not found."); };
 
    this. inputColorEdit = c.querySelector("#inputColorEdit");
    if (this.inputColorEdit === null) { throw new Error("inputColorEdit not found."); };
    this. lblEdit= c.querySelector("#lblEdit");
    if (this.lblEdit=== null) { throw new Error("lblEdit not found."); };
    
} catch(e) {
hl('colorDetails.queryControls error: '+ e.message);
}; //  catch
}; // queryControls 


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

 makeParentOPtions(    ) {
try {
    const cvs = this.parent.variables;
const ps = [];
cvs.forEach( (c) => {
    ps.push( c.name + "_bg");
    ps.push( c.name + "_fg");
}); // forEach
const cb = this.cbColorParent;
ps.sort();
const makeOption = (name, text, value) => {
    const o = document.createElement("option");
    o.setAttribute("value", value);
    o.setAttribute("data-name", name.toLowerCase());
    o.textContent = text;
    return o;
}; // makeOption
const proper = (name) => { return (name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase()) ;}
// make description with proper names
const makeDesc = (name) => {
    const vs = name.split("_");
const an = vs[0].split("-");
return( an.map((n)=> { return proper(n)  } ).join(" ")+ " "  + vs[1])
}; // makeDesc

cb.appendChild( makeOption("custom", " Custom", "custom") );
   ps.forEach((c) => { 
    cb.appendChild(makeOption(c, makeDesc(c) , c)); 
       } ); // forEach
} catch(e) {
hl('colorDetails.makeParentOPtions error: '+ e.message);
}; //  catch
}; // makeParentOPtions 

// loads up the Named Colors combobox
 makeNamedOptions(    ) {
try {
    const makeOption = (text, value) => {
        const o = document.createElement("option");
        o.setAttribute("value", value);
        o.textContent = text;
        return o;
    }; // makeOption
const cb = this.cbColorNamed;
const names = this.parent.names;
names.sort( (a,b) => { return ((a.name > b.name)? 0 : -1); });
cb.appendChild( makeOption(" ", "custom"));
names.forEach((nc) => { cb.appendChild( makeOption(nc.name,nc.color));});


} catch(e) {
hl('colorDetails.makeNamedOptions error: '+ e.message);
}; //  catch
}; // makeNamedOptions

 async setSuffix(  fg_bg="fg" ) {
try {
this.loading = true;
const rd = ((fg_bg === 'fg') ? this.rdFG : this.rdBG);
rd.checked = true;
const cv = this.currentVar;
const parent = ((fg_bg === "fg") ? cv.parent_fg : cv.parent_bg) ;
this.clearParentOptions(fg_bg, parent);
if (this.hasParent(fg_bg) === true) { this.rdParent.checked = true; }
else { this.rdCustom.checked = true;} ;

this.findNamedColor(fg_bg);
if ((this.cbColorNamed.selectedIndex > 0)  && (this.rdCustom.checked === true)) { this.rdNamed.checked = true;};

this.changeColorRadio();
this.styleColor(true);
} catch(e) {
hl('colorDetails.setSuffix error: '+ e.message);
} finally {
this.loading = false;
} ; // finally

}; // setSuffix 

 findNamedColor(  fg_bg = 'fg' ) {
try {
    const p = this.parent;
    const cur  = this.currentVar;
const color = p.getColorValue(cur.name, fg_bg);
let index = -1;
const options = this.namedOptions;
const reg = new RegExp(color,"i");

if (color.substr(0,1) === "#") {
    index = options.findIndex((o) => { return reg.test(o.value); });
} else {
    index = options.findIndex((o) => { return reg.test(o.text); });
    if (index <= 0) {
    const reg2 = new RegExp("#000000","i");
    index = options.findIndex((o) => { return reg2.test(o.value); });
}; // force to use default value
}; // if hex color or name

this.cbColorNamed.selectedIndex = index;

const findColor = ((index> 0)? this.namedOptions[index].value : color);
const iC = this.inputColorEdit;
// Do not want to trigger change events, unless actual change
if (iC.value !== findColor )  { iC.value = findColor ;};


} catch(e) {
hl('colorDetails.findNamedColor error: '+ e.message);
}; //  catch
}; // findNamedColor 


 async clearParentOptions(     fg_bg = "fg", selectParent = "") {
try {
    const excludeStrList = this.excludeStringList(fg_bg);
    const isExcluded= (n) => { return ( excludeStrList  .indexOf(n) > -1) ;};
const options = this.parentOptions;
const cb = this.cbColorParent;
const opts = Array.from( cb.options);
opts.forEach( (o) => {
    o.remove();
    o.selected = false;
});
options.forEach((o) => { 
const n = o.getAttribute("data-name");
if (! isExcluded(n)) {
    cb.appendChild(o);  
    if (n === selectParent) { o.selected = true;};
}; //  if not Excluded
}); // forEach
} catch(e) {
hl('colorDetails.clearParentOptions error: '+ e.message);
}; //  catch
}; // clearParentOptions 

 isChild(  fg_bg, parentColor ) {
try {
const str = this.excludeStringList(fg_bg); 
return (excludeStrList.indexOf(parentColor ) > -1);
} catch(e) {
    hl("colordetails.isChild error: " + e.message);
}; //  catch
}; // isChild 

 excludeStringList(  fg_bg = "fg" ) {
try {
    const ch = this.childrenString;
    return ((fg_bg === "fg") ? ch.fg : ch.bg);
} catch(e) {
hl('colorDetails.excludeStringList error: '+ e.message);
}; //  catch
}; // excludeStringList 


}; // class colorDetails

