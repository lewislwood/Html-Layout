import {helpLog as hl, getCssVar, setCssVar , getAllCSSVariableNames} from "./utils.js";
 import { cssVarStyle } from "./styles/cssVarStyle.js";
import {cssVars, isColorVar, newColor   } from "../data/cssVarData.js";
import {colorCssVars  } from "./colorVars.js";


"use strict";
// Object holds reference to Left, content, Right Panels
const panelList = { "left": null, "content": null, "right": null};
const statusList = { "left": null, "content": null, "right": null, "timer": null}

function lwCssVar() {

    

hl("ginerating  cssVar ");

customElements.define("lw-cssvar", 
class extends HTMLElement {
    colorVars = new colorCssVars  ;;
    constructor() {
    super();
    
    try {
        const shadow = this.attachShadow({mode: "open", delegatesFocus: false});
        const style = document.createElement("style");
        style.textContent = cssVarStyle;
        shadow.appendChild(style);
        shadow.appendChild( this.colorVars .getStyleObject());

const bC = document.createElement("div");
bC.setAttribute("class", "bodyContainer");

// Left Panel
bC.appendChild(this.sidePanel("left"));

// Content Panel
bC.appendChild( this.MainContent());

// Right Panel
bC.appendChild(this.sidePanel("right"));

shadow.appendChild(bC);
hl("cssVar Element generated");
    } // try
catch(e) {
hl( "cssVar Error: " +  e.message);
    } // catch

} // constructor //


connectedCallback() {
    // hl("Connected CssVar");

 try {
    const 
    el = this.shadowRoot        .querySelector("#mainContent");
    el.setAttribute("tabIndex", "0");
    const sh =this.parentNode.getRootNode({composed: false});
    
    const btn = sh.querySelector("#layoutSkipToContent");;
    btn.onclick = (e) => el.focus();

    //Colors
    this.colorVars.connected(this.shadowRoot        );

// Columns radio buttons
const rc = this.shadowRoot.querySelectorAll("input[name='selectColumns']");
rc.forEach((el)  => {
    el.addEventListener("click",ColumnsClicked); 
}); // foreach

// panels
panelList.left = this.shadowRoot.querySelector("#leftPanel");
panelList.right = this.shadowRoot.querySelector("#rightPanel");
panelList.content = this.shadowRoot.querySelector("#contentPanel");

// Status List
statusList.left = this.shadowRoot.querySelector("#statusLeft");
statusList.right = this.shadowRoot.querySelector("#statusRight");
statusList.content = this.shadowRoot.querySelector("#statusContent");
// Clear all statuses after 20 seconds
statusList.timer = setTimeout( clearAllStatus, 20000);
 } // try
 catch(e) {
hl("cssVars Connected Callback error: " + e.message);
 } //catch

}; // connected-callback
    

      disconnectedCallback() {
        hl("Disconnected CssVar.");
      }

MainContent() {
const mC = document.createElement("div");
mC.setAttribute("class", "contentPanel panel");
mC.setAttribute("role", "main");
mC.setAttribute("title", "main");
const h = document.createElement("h1") ;
h.setAttribute("id", "mainContent");
h.textContent = "Css Variables Settings";
mC.appendChild(h);
const p = document.createElement("p");
p.textContent = ";Color table below simply press spacebar or click on any row. To hear the color description and see it in the status windows for those with sight."
;
mC.appendChild(p);
try {
    const cv =      this.colorVars ;
    mC.appendChild( cv.getListBox());
    mC.appendChild( cv.getDetailsContainer());    
    mC.appendChild(this.getColumnRadio());
    mC.appendChild(this.getStatus("content"));
} // try
catch(e) {
hl("mainContent Error: " + e.message);
} // Catch
return mC;
}       // mainContent

sidePanel( side) {
    const sp = document.createElement("div");
    const id = side + "Panel";
sp.setAttribute("class", id + " sidePanel panel");
sp.setAttribute("id", id);
sp.setAttribute("role", "navigation");
sp.setAttribute("title", side + " panel");
sp.setAttribute("aria-hidden", "false");
try {
    sp.appendChild(this.getStatus(side));

const ul = document.createElement("ul");
// Just some junk..
const left = ["JavaScript Rules", "Feel the joy of solving", "Braille tools", "Doctor Who is great", "Star Trek dares to dream"];
const right= ["Looks Perfect", "Time to pay off", "Need advertisers", "Selling Blood", "Surviving on Fester is hungry! Any light Bulbs around?"];
const list = (side === 'left' ? left : right);
ul.innerHTML = list.map((l) => { return ` <li>${l}</li> `;}).join("");
sp.appendChild(ul);
const lt = "Here the developer or the client can choose color scheme, fonts, and columns.  A button later on will allow you to save to local storage, coly the css variable settings.  These settings can easily be imported in any app that uses css files. ";
const rt = "Also srves as a great reference and training tool.  Shows how files are arranged. Pragramming practices that aid a visually impaired individual person to write code. Blind coders do not see many lines at once, they are line oriented and must develop techniques that help them know where they are.  Also component based programming is smaller reusable type of programming, which is easier to navigate for visually impaired persons programmers.";
const st = (side === 'left' ? lt: rt);
const p = document.createElement("p");
p.textContent = st;
sp.appendChild(p);
} // try
catch(e) {
hl(id + " error: " + e.message)
} // catch

return sp;
} // side panel

getStatus(panel) {

const id = "status" + panel[0].toUpperCase( )[0] +panel.substring(1);
const sp = document.createElement("p");
sp.setAttribute("id", id);
sp.setAttribute("aria-live", "polite");
sp.setAttribute("class",id + " statusPanel" );
sp.textContent = id + " This is help text and descriptive text for items this.ariaSelected. JavaScript will hide 2 statuses and only 1 of them will be visible.  1 column Mode only Content panel will be visible, 2 column mode, only the Left or either status will be visible.  Depends on your selection. Screen readers will automatically read changes in this text as it is updated.";
return sp;
} // getStatus



getColumnRadio() {
const fs = document.createElement("fieldset");
fs.setAttribute("class", "radioColumns");
fs.setAttribute("id", "radioColumns");
const lg = document.createElement("legend");
lg.textContent = "How many columns?";
fs.appendChild(lg);

//Columns
const makeColumn =   (value, label, desc) => { 
    const l = document.createElement("label");
const c =     document.createElement("input");
c.setAttribute("type", "radio");
c.setAttribute("name", "selectColumns");
this.setAttribute("data-desc", desc);
c.setAttribute("id",  value + "RadioColumn",  );
c.setAttribute("value",value );
if (value === "all") {
c.setAttribute("checked","true" );};
l.setAttribute("for", + "RadioColumn");
l.textContent = label; 
const s = document.createElement("span");
s.setAttribute("class", "columnSpan");
s.appendChild(c);
s.appendChild(l);

return s;
    }; //makeColumn
    try {
fs.appendChild(makeColumn("all", "All columns (L, C, R)", "Displays all three columns. Left panel, main content, and right panel.", "true"))
fs.append( makeColumn("cr", "2 Columns ( C , R)", "Display two columns. The Main content and right panel are visible.", "false"))
fs.append( makeColumn("lc", "2 Columns (L, C )", "Display two columns. The left and Main content panels are visible.", "false"));
fs.append( makeColumn("c", "One Column Only", "Displays the main content panel only..", "false"))
    } // Try
    catch (e) {
        hl( "getColumn Error: " + e.message);
    } // catch
return fs;
} // getColumnRadio


}); // Class lw-cssvar
}; // lwCssVar
//****/
// Testing
 


