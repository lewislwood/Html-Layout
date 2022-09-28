import devOps   from "./devops.js";
import {getJSON ,setCssVar } from "./utils.js";
import colorVarsMgr from "./colorVarsMgr.js";



"use strict";


class themes {
    static #themesDB = null; // Themes available
static localFound = false; // Is a local version available
static currentThemeName = "";  // Name of current theme
static #current = null; // Active theme may or may not be in theme list.
static #colorMgr = null;
static #recent = null;  // used for abort applied theme
constructor() { throw new error("static Error you cannot create an instnce of themes, is a static class."); };
static { 
    try {
        const dbJSON = localStorage.getItem("lwHTMLThemes");
        
        themes.localFound = (dbJSON !== null);
        themes.#colorMgr = new colorVarsMgr;
if (!themes.localFound) {
const wl = (data) => { themes.#webLoad(data);};
        getJSON("data/themes.json", wl);
    }     else {
        themes.#themesDB   =JSON.parse( dbJSON);
    themes.setCurrentTheme();
}; // localFound
        
    } catch(e) {
console.log('themes.initB   lock error: '+ e.message);
    }; //  catch
    }; //initializing block

     static #webLoad( data ) {
    try {
        if (! themes.localFound) {
    devOps.log("Themes data loaded from web.");
    themes.#themesDB = data;
    themes.setCurrentTheme();
    localStorage.setItem("lwHTMLThemes",JSON.stringify( data))
    }; // if ! localFound
    } catch(e) {
    devOps.logError('themes.webLoad error: '+ e.message);
    }; //  catch
    }; // webLoad 

     static setCurrentTheme(  themeName = null ) {
    try {
        const tdb = themes.#themesDB;
        
    const tn = (themeName === null) ? tdb.current : themeName;
    devOps.log( "Setting theme to " + tn);
    } catch(e) {
    devOps.logError('themes.setCurrentTheme error: '+ e.message);
    }; //  catch
    }; // setCurrentTheme 

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
