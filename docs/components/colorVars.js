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
    // hl("Detail object is " + d);
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
        const h = document.createElement("h3");
        div.setAttribute("id", "colorlistcontainter");
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
    // hl("Details object: " + o);

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
        a.setAttribute("title", text + " press enter to view/edit color");        
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
const reg = new RegExp(colorName,"i");
// const look = lbi.find( v => reg.test(v.name)) ;
// if (look === undefined) { hl( JSON.stringify(lbi ));};;
return lbi.find( v => reg.test(v.name)) ;
    } catch(e) {
hl( "colorVar.getListItem error: " + e.message)+ " for " + colorName;
    }; //catch

}; // getListItem

// setListStyle Sets for a listItem
// for optimizationthe lbItem object can be provided
setListStyle( colorName, lbItem = null) {
    try {
        const lbi = (( lbItem !== null) ? lbItem : this.getListItem(colorName) );
if (lbi !== undefined) {
    const el = lbi.item;
    const fg = this.getColorValue(colorName, "fg");
    const bg = this.getColorValue(colorName, "bg");
const style = `
background-color: ${bg};
color: ${fg};
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
    const proper = (name) => { return (name.substr(0,1).toUpperCase() + name.substr(1).toLowerCase()) ;}
    // make description with proper names
const makeDesc = (name) => {
    const an = name.split("-");
    return an.map((n)=> { return proper(n)  } ).join(" ");
    }; // makeDesc
vs.forEach( cv => {    lb.appendChild(this.makeListItem(makeDesc (cv.name), cv.name));}); 
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

// parseColorVar returns [ name, suffix]
    parseColorVar( colorVar) {
try {
const parsed = colorVar.replace("--", "").trim().toLowerCase().split("_");
// hl("Parsed: " + JSON.stringify(parsed));
if (parsed.length === 2)  return [parsed[0], parsed[1]]
else return [parsed[0], null];

}   catch(e) {
  hl("colorVar.parseColorVar error: " + e.message);
}; // catch
    }    ; // parseColorVar

     getColorValue(  colorName, suffix = null ) {
    try {
    if (suffix === null) {
const [c, s] = this.parseColorVar( colorName);
if (s === null) { throw new Error("Invalid Color value " + c);}
else { return this.getColorValue( c, s);};
    }; // If no suffix
    const cvs = this.variables;
    const reg = new RegExp(colorName, "i");

const cv = cvs.find( v => reg.test(v.name));
if ( cv === undefined) { throw new Error("Color " + colorName + " not found.");};
const parent = ((suffix === "fg") ? cv.parent_fg : cv.parent_bg);
if (parent !== "") {return this.getColorValue(parent);}
const value = ((suffix === "fg") ? cv.fg : cv.bg);
return value;

    } catch(e) {
    hl('colorVars.getColorValue error: '+ e.message);
    }; //  catch
    }; // getColorValue 


     setColorValue(  colorName, suffix = null , value = null) {
    try {
        if (suffix === null) {
            const [c, s] = this.parseColorVar( colorName);
            if (s === null) { throw new Error("Invalid Color Name" + c);}
            else { return this.setColorValue( c, s, value);};
                }; // If no suffix
                if ( value === null) { throw new Error("No color value specified.");};
                if (value.startsWith("#") !== true) {                    return this.setColorParent( colorName, suffix, value);                 }; // Value may be a parent value
                const cvs = this.variables;
                const reg = new RegExp(colorName, "i");

const cv = cvs.find( v => reg.test(v.name));
if ( cv === undefined) { throw new Error("Color " + colorName + " not found.");};
if (suffix === "fg") {cv.fg = value; cv.parent_fg = "";}
else {cv.bg = value; cv.parent_bg = ""; };
return value;


    } catch(e) {
    hl('colorVars.setColorValue error: '+ e.message);
    }; //  catch
    }; // setColorValue 

     setColorParent(  colorName, suffix = null, value = "") {
    try {
        if (suffix === null) {
            const [c, s] = this.parseColorVar( colorName);
            if (s === null) { throw new Error("Invalid Color Name" + c);}
            else { return this.setColorParent( c, s, value);};
                }; // If no suffix
const newValue =                ((value === null)? "" : value );
const cvs = this.variables;
                const reg = new RegExp(colorName, "i");
const cv = cvs.find( v => reg.test(v.name));
if ( cv === undefined) { throw new Error("Color " + colorName + " not found.");};
if (suffix === "fg") cv.parent_fg = newValue
 else cv.parent_bg = newValue
return newValue;
    } catch(e) {
    hl('colorVars.setColorParent error: '+ e.message);
    }; //  catch
    }; // setColorParent 

     setHS(  parentHS ) {
    try {
    this.hs = parentHS;
    } catch(e) {
    hl('colorVars.setHS error: '+ e.message);
    }; //  catch
    }; // setHS 

} // class colorCssVars  