//



let tmrColumn;


const changeColumn = (nextColumn) => {
    tmrColumn = undefined;

    try {
switch (nextColumn) {
case 'all':
    setCssVar("--panel-side-width","24%");
    panelList.left.classList.remove("hidePanel");
    panelList.right.classList.remove("hidePanel");

    setCssVar("--panel-content-width", "49%");
    setCssVar("--panel-right-enabled", "1");
    setCssVar("--panel-left-enabled", "1");
    setCssVar("--panel-columns"), "3";
    panelList.right.setAttribute("aria-hidden", "false");
    panelList.left.setAttribute("aria-hidden", "false");
    hs("Changed to All columns. The Left and Right panels are visible.");;
    break;
    case "cr":
        setCssVar("--panel-side-width","39%");
    panelList.left.classList.add("hidePanel");
    panelList.right.classList.remove("hidePanel");

    setCssVar("--panel-content-width", "59%");
    setCssVar("--panel-right-enabled", "1");
    setCssVar("--panel-left-enabled", "0");
    setCssVar("--panel-columns"), "2";
    panelList.right.setAttribute("aria-hidden", "false");
    panelList.left.setAttribute("aria-hidden", "true");
    hs( "Main content and Right panel are visible, and Left panel is hidden.");

        break;
        case "lc":
            setCssVar("--panel-side-width","38%");
    panelList.left.classList.remove("hidePanel");
    panelList.right.classList.add("hidePanel");
    setCssVar("--panel-content-width", "59%");
    setCssVar("--panel-right-enabled", "0");
    setCssVar("--panel-left-enabled", "1");
    setCssVar("--panel-columns"), "2";
    panelList.right.setAttribute("aria-hidden", "true");
    panelList.left.setAttribute("aria-hidden", "false");
    hs("Left panel and main content are visible. Right panel is now hidden.");

            break;
            case "c":
    panelList.left.classList.add("hidePanel");
    panelList.right.classList.add("hidePanel");
    setCssVar("--panel-content-width", "98%");
    setCssVar("--panel-right-enabled", "0");
    setCssVar("--panel-left-enabled", "0");
    setCssVar("--panel-columns"), "1";
    panelList.right.setAttribute("aria-hidden", "true");
    panelList.left.setAttribute("aria-hidden", "true");
    hs( "Only main content is visible. Left and Right panel are now hidden.");
                break;
                default:
                    hl("Invalid columns "+ nextColumn)
} // switch
} // try
catch(e) {
    hl( "changeColumns error: " + e.message);
} // catch

} // changeColumn

