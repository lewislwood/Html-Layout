import {helpLog as hl, getCssVar , getAllCSSVariableNames} from "./utils.js";
 import { cssVarStyle } from "./styles/cssVarStyle.js";

function lwCssVar() {
    

hl("reging cssVar");
customElements.define("lw-cssvar", 
class extends HTMLElement {
constructor() {
    super();
    try {
        hl("cssVar Generating Html..");    
        const shadow = this.attachShadow({ mode: "open"});
        const style = document.createElement("style");
        shadow.appendChild(style);
const bC = document.createElement("div");
bC.setAttribute("class", "bodyContainer");
bC.innerHTML = `<h1>ccsVars Conainer displayed.</h1>
<ul>
${this.CssVarsList().map((n) => ("<li>"+ n + "</li>")) }
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
return cVars.map((n) => (this.getCssVarItem(n)  ) );
}; // cssVarsList

getCssVarItem( name) {
try {
    return (name + " = " + getCssVar(name) );
}
catch(e) {
    return ( name + " = " + e.message);
}
} // getCssVarItem


    

}); // Class lw-cssvar
}; // lwCssVar



export default lwCssVar;
 
