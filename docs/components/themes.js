import devOps   from "./devops.js";
import {getJSON ,setCssVar } from "./utils.js";
import colorVarsMgr from "./colorVarsMgr.js";



"use strict";


class themes {
    static     #themesDB = null; // Themes available
static localFound = false; // Is a local version available
static currentThemeName = "";  // Name of current theme
static #current = null; // Active theme may or may not be in theme list.
static #colorMgr = null;
static #recent = null;  // used for abort applied theme
static #listener = [];  // used to listen for changes in setCurrentTheme
constructor() { throw new error("static Error you cannot create an instnce of themes, is a static class."); };
static { 
    try {
         const dbJSON = localStorage.getItem("lwHTMLThemes");
        
        themes.localFound = (dbJSON !== null);
        // force reload
        // themes.localFound  = false;

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

     static save(  colorVariables = null, themeName = null , author = "Lewis Wood") {
    try {
        const dbt  = themes.#themesDB.themes;
        const cm = themes.#colorMgr;
    const colors = (colorVariables === null) ? cm.variables : colorVariables;
const name = (themeName === null) ? themes.currentThemeName : themeName;

let th = dbt[name];
if (th === undefined) {
    devOps.log("Theme does not exist creating a new one.");
th = themes.newTheme(colors,name, author) ;
    };
th.colors = JSON.parse( JSON.stringify(colors));
dbt[name]  = th;

const db = themes.#themesDB;
localStorage.setItem("lwHTMLThemes",JSON.stringify( db))
devOps.log(`Theme ${name} saved locally.`);
    } catch(e) {
    devOps.logError('themes.save error: '+ e.message);
    }; //  catch
    }; // save 

 static exist(  themeName ) {
try {
const dbt  = themes.#themesDB.themes;
return ( dbt[themeName] !== undefined);
} catch(e) {
devOps.logError('themes.exist error: '+ e.message);
return false;
}; //  catch
}; // exist 

     static #webLoad( data ) {
    try {
        if (! themes.localFound) {
    devOps.log("Themes data loaded from web.");
    themes.#themesDB = data;
    localStorage.setItem("lwHTMLThemes",JSON.stringify( data))
    themes.localFound = true;
    themes.setCurrentTheme();
    }; // if ! localFound
    } catch(e) {
    devOps.logError('themes.webLoad error: '+ e.message);
    }; //  catch
    }; // webLoad 

    // add a listener for when setCurrentTheme is called
     static addListener(  callBack = null ) {
    try {
    themes.#listener.push( callBack);
    if ((callBack !==null) && ( themes.localFound)) {
        const cm = themes.#colorMgr ;
        const vars = JSON.parse( JSON.stringify(cm.variables));
        const tn = themes.currentThemeName;
        setTimeout((e) => {
callBack( vars, tn);}, 100);
    };;
    } catch(e) {
    devOps.logError('themes.addListener error: '+ e.message);
    }; //  catch
    }; // addListener 

     static setCurrentTheme(  themeName = null ) {
    try {
        const tdb = themes.#themesDB;
    const tn = (themeName === null) ? tdb.current : themeName;
    themes.currentThemeName = tn;
    themes.#current = tdb.themes[tn];
    const tc = themes.#current ;
    themes.applyColorVariables(tc.colors, tc.name);;


themes.#callListeners(JSON.parse( JSON.stringify(tc.colors)), tc.name );
// Now save the current selected them name for next time.
const updCurrent = () => { themes.saveSelectedTheme(tc.name);};
setTimeout(() => {  updCurrent();}, 150);

    } catch(e) {
    devOps.logError('themes.setCurrentTheme error: '+ e.message);
    }; //  catch
    }; // setCurrentTheme 

     static async #callListeners( p1, p2 ) {
    try {
const ls = themes.#listener;
if (ls.length > 0) {
    ls.forEach( (cb)=> { cb(p1, p2);});

}; 

   } catch(e) {
    devOps.logError('themes.callListeners error: '+ e.message);
    }; //  catch
    }; // callListeners 

