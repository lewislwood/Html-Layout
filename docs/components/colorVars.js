import {helpLog as hl, getJSON, getCssVar  as getRootVar} from "./utils.js";
import {colorVarStyle } from "./styles/colorVarStyles.js";
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
lbItems = []; // Actual Items in listBox, used for styling
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
    
    this.details = new colorDetails(this);
    const ln = (data) => {        this.names = data;};
    const lv = (data) => {        this.cleanUpColorVars(data);};
    getJSON("data/colorNames.json", ln)
    getJSON("data/ColorDefaults.json", lv)

    
} catch(e) {
    hl("cssColorVar constructor error: "+ e.message)
}; // catch
} // constructor

// Will combine detail styles as well, your choice. Thus 2 different shadow roots if not combined.
getStyleObject( DetailCombined = true) {
try {
const st = document.createElement("style"); 
let  styleText = colorVarStyle ;
if (DetailCombined  === true) {
    const ds = this.getDetailStyleObject();
    styleText  = styleText  + ds.textContent;
};
st.textContent = styleText ; 
return st;
} catch(e) {
    hl("colorvar.getStyleObject error: " + e.message);
}; // catch
}; // getStyleObject

getDetailStyleObject() {
    const d = this.details;
    hl("Detail object is " + d);
    return d.getStyleObject();
}; // getDetailStyleObject


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
        
        const s = document.createElement("ul");        
        s.setAttribute("id", "lbColorVariable");
        // s.setAttribute("aria-labeledby", "colorVarsHeader");
        s.setAttribute("class","colorVarListBox");
        // s.setAttribute("size", "6");
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
        // hl("Making item : " +text )
        // li.setAttribute("tabindex", "1");

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

// setAllListStyles with class name=colorVar
// Should only need to reload when initially connected. Calls setStyle for eacth listItem
setAllListStyles( reLoad = true) {
try {
    const lbI = this.lbItems;
    if ((reLoad === true) || ( lbI.length === 0 )){ 
        lbI.slice(0);
    } // Reload
const lb = this.listBox;
const qs = lb.querySelectorAll('.colorVarSpan  a');  //.colorVarSpan //[name*="colorVa"r]

const els = Array.from( qs); 
els.forEach( (v) => {
const value = v.getAttribute("value");
const item = { "name": value, "item": v};
lbI.push( item);
this.setListStyle(value, item);

}); // forEach

} catch(e) {
hl("colorVars.setAllListStyles error: " + e.message); 
}; //catch

}; // setAllListStyles


// getListItem
getListItem( colorName) {
    try {
const lbi = this.lbItems;
return lbi.find( v => { (v.name === colorVar)});
    } catch(e) {
hl( "colorVar.getListItem error: " + e.message);
    }; //catch

}; // getListItem

// setListStyle Sets for a listItem
// for optimizationthe lbItem object can be provided
setListStyle( colorName, lbItem = null) {
    try {
        const lbi = (( lbItem !== null) ? lbItem : this.getListItem(colorName) );
if (lbi !== undefined) {
    const el = lbi.item;
const cv = this.getComputedVariable(colorName);
const style = `
background-color: ${cv.bg};
color: ${cv.fg};
`;
const p = el.parentElement.parentElement; // anchor -> span -> li
p.setAttribute("style", style);

} else {
hl( "colorVar.setListStyle not found for " + colorName)
};


    } catch(e) {
hl("colorVar.setListStyle error: " + e.message);
    }; // catch

}; // setListStyle


// Loaded Color Names and Color Defaults/variables
hasLoaded() {   
return ( (this.names !== undefined) && ( this.variables !== undefined));
} // hasLoaded

