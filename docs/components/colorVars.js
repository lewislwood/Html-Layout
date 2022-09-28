import devOps   from "./devops.js";
import colorVarsMgr from "./colorVarsMgr.js";
import  themes from "./themes.js";
import { getJSON, getCssVar  as getRootVar} from "./utils.js";
import {colorVarStyle } from "./styles/colorVarStyles.js";
import { colorDetails } from "./colorDetails.js";

"use strict";

/*  
   Color Css Vars Class encapsulation

*/
export class colorCssVars extends colorVarsMgr   {
names ;

listBox;
lbItems = []; // Actual Items in listBox, used for styling
hs;
tmrDetails = null;
keyDetail = "";//  Key value to fill details
timeDetail = 0; // Used to to delay details refresh
details;
themeName = null ;  // ThemName Input on themBar

constructor() {
    super();
try {
    this.tmrDetails = null; 

    // Set it to HelpLog until caller decides otherwise.
    this.hs = devOps.log;
    
    this.details = new colorDetails(this);
    const ln = (data) => {        this.names = data;};
        getJSON("data/colorNames.json", ln)

    
        const lv = (v, n) => {        this.cleanUpColorVars(v, n);};
        themes.addListener( lv );

} catch(e) {
    devOps.logError("cssColorVar constructor error: "+ e.message)
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
    devOps.logError("colorvar.getStyleObject error: " + e.message);
}; // catch
}; // getStyleObject

getDetailStyleObject() {
    const d = this.details;
    // devOps.log("Detail object is " + d);
    return d.getStyleObject();
}; // getDetailStyleObject


cleanUpColorVars( colorVariables, themeName) {
    try {
const vars = colorVariables;
if (this.themeName !== null) this.themeName.value = themeName;


    this.variables = vars;
} catch(e) {
    devOps.logError("colorVars.CleanUpColorVars error: " + e.message);
}; // catch
}; //  cleanUpColorVars




getListBox() {
    const div = document.createElement("div");

    try {
        const h = document.createElement("h2");
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
        devOps.logError( "ColorVars getListBox Error: " + e.message);
    } // catch
return div;
} // getListBox

// GetDetails container objects
getDetailsContainer() {
    const d = this.details;
    const o = d.getContainerObjects();
    // devOps.log("Details object: " + o);

return o;
}; // getDetailsContainer

makeListItem( text, value) {
    const li  = document.createElement("li")
    try {
        // devOps.log("Making item : " +text )
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
        devOps.logError("colorVars makeListItem error: " + e.message);
    } // catch

    return li;
} // makeListItem

 getThemeBar(    ) {
try {
const div = document.createElement("div");
div.setAttribute("id","themeColorBar");

const lbl = document.createElement("label");
lbl.setAttribute("class", "themeBarNameLabel");
lbl.setAttribute("for", "themeNameInput" );
lbl.textContent = "Theme name:";

const inp = document.createElement("input");
inp.setAttribute("type", "text");
inp.setAttribute("id", "themeNameInput");
inp.setAttribute("placeholder", "Not loaded");
this.themeName = inp;
    
    
if (themes.localFound ) inp.value = themes.currentThemeName;

div.appendChild(lbl);
div.appendChild(inp);



// Apply button
const ab = document.createElement("button");
ab.setAttribute("type", "button");
ab.setAttribute("id","themeApplyButton");
ab.setAttribute("text", "Apply");
const att = () => { this.applyToTheme();};;
ab.onclick = () => { att();} ;
// css button
const cb = document.createElement("button");
cb.setAttribute("type", "button");
cb.setAttribute("id","themeCSSButton");
cb.setAttribute("text", "Share CSS");
const ctt = () => { this.shareAsCSS();};;
cb.onclick = () => { ctt();} ;


div.appendChild(ab);
div.appendChild(cb);

return div;
} catch(e) {
devOps.logError('colorVars.getThemeBar error: '+ e.message);
}; //  catch
}; // getThemeBar 
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
    devOps.logError("colorVars.setAllListStyles error: " + e.message); 
}; //catch

}; // setAllListStyles


