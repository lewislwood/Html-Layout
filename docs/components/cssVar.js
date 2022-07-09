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
        const shadow = this.attachShadow({ mode: "open"});
        const style = document.createElement("style");
        shadow.appendChild(style);
const bC = document.createElement("div");
bC.setAttribute("class", "bodyContainer");




bC.innerHTML = `<h1>ccsVars Conainer displayed.</h1>
<ul>
 ${this.CssVarsList()}
</ul>
`;



shadow.appendChild(bC);
hl("cssVar Element generated");
    } // try
catch(e) {
hl( "cssVar Error: " +  e.message);
    } // catch

} // constructor //

CssVarsList() {
const cVars = getAllCSSVariableNames();
return cVars.map((n) => (this.HTMLCssVarItem(n)  ) );
}; // cssVarsList
HTMLCssVarItem( key) {
    

    try {
        const i = this.getCssVarItem(key);



    return `
    <li>${i.name}: ${i.value} Default: ${i.Def}  :: ${ i.desc} </li>
    `;
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
 