// Connectedd... Should call after DOM has loaded
connected(root, tries = 0) {
hl("Color Vars Connected called.");
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
this.listBox = root.querySelector("#lbColorVariable");
if (this.listBox === undefined) { hl("color var listbox not found.");};
// compute all variables..
this.setComputedAllVariables();
this.LoadColorVars();
this.details.names = this.names;
this.details.connected(root);




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
const lb = this.listBox;
    const vs = this.variables;
vs.forEach( cv => {    lb.appendChild(this.makeListItem(cv.name, cv.name));}); 
const sls = () => { this.setAllListStyles(true);}
setTimeout( sls, 700);
const evl = (e) => { this.loadEvents(e);};
setTimeout( evl, 1200);// Give styles time to create the list items
this.hs("Color Variables Loaded by Lewis");

} catch(e) {
hl("colorVArs LoadColorVars error: " + e.message);
    } // catch

} // loadColorVars

// Wires up the list of colors for event handling
loadEvents() {
try {
    hl("Loading Event Handling..");
const lbi = this.lbItems;
lbi.forEach( (v) => { 
const n = v.name;
const de = (e) => { this.setDetails(n);  };
const a = v.item;
a.addEventListener( "click", de);
// const li  = a.parentElement.parentElement; // anchor ->span->li
// li.addEventListener( "focusin", dh);


}); // forEach
} catch(e) {
hl("colorVar.loadEvents error: " + e.message);
}; // catch
}; // LoadEvents


setDetails (colorName ) {
try {
this.details.editColorDetail( colorName);
}     catch(e) {
        hl("colorvars setDetails error: " + err.message);
    } // catch
    } // setDetails


// Will help set and populate computedVariables array
setComputedAllVariables() {
    try {
        const cvars = this.variables;

        cvars.forEach((cv) => {
             this.getNewCssValue(cv.name, "fg")
             this.getNewCssValue(cv.name, "bg")
        }); //foreach
    } catch(e) {
        hl("colorVars.setComputedAllVariables error: " + e.message);
    }; // catch
}; // setComputedAllVariables


// Sets the computed variable to the specified value
 setComputedVariable( colorName, suffix, value) {
try {
    const cv = this.getComputedVariable(colorName);
if (suffix === "fg") { cv.fg = value;}
else { cv.bg = value; };
} catch(e) {
hl("colorVar.setComputedVariable error: " + e.message);
}; // catch
 }; // setComputedVariable


 //  getComputedVariable, returns objec or makes new one
 getComputedVariable( cName) {
try {
    const cn = cName.toUpperCase();
    const cVars = this.computedVariables;
    let cv = cVars .find((v) => { return ( v.name === cn);}) ;

    if (cv === undefined) {
        cv = { "name": cn, "fg": "", "bg": ""};
        this.computedVariables.push(cv);
    };
    return cv;
} catch(e) {
hl( "colorVars.getComputedVariable error: " + e.message);
}; // catch
 }; // getComputedVariable

 // Gets the computed value returns empty string if not defined
 getComputedValue( colorName, suffix) {
    try {
        // hl("getting computed value for : " + colorName);
const cv = this.getComputedVariable(colorName);
const value = ((suffix === "fg")? cv.fg : cv.bg) ;
return value;
    } catch(e) {
hl( " colorVars.getComputedValue error: " + e.message);
    }; // catch
 }; // getComputedValue


    // Will find the value for the color specified. Searches parents until found.
    getNewCssValue( name, suffix, tries = 0) {
try {
    const pv = this.getComputedValue(name, suffix);
    if (pv !== "")  {
// Already has a computed value return it.
return pv;
    };; 

    const vars = this.variables;
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
        const nc = this.getNewCssValue( n, s, ++tries);
        this.setComputedVariable(name,suffix, nc);
        return nc;
    }; // tries test for abort or keep looking
} else { 
    // Found the color
    this.setComputedVariable(name,suffix, color);
    return color;
} ;  
} else {  
    // invalid Css Color varialbe not found in list
hl("colorVars.getNewCssValue: " +  name + "_" + suffix + "  was not found... Outputting stack trace to console." );
console.trace();
    return "";
}; // if color found in list
} catch(e) {
hl("colorVar.newCssValue error: " + e.message);
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