// getListItem
getListItem( colorName) {
    try {
const lbi = this.lbItems;
const reg = new RegExp(colorName,"i");
// const look = lbi.find( v => reg.test(v.name)) ;
// if (look === undefined) { devOps.log( JSON.stringify(lbi ));};;
return lbi.find( v => reg.test(v.name)) ;
    } catch(e) {
        devOps.logError( "colorVar.getListItem error: " + e.message)+ " for " + colorName;
    }; //catch

}; // getListItem

// setListStyle Sets for a listItem
// for optimizationthe lbItem object can be provided
setListStyle( colorName, lbItem = null) {
    try {
        const refreshTC = true; //  (lbItem=== null );  // Doing a refresh forces screen reader to update color attributes
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
if (refreshTC) {
const tc = el.textContent + ".";    
el.textContent = tc.replace("..", "");

};

} else {
    devOps.log( "colorVar.setListStyle not found for " + colorName)
};


    } catch(e) {
        devOps.logError("colorVar.setListStyle error: " + e.message);
    }; // catch

}; // setListStyle

// Loaded Color Names and Color Defaults/variables
hasLoaded() {   
return ( (this.names !== undefined) && ( this.variables !== undefined));
} // hasLoaded

// Connectedd... Should call after DOM has loaded
connected(root, tries = 0) {
    devOps.log("Color Vars Connected called.");
try {
     if ( ! this.hasLoaded()) {
        if ( tries < 10 ) {
const tryAgain = (r, t) =>  { this.connected(r, t);};
// devOps.log("Connected waiting for load of colorVars trying again.. " + tries)
setTimeout(tryAgain, 200, root, ++tries );
        } else { 
            devOps.log("Color Vars failed to load, Connected is aborting..");
     } // tries
    } else {
        // devOps.log("Redy to connect");
this.listBox = root.querySelector("#lbColorVariable");
if (this.listBox === undefined) { devOps.log("color var listbox not found.");};
this.LoadColorVars();
this.details.names = this.names;
this.details.connected(root);




    } // if ! hasLoaded
} catch(e)  {
    devOps.logError( "connected colorVars error: " + e.message);
} // catch

} // connected

// Loading ListbBox Color Variables
LoadColorVars() {
    try {
        devOps.log("Loading color Vars");
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
    devOps.logError("colorVArs LoadColorVars error: " + e.message);
    } // catch

} // loadColorVars

// Wires up the list of colors for event handling
loadEvents() {
try {
    devOps.log("Loading Event Handling..");
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
    devOps.logError("colorVar.loadEvents error: " + e.message);
}; // catch
}; // LoadEvents


setDetails (colorName ) {
try {
this.details.editColorDetail( colorName);
}     catch(e) {
    devOps.logError("colorvars setDetails error: " + err.message);
    } // catch
    } // setDetails
     
    // help status update..
     setHS(  parentHS ) {
    try {
    this.hs = parentHS;
    } catch(e) {
        devOps.logError('colorVars.setHS error: '+ e.message);
    }; //  catch
    }; // setHS 

     applyToTheme(    ) {
    try {
    themes.applyColorVariables(this.variables);
    this.hs("Theme has been applied.  Do not forget to save ");
    } catch(e) {
    devOps.logError('colorVars.applyToTheme error: '+ e.message);
    }; //  catch
    }; // applyToTheme 

 shareAsCSS(    ) {
try {
themes.shareCSS(this.variables, "_NewTheme_");
this.hs("Edited theme has been shared to the clipboard.");
} catch(e) {
devOps.logError('colorVars.shareAsCSS error: '+ e.message);
}; //  catch
}; // shareAsCSS 



} // class colorCssVars  
