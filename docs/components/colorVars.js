import {helpLog as hl, getJSON, getCssVar  as getRootVar} from "./utils.js";
import { colorDetails } from "./colorDetails.js";




"use strict";

/*  
   Color Css Vars Class encapsulation

*/
export class colorCssVars   {
names ;
variables;
computedVariables = [];
listBox;
hs;
tmrDetails = null;
keyDetail = "";//  Key value to fill details
timeDetail = 0; // Used to to delay details refresh
details;

constructor() {
try {
    this.tmrDetails = null; 

    // Set it to HelpLog until caller decides otherwise.
    this.hs = hl;
    
    this.details = new colorDetails();
    const ln = (data) => {        this.names = data;};
    const lv = (data) => {        this.cleanUpColorVars(data);};
    getJSON("../data/colorNames.json", ln)
    getJSON("../data/ColorDefaults.json", lv)

    
} catch(e) {
    hl("cssColorVar constructor error: "+ e.message)
}; // catch
} // constructor

cleanUpColorVars( data) {
const vars = data;
const parents = [];
const pn = [];
vars.forEach((e) => {
    if ((e.parent_fg.trim() === "") || (e.parent_bg.trim() === "")) {
        parents.push(e);
    };
}); // foreach
parents.forEach((c) => {
if (c.parent_fg.trim() === "") { c.fg =  this.getRootValue( c, "fg");};
if (c.parent_bg.trim() === "") {c.bg = this.getRootValue( c,  "bg");};
}); //foreach parents
    this.variables = vars;
}; //  cleanUpColorVars


getRootValue(  cssVar, suffix) {
    let value = (( suffix === "fg" ? cssVar.fg : cssVar.bg))

    try {
        const cv = "--" + cssVar.name + "_" + suffix;
        if (value.trim() === "") {
            value = getRootVar(cv);
            
    };//  value empty

    } catch (e) {
hl("colorVars getRootVar error: " + e.message); 
    } // catch
    return value;
}; // getRootValues

getListBox() {
    const div = document.createElement("div");

    try {
        div.setAttribute("class", "containerColorVarsList");
        const h = document.createElement("h3");
        h.textContent = "Select a color Variable to view or edit?";
        h.setAttribute("id","colorVarsHeader");
        div.appendChild(h);
        
        const s = document.createElement("select");        
        s.setAttribute("id", "lbColorVariable");
        s.setAttribute("aria-labeledby", "colorVarsHeader");
        s.setAttribute("class","colorVarListBox");
        s.setAttribute("size", "6");
        div.appendChild(s);
        
        
    } catch(e) {
hl( "ColorVars getListBox Error: " + e.message);
    } // catch
return div;
} // getListBox

// GetDetails container objects
getDetailsContainer() {
    const d = this.details;
    const o = d.getContainerObjects();
    hl("Details object: " + o);

return o;
}; // getDetailsContainer

makeListItem( text, value) {
    const li  = document.createElement("li")
    try {

        const sp = document.createElement("span");
        sp.setAttribute("class", "colorVarSpan")
        const a = document.createElement("a");
        a.setAttribute("name", "colorVar");
        a.setAttribute("value", value);
        a.textContent = text;
        const det = (e) => { this.setDetails(e,  value);}
    
        sp.appendChild(a);
        li.appendChild(sp);;
    } catch(e) {
        hl("colorVars makeListItem error: " + e.message);
    } // catch

    return li;
} // makeListItem

// Loaded Color Names and Color Defaults/variables
hasLoaded() {   
return ( (this.names !== undefined) && ( this.variables !== undefined));
} // hasLoaded

// Connectedd... Should call after DOM has loaded
connected(root, tries = 0) {
// hl("Color Vars Connected called.");
try {
     if ( ! this.hasLoaded()) {
        if ( tries < 10 ) {
const tryAgain = (r, t) =>  { this.connected(r, t);};
// hl("Connected waiting for load of colorVars trying again.. " + tries)
setTimeout(tryAgain, 200, root, ++tries );
        } else { 
hl("Color Vars failed to load, Connected is aborting..");
     } // tries
    } else {
        // hl("Redy to connect");
this.listbox = root.querySelector("#lbColorVariable");
if (this.listbox === undefined) { hl("color var listbox not found.");};
this.details.connected(root);
// compute all variables..
this.setComputedAllVariables();
this.LoadColorVars();
this.details.names = this.names;



    } // if ! hasLoaded
} catch(e) 
{
hl( "connected colorVars error: " + e.message);
} // catch

} // connected

// Loading ListbBox Color Variables
LoadColorVars() {
    try {
hl("Loading color Vars");
const lb = this.listbox;
    const vs = this.variables;
vs.forEach( cv => {    lb.appendChild(this.makeListItem(cv.name, cv.name));}); 
this.hs("Color Variables Loaded by Lewis");

} catch(e) {
hl("colorVArs LoadColorVars error: " + e.message);
    } // catch

} // loadColorVars

// trying this
async eventDetails(e) {
try {
    this.keyDetail  = e.target.value;    
    const today = new Date();
    this.timeDetail = today.getMilliseconds(); 
    const el = 450;  // Timer elapse
    const det = (tm, key) => { this.setDetails( tm, key);};
    this.tmrDetails = setTimeout(det, el, el,  this.keyDetail); // timeout elapse and as a parameter
} catch(err) {
hl("eventDetails error: " + err.message);
} // catch

    
} // eventDetails

// Event setDetails
async setDetails (tm, key  ) {
    try {
        // Only if this timeout is for this key
        if (this.keyDetail === key) {
        const today = new Date(); 
        // Try to find out if this timeout is within the tm set
        const el = Math.abs( Math.abs( today.getMilliseconds() - this.timeDetail) - tm); 
        // check if within reason for timeout....
        if (el < 50) {

            const m = "You selected " + key ;
        //  this.hs( m);
         hl(m);
        }; // if elapsed diff is reasonable
    }; // if timeout is for the current keyDetail
    } catch (err) {
        hl("colorvars setDetails error: " + err.message);
    } // catch
    } // setDetails


// Will help set and populate computedVariables array
setComputedAllVariables() {
    try {
        // Force recalc of all computedVarables
this.computedVariables.length = 0;        
        const cvars = this.variables;
        cvars.foreach((cv) => {
             this.getNewCssValue(cv.name, "fg")
             this.getNewCssValue(cv.name, "bg")
        }); foreach
    } catch(e) {
        hl("colorVars.setComputedAllVariables error: " + e.message);
    }; // catch
}; // setComputedAllVariables


// Sets the computed variable to the specified value
 setComputedVariable( colorName, suffix, value) {
try {
    const cn = colorName.toUpperCase();
    const cVars = this.computedVariables;
    let cv = cVars .find((v) => { return ( v.name === cn);}) ;


    if (cv === undefined) {
        cv = { "name": cn, "fg": "", "bg": ""};
        this.computedVariables.push(cv);
    };
if (suffix === "fg") { cv.fg = value;}
else { cv.bg = value; };
} catch(e) {
hl("colorVar.setComputedVariable error: " + e.message);
}; // catch
 }; // setComputedVariable


