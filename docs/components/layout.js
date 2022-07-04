import {helpLog as hl} from "./utils.js";
import { layoutStyle } from "./styles/layoutstyle.js";
import lwFooter from "./footer.js";
import lwHeader from "./header.js";


const lwLayout = () => {

    hl("defining Layout");
    lwHeader ();
    lwFooter()
customElements.define('lw-layout', 
class extends HTMLElement {
constructor() {
super();
try {
    hl("Doing Layout");
    // Children section
    //  Do before shadow..
const ch = document.createElement("div"); 

if(this.hasChildNodes())   {
ch.innerHTML = this.innerHTML;
this.innerHTML = ""
}

    const shadow = this.attachShadow({mode: "open"});
const style = document.createElement("style"); 
style.textContent = layoutStyle ;
shadow.appendChild(style);
const layout = document.createElement("div");
layout.setAttribute("class", "lw-layout");
 const lOptions =this.layoutOptions ();

 if( lOptions.header === "true") {
 const h = document.createElement("div");
 h.innerHTML = ` <lw-header 
 logo="${lOptions.logoHeader}"
 menu="${lOptions.menu}"
 `
layout.appendChild(h);
}
//  Now add children
 layout.appendChild(ch);

// Footer section
if( lOptions.footor === "true") {
    const f = document.createElement("div");
    f.innerHTML = `<lw-footer
     logo="${lOptions.logofooter}"
      navbar="${lOptions.navBar}" 
      address="${lOptions.address}" />
      `;
    // f.setAttribute("logo", lOptions.logofooter);
//  f.setAttribute("navbar", lOptions.navBar);
//  f.setAttribute("address", lOptions.address)

 layout.appendChild(f);    
}
shadow.appendChild(layout);
} // Try
catch(e) {
    hl("lw-layout Error: " + e.message);
} // catch
} // constructor
layoutOptions() {
return{ 
    header: this.defaultAttr("header", 'true'),
     footor: this.defaultAttr("footer", 'true'),
logoHeader: this.defaultAttr("logoHeader", 'true'),
logofooter: this.defaultAttr("logoFooter", 'true'),
menu: this.defaultAttr("menu", 'true'),
navBar: this.defaultAttr("navBar", 'true'),
address: this.defaultAttr("address", 'true')
 }} // layoutOptions
defaultAttr( attr, defValue) {
var a = this.getAttribute( attr);
if (a === null) return defValue; 
a = a.toLowerCase();
return a; 
} // defaultAttribute

});    // class llw-layout // 
}; // lwLayout

export default lwLayout;