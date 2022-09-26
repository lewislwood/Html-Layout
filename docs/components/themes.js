import devOps   from "./devops.js";
import { setCssVar } from "./utils.js";
import colorVarsMgr from "./colorVarsMgr.js";



"use strict";


class themes {
static #themesList = []; // List of all current themes defined
static currentThemeName = "";  // Name of current theme
static #current = null; // Active theme may or may not be in theme list.
static #colorMgr = null;
static #recent = null;  // used for abort applied theme
constructor() { throw new error("static Error you cannot create an instnce of themes, is a static class."); };
static { 
    try {
        themes.#colorMgr = new colorVarsMgr;
    } catch(e) {
    console.log('themes.initBlock error: '+ e.message);
    }; //  catch
    
}

 static applyColorVariables(  colorVariables , themeName = null ) {
    
try {
if (colorVariables === undefined) { throw new error("You must supply a color variables array.");};
themes.currentThemeName  = (themeName === null) ? "" : themeName;
const cm = themes.#colorMgr;
cm.variables = colorVariables;
const cssVars = cm.cssVarsList();
cssVars.forEach((v) => {setCssVar (v[0],   v[1]);});
} catch(e) {
devOps.logError('themes.applyColorVariables error: '+ e.message);
}; //  catch
}; // applyColorVariables  


static shareCSS(  colorVariables  = null, themeName = null ) {
    
    try {
        const cm = themes.#colorMgr;
        const hold = cm.variables;
const name = (themeName === null)?     themes.currentThemeName : themeName;  
 cm.variables = colorVariables;
    const cssVars = cm.rootCSssList ();
// restore it back, just in case.
cm.variables = hold;


const output = [ 
    "body {",
     "   background-color: var( --main_bg, blue);",
     "   color: var( --main_fg, white);",
     "   font-size:18PX ;",
     "   font-weight: 700;",
    "}",
    
    `/* Theme Name: [ ${name}] */`,
":root {"
]
    cssVars.forEach((v) => {output.push(`    ${v[0]} :${v[1]};`);});
    output.push(" ");
    output.push("/* Now column and other non-color stuff */ ");
    output.push("   --panel-right-enabled: 1;");
    output.push("   --panel-left-enabled: 1;");
    output.push("   --panel-columns : 3;");
    output.push("   --panel-content-width : 48%;");
    output.push("   --panel-side-width : 24%;");
    output.push("   --panel-left-width : var( --panel-side-width, 24%);");
    output.push("   --panel-right-width : var( --panel-side-width, 24%    );");
    output.push("}");
    output.push("   ");
    
    

navigator.clipboard.writeText(output.join("\n"));
    } catch(e) {
    devOps.logError('themes.shareCSSerror: '+ e.message);
    }; //  catch
    }; // shareCSS
    

};  // class themes



export default themes;