 static applyColorVariables(  colorVariables , themeName = null ) {
    
try {
if (colorVariables === undefined) { throw new error("You must supply a color variables array.");};
themes.currentThemeName  = (themeName === null) ? "" : themeName;
const cm = themes.#colorMgr;
cm.variables = colorVariables;
const cssVars = cm.cssVarsList();
cssVars.forEach((v) => {setCssVar (v[0],   v[1]);});
devOps.log("Theme Named: " + themeName  + " applied");
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
    

static      newTheme( colorVariables = null,  themeName  =null, creator = "Lewis Wood"          ) {
    try {
        const dbt  = themes.#themesDB.themes;
        const td = new Date();
        let tn = (themeName === null) ?"new_theme" : themeName; 
let sfx = "", i = 0, test;        
test =  dbt[tn];
while (test !== undefined) {
i +=1;
sfx = "_" + i;
test =  dbt[tn + sfx];
}; //while
tn = tn + sfx;
const cm = themes.#colorMgr;
const nColors = (colorVariables === null) ? JSON.parse( JSON.stringify(cm.variables)) : JSON.parse( JSON.stringify(colorVariables));
        const th = {  "name":tn, 
        "creator": creator,
        "created": td.toDateString(),
        "modified_by": creator,
        "modified": td.toDateString(),
        "colors":nColors
           }
        return th;
    } catch(e) {
    devOps.logError('themes.new error: '+ e.message);
    }; //  catch
    }; // newTheme
    
static      themeNames(  selectOptions = false ) {
    try {
    const dbt = Object.keys( themes.#themesDB.themes);

    const makeOption = (n) => {
const o = document.createElement("option");
o.setAttribute("text", n);
o.setAttribute("value", n);
o.textContent = n;
return o;
    }; makeOption
return dbt.map((n) => { return (selectOptions )?makeOption(n) : n;  }) ;

    } catch(e) {
    devOps.logError('themes.themeNames error: '+ e.message);
    }; //  catch
    }; // themeNames 

 static themeBarSelector(    ) {
try {
devOps.log("Themes List: " +  themes.themeNames(false).join(", ") );
} catch(e) {
devOps.logError('themes.themeBarSelector error: '+ e.message);
}; //  catch
}; // themeBarSelector 

static async saveSelectedTheme(  themeName ) {
    try {
        const db = themes.#themesDB;
        db.current = themeName;
        localStorage.setItem("lwHTMLThemes",JSON.stringify( db))
    } catch(e) {
    devOps.logError('themes.saveSelectedTheme error: '+ e.message);
    }; //  catch
    }; // saveSelectedTheme 
    


};  // class themes


{
customElements.define('lw-theme-bar', 
class extends HTMLElement {
    cbThemes = null; // Themes comboBox
constructor() {
    super();
try {
    const shadow = this.attachShadow({mode: "open", delegatesFocus: true});
    const spn = document.createElement("span");
    spn.setAttribute("class", "themeBarContainer");

    shadow.appendChild(spn);

    // Create label for theme select box
    const lbl = document.createElement("label");
    lbl.setAttribute("id", "themeBarLabel");
    lbl.textContent = "Current theme";
    spn.appendChild(lbl);

    // Create theme select box
    const cb = document.createElement("select");
    cb.setAttribute("aria-labeledby", "themeBarLabel")
    this.cbThemes = cb;
    spn.appendChild(cb);

    const tcb = () => { this.themesCallBack(); };
    themes.addListener(tcb);
} catch(e) {
    devOps.log("lwThemeBar error: " + e.message);
 }; // catch
}; // constructor

connectedCallback(    ) {
try {
 this.cbThemes.onchange = (e) => { this.themeChanged(e);};
} catch(e) {
devOps.logError("lwThemeBar.connectedCallback error: "+ e.message);
}; //  catch
}; // connected_callback 

 async themesCallBack( colorVariables, themeName) {
try {
    const tn = (themeName === undefined) ? themes.currentThemeName : themeName;
    // remove old first
const old = Array.from( this.cbThemes.options);
const cb = this.cbThemes;
old.forEach((o) => { o.selected = false; cb.remove(o);});
const ops = themes.themeNames(true);
    ops.forEach( (o,) => { cb.appendChild(o);if (o.value === tn) o.selected = true; });
    cb.selected = tn;
} catch(e) {
devOps.logError('lwThemeBar.themesCallBack error: '+ e.message);
}; //  catch
}; // themesCallBack 

 
themeChanged(  event ) {
try {
    devOps.log("themeChanged");
const cb = this.cbThemes;
const o = cb.options[ cb.selectedIndex];
themes.currentThemeName = o.value;
themes.setCurrentTheme(o.value);

} catch(e) {
devOps.logError('lwThemeBar.themeChanged error: '+ e.message);
}; //  catch
}; // themeChanged 
 
});  // class lw-theme-bar
};  // End of self initializing block


export default themes;


