import {helpLog as hl, getCssVar , getAllCSSVariableNames} from "./utils.js";
 import { cssVarStyle } from "./styles/cssVarStyle.js";
import {cssVars, isColorVar, newColor   } from "../data/cssVarData.js";



function lwCssVar() {

    

hl("ginerating  cssVar ");

customElements.define("lw-cssvar", 
class extends HTMLElement {
    constructor() {
    super();
    
    try {
        const shadow = this.attachShadow({mode: "open", delegatesFocus: false});
        const style = document.createElement("style");
        style.textContent = cssVarStyle;
        shadow.appendChild(style);
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
    btn.onclick = () => {el.focus() .bind(el);}
const bCP = this.shadowRoot            .querySelectorAll("button[name='btnColorPicker']");
bCP.forEach((el)  => el.onclick = myColorPicker);

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
p.textContent = "Here the developer or the client can choose color scheme, fonts, and columns.  A button later on will allow you to save to local storage, coly the css variable settings.  These settings can easily be imported in any app that uses css files. ";
mC.appendChild(p);
const p2 = document.createElement("p");
p2.textContent = "Also srves as a great reference and training tool.  Shows how files are arranged. Pragramming practices that aid a visually impaired individual person to write code. Blind coders do not see many lines at once, they are line oriented and must develop techniques that help them know where they are.  Also component based programming is smaller reusable type of programming, which is easier to navigate for visually impaired persons programmers.";
mC.appendChild(p2);

try {
    mC.appendChild(this.CssVarsList());
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
try {
    sp.appendChild(this.getStatus(side));

const ul = document.createElement("ul");
// Just some junk..
const left = ["JavaScript Rules", "Feel the joy of solving", "Braille tools", "Doctor Who is great", "Star Trek dares to dream"];
const right= ["Looks Perfect", "Time to pay off", "Need advertisers", "Selling Blood", "Surviving on Fester is hungry! Any light Bulbs around?"];
const list = (side === 'left' ? left : right);
ul.innerHTML = list.map((l) => { return ` <li>${l}</li> `;});
sp.appendChild(ul);
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
sp.textContent = "This is help text and descriptive text for items this.ariaSelected. JavaScript will hide 2 statuses and only 1 of them will be visible.  1 column Mode only Content panel will be visible, 2 column mode, only the Left or either status will be visible.  Depends on your selection. Screen readers will automatically read changes in this text as it is updated.";
return sp;
}

CssVarsList() {
    // hl("Doing vars list");
const [ colorVars, otherVars] = myCssValues();

const htm = Object.values(colorVars).map((n) => (this.HTMLCssVarItem(n)  ) );
const cssGr = document.createElement("div");
cssGr.setAttribute("class", "cssContainer");

const color  = document.createElement("div");
color.innerHTML = `
<h2>Color Variables</h2>
<table id=  class="cssContainer" >
<tr>
<th scope="col">Color</th>
<th scope="col">Inherit Bg/Fg</th>
<th scope="col">Values Bg/Fg</th>
<th scope="col">Picker</th>
</tr>
 ${htm}
 </table>
 `

 cssGr.appendChild( color);
 cssGr.appendChild(this.getColumnRadio());
return cssGr;
}; // cssVarsList

// Pulls out all the Color css Vars
getColorVars( aCssVars){
const  aVars = Object.entries(cssVars);


} //getColorVars




HTMLCssVarItem( cI) {
    

    try {
        const sObj = JSON.stringify(cI);
const htm  = `
<tr id="${cI.name}-color"   class="rowContainer" data-color-values='${sObj}'  >
<td class="nameSpan">${cI.name}</td>
<td class="inheritValues">${cI.inHerit_bg}<br/>${cI.inHerit_fg}
${this.getColorSwatch(cI.name, cI.fg, cI.bg)}
<td class="btnColorPicker"><button  type="button" name='btnColorPicker'  data-color="${cI.name}" >Change</br>Color</button></td>
</tr>
`
return htm  ;

} // HTMLCssVarItem// try
catch(e) {
    hl("HTMLItem Error(" + cI.name +") : " + e.message );
} // catch
return "ERROR: " + cI
} // HTMLCssVarItem

getColorSwatch(name,  fg, bg) {
    name = "--" + name;
    const  style = "background-color :  VAR("+ name + "_bg); color : VAR("+ name + "_fg);";
// if (fg === "")fg = ""default"{ }
return `
<td class="colorSwatch"style="${style}">${bg}/<br/>${fg}</td> 
`
}; // getColorSwatch

getColumnRadio() {
const fs = document.createElement("fieldset");
fs.setAttribute("class", "radioColumns");
fs.setAttribute("id", "radioColumns");
const lg = document.createElement("legend");
lg.textContent = "How many columns?";
fs.appendChild(lg);

//Columns
const makeColumn =   (value, label, desc, isChecked) => { 
    const l = document.createElement("label");
const c =     document.createElement("input");
c.setAttribute("type", "radio");
c.setAttribute("name", "selectColumns");
this.setAttribute("data-desc", desc);
c.setAttribute("id",  value + "RadioColumn",  );
c.setAttribute("value",value );
c.setAttribute("checked", isChecked)
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
function myCssValues() {
    const [cssColors, cssOthers] = parseCssVars();
    const cssVarsTemplate = Object.entries( cssVars);
    const colorVars = {};
// Make a clone of data Template version as starter point
cssVarsTemplate.forEach( entry => {
         const [key, value] = entry;
         colorVars[key] = {...value} ;
}); //foreach

// Add any missing cssColor Variables not in template
// cssColors.push("testing");
// hl("Colors in css " + cssColors.length);
cssColors.forEach((e) => {
    

if ( colorVars[e] === undefined) {
const vn= newColor(e);
colorVars[e] = vn;
} // if new value
}) // forEach cssColors

// Get current css color values
Object.values(colorVars).forEach(( v) => {
const css = "--" + v.name; 

v.fg =getCssVar(css +   "_fg");  
v.bg =getCssVar(css + "_bg");  

}) // Get Color values);



//    Object.values( colorVars).forEach((value)  => hl(JSON.stringify(value)));
return[colorVars, cssOthers];



} // myCssValues


function parseCssVars() {
    const CssVarsList = getAllCSSVariableNames();
    const [ colorVars, otherVars] = [[],[]];

    // hl( "Parsing cssVars " );
    CssVarsList .forEach( (value) => {
if (typeof(value) === "string") {
    // hl( "Proccessing " + value);
        if ( isColorVar(value)) {
            // Strip Color Vars, thus no _fg or _bg, or --
    const n = stripColorVar( value); 
    // unique values only
    if ( ! colorVars.find((v) => (v === n))) { colorVars.push(n); };
            } // if isColor
            else { otherVars.push(value); };
        } // if string
        else {
hl("Skipped value: " + value);
        } //else
            } ); // forEach
            // hl(" Parse colorVars have " +colorVars.length );
return [colorVars, otherVars];
} // parseCssVars
//
const stripColorVar = (cVar) => {
    if ( cVar.startsWith("--")) {cVar = cVar.substr(2); };
    if ( cVar.endsWith("_fg") || cVar.endsWith("_bg") ) { cVar = cVar.substr(0, cVar.length - 3); };
    return cVar;
} // stripColor


const myColorPicker = (e) =>  {
 try {
    const sh = e.target.parentNode.getRootNode({composed: false}); 
const c = e.target.getAttribute("data-color");
hl("data color is " + c);
const di= sh.querySelector("#" + c+ "-color");
const sObj = di.dataset.colorValues;
// hl(di.id + " : [" + sObj + "]");

const cI = JSON.parse(sObj);

 
const sMsg = `name: ${cI.name}, Colors: ${cI.fg}/${cI.bg};  <br/> ${cI.notes}<br/>  Coming Soon be Patient!`
alert(sMsg);
 } // try
 catch(err) {
    hl("ColorPicker Error: " + err.message);
 } // catch
} // myColorPicker
export default lwCssVar;
 
