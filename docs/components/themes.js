import devOps   from "./devops.js";
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
cssVars.forEach((v) => {devOps.log(`${v[0]} : ${v[1]}`);});
} catch(e) {
devOps.logError('themes.applyColorVariables error: '+ e.message);
}; //  catch
}; // applyColorVariables  



};  // class themes



export default themes;
