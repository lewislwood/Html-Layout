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
bC.setAttribute("role", "main");
bC.setAttribute("title", "main");
const h = document.createElement("h1") ;
h.setAttribute("id", "mainContent");
bC.appendChild(h);
// bC.innerHTML = `<h1 id="mainContent">Css Variables</h1>`;

bC.appendChild(this.CssVarsList());

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
    

CssVarsList() {
    // hl("Doing vars list");
const [ colorVars, otherVars] = myCssValues();

const htm = Object.values(colorVars).map((n) => (this.HTMLCssVarItem(n)  ) );
const cssGr = document.createElement("div");
cssGr .innerHTML = `
<h2>Color Variables</h2>
<table id="colorsValuesContainter"  class="cssContainer" >
<tr>
<th scope="col">Color</th>
<th scope="col">Inherit fg/bg</th>
<th scope="col">Values fg/bg</th>
<th scope="col">Picker</th>
</tr>
 ${htm}
 </table>
 `
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
<td class="inheritValues">${cI.inHerit_fg}<br/>${cI.inHerit_bg}
${this.getColorSwatch(cI.fg, cI.bg)}
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

getColorSwatch( fg, bg) {
    var style = "";
    var colors;
if (fg === ""){  colors = "default/<br/>";}
else { colors = fg + "/<br/>"; style= "color: " + fg + ";"; };
if (bg === ""){  colors =colors + "default";}
else { colors = colors + bg; style= style + "background-color: " + bg + ";"; };
return `
<td class="colorSwatch"style="${style}">${colors}</td> 
`
}; // getColorSwatch
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
cssColors.push("testing");
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



//   Object.entries( colorVars).forEach(([key, value])  => console.log(value));
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
 