const ColumnsClicked= (e) => {
try {
    const v = e.target.value;
    if (typeof( tmrColumn) !== "undefined") { clearTimeout( tmrColumn); };
    tmrColumn = setTimeout ( changeColumn, 2500, v);
} // try
catch(e) {
    hl("clickColumn error: " + e.message);
} // catch

} // ColumnsClicked 

const columnStatus = (e) => {
const v = e.target.value;
var status = "";
switch (v) {
    case "all":
        status = "When selected all columns/Panels are displayed. Left, Content, and Right Panels are displayed.";
        break;
        case "cr":
            status = "If selected the Content and Right Panel/Column are displayed.";
        break;
            case "lc":
                status = "If selected the Left and Content Panels/Columns are displayed.";
        break;
                case "c":
                    status = "If selected only the main Content is displayed.  No Left or Right Side panels.";
        break;

} // switch (v)
if (status !== "" ) { hs(status);};
}; // ColumnStatus

//  hs the status help status display
const hs = (ln) => {
    if (statusList.timer !== null) {clearTimeout(statusList.timer);};
if (getCssVar("--panel-right-enabled").trim() === "1") {
    statusList.right.textContent  = ln;
}  else { if (getCssVar( "--panel-left-enabled").trim() === "1") {

statusList.left.textContent = ln;
} else {
    statusList.content.textContent = ln;
}} // if, else, if, else
statusList.timer = setTimeout( clearAllStatus, 5000);
} // hs

const clearAllStatus = () => {
    statusList.timer = null;
    statusList.content.textContent = "";
    statusList.left.textContent = "";
    statusList.right.textContent = "";

} // clearAllStatus




export default lwCssVar;