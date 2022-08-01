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
bC.innerHTML = `
<h1 id="mainContent">Css Variables</h1>`;
const form = document.createElement("form");


bC.appendChild(form);

form.appendChild(this.CssVarsList());

shadow.appendChild(bC);
hl("cssVar Element generated");
    } // try
catch(e) {
hl( "cssVar Error: " +  e.message);
    } // catch

} // constructor //


connectedCallback() {
    hl("Connected CssVar");

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
    hl("Doing vars list");
const [ colorVars, otherVars] = myCssValues();

const htm = Object.values(colorVars).map((n) => (this.HTMLCssVarItem(n)  ) );
const fs = document.createElement("fieldset");
const lg = document.createElement("legend"); 

lg.textContent = "Css Color Variables";
fs.appendChild(lg);

const di = document.createElement("div");
di.innerHTML = htm;
fs.appendChild(di);
return fs;
}; // cssVarsList

// Pulls out all the Color css Vars
getColorVars( aCssVars){
const  aVars = Object.entries(cssVars);


} //getColorVars




HTMLCssVarItem( cI) {
    

    try {
        hl("Generating item for " + cI.name);
        const sObj = JSON.stringify(cI);
const htm  = `
<div class="cssRow"data-color-values="${sObj}" >

<div class="colorName" >
<span class="nameSpan">${cI.name}</span>
</div colorName>
<div class="inheritValues">${cI.inHerit_fg}<br/>${cI.inHerit_bg}
${this.getColorSwatch(cI.fg, cI.bg)}
<button type="button" name="btnColorPicker" >Change</br>Color</button>
 </div row>

</div cssRow>

`
hl("Item generated.");
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
<div class="colorSwatch"style="${style}">${colors}</div> 
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
hl("Colors in css " + cssColors.length);
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
            hl(" Parse colorVars have " +colorVars.length );
return [colorVars, otherVars];
} // parseCssVars
//
const stripColorVar = (cVar) => {
    if ( cVar.startsWith("--")) {cVar = cVar.substr(2); };
    if ( cVar.endsWith("_fg") || cVar.endsWith("_bg") ) { cVar = cVar.substr(0, cVar.length - 3); };
    return cVar;
} // stripColor


const myColorPicker = (e) =>  {
const p = e.target.parentNode;
const sObj = p.getAttribute("data-color-values");
const cI = JSON.parse( sObj);
const sMsg = `name: ${cI.name}, Colors: ${cI.fg}/${cI.bg};  <br/> ${cI.notes}<br/>  Coming Soon be Patient!`
alert(sMsg);
} // myColorPicker








export default lwCssVar;
 
