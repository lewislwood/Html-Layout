import {helpLog as hl, getCssVar , getAllCSSVariableNames} from "./utils.js";
 import { cssVarStyle } from "./styles/cssVarStyle.js";
 import { cssVarsDataDef, cssVarsDataDesc   } from "../data/cssVarData.js";

function lwCssVar() {

    

hl("ginerating  cssVar");

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
 } // try
 catch(e) {
hl("cssVars Connected Callback error: " + e.message);
 } //catch

}; // connected-callback
    
      disconnectedCallback() {
        hl("Disconnected CssVar.");
      }
    

CssVarsList() {
const cVars = getAllCSSVariableNames();
const htm = cVars.map((n) => (this.HTMLCssVarItem(n)  ) );
const fs = document.createElement("fieldset");
const lg = document.createElement("legend"); 

lg.textContent = "Css Color Variables";
fs.appendChild(lg);
htm.forEach((value) => fs.appendChild(value));
return fs;
}; // cssVarsList
HTMLCssVarItem( key) {
    

    try {
        const i = this.getCssVarItem(key);
const spn= document.createElement("span");
spn.setAttribute("class","row");
spn.innerHTML = `
<label for="default${i.name}" title="${i.desc}" >${i.name}  Color : </label>
<input name="${i.name}"  type="text" id="default${i.name}" value="${i.Def}"  aria-label="Set color to value of another value or custom color" >${i.def}</input>
<input type="color" id="color${i.name}" name="color${i.name}" size=12 value="#000080" >#000080</input>${i.value}</input>

`



return spn;    
} // HTMLCssVarItem// try
catch(e) {
    hl("HTMLItem Error(" + key +") : " + e.message );
} // catch
} // HTMLCssVarItem

getCssVarItem( key) {
try {

    return {name: key,
         value:  getCssVar(key),
         Def: this.getCssVarDefault(key),
         desc: this.getCssVarDesc(key)
        } ;
}
catch(e) {
    hl( key + " = " + e.message);
}
} // getCssVarItem

getCssVarDefault( key) {
try {
return cssVarsDataDef[key];
}
catch(e){
    return e.message;
}
} // getCssVarDefault

getCssVarDesc( key) {
    try {
return cssVarsDataDesc  [key];
    }
    catch(e){
        return e.message;
    }
    } // getCssVarDesc
    


    

}); // Class lw-cssvar
}; // lwCssVar



export default lwCssVar;
 