    // Will find the value for the color specified. Searches parents until found.
    getNewCssValue( name, suffix, tries = 0) {
try {const vars = this.variables;
  const val = vars.find( e =>  e.name === name );
if (val !== undefined) {
    let parent, color;
if (suffix === "fg") {
color = val.fg;
parent = val.parent_fg;
} else {
    color = val.bg;
    parent = val.parent_bg;
} // suffix if fg  or bg
// Now test if color is set or parent is set
if (color.trim() === "") {
    // No color found now check recursion via tries
    if (tries > 12) {
        hl("Circular references abortingAborting color get: " + name);
        return "";
    } else {
        // Keep looking down the parent for the color
        const [ n, s] = this.parseColorVar( parent);
        return this.getNewCssValue( n, s, ++tries);
    }; // tries test for abort or keep looking
} else { 
    // Found the color
    return color;
} ;  
} else {  
    // invalid Css Color varialbe not found in list
hl( name + "_" + suffix + "  was not found...");
    return "";
}; // if color found in list
} catch(e) {
hl("colorVar.ewCssValue error: " + e.message);
}; // catch
    }; //getNewCssValue

// parseColorVar returns [ name, suffix]
    parseColorVar( cVar) {
        const cn = cVar.trim().replace(/^--/, "");
const iSuffix = cn.search(/(?<=_)[f|b]g/);
const  ll = (name.length - 3 );
try {
if (iSuffix != -1) {
const suffix = cn.substr(iSuffix);
const n = cn.substr(0,  iSuffix - 1)
return [n, suffix];
} else {
  return [cn, ""];
}; // if has suffix else

}   catch(e) {
  hl("colorVar.parseColorVar error: " + e.message);
}; // catch
    }    ; // parseColorVar


} // class colorCssVars  
