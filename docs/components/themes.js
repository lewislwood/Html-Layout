import devOps   from "./devops.js";




"use strict";


class themes {
static #themesList = []; // List of all current themes defined
static currentThemeName = "";  // Name of current theme
static #current = null; // Active theme may or may not be in theme list.
static variables;  // color variables
static #recent = null;  // used for abort applied theme
constructor() { throw new error("static Error you cannot create an instnce of themes, is a static class."); };

 applyColorVariables(  colorVariables , themeName = null ) {
    
try {
if (colorVariables === undefined) { throw new error("You must supply a color variables array.");};


} catch(e) {
devOps.logError('themes.applyColorVariables error: '+ e.message);
}; //  catch
}; // applyColorVariables  



};  // class themes



export default themes;
