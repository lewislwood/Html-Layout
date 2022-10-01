import  themes from "./themes.js";
import {helpLog as hl, initSkipToContent } from "./utils.js";
import { layoutStyle } from "./styles/layoutstyle.js";
import lwFooter from "./footer.js";
import lwHeader from "./header.js";
import devOps from "./devops.js";

"use script";
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
ch.setAttribute("class", "layoutBody");
ch.setAttribute("id", "layout-body-main")


if(this.hasChildNodes())   {
ch.innerHTML =  this.innerHTML;
this.innerHTML = ""
}

    const shadow = this.attachShadow({mode: "open", delegatesFocus: true});
const style = document.createElement("style"); 
style.textContent = layoutStyle ;
shadow.appendChild(style);
shadow.appendChild(this.addSkipTo());
const layout = document.createElement("div");
layout.setAttribute("class", "layout");
layout.setAttribute("id", "lw-layout_id");




 const lOptions =this.layoutOptions ();

 if( lOptions.header === "true") {
    hl("Layout doing lw-header");
 const h = document.createElement("div");
 h.setAttribute("class", "layoutHeader");
 h.innerHTML = ` <lw-header
 logo="${lOptions.logoHeader}"
 menu="${lOptions.menu}"
 </>>
 `
layout.appendChild(h);
}
//  Now add children
 layout.appendChild(ch);

// Footer section
if( lOptions.footor === "true") {
    const f = document.createElement("div");
    f.setAttribute("class", "layoutFooter");
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

addSkipTo() {
    const sD = document.createElement("div");
    sD.setAttribute('class',"skip-to-container");
    sD.innerHTML = `
    <button  id="layoutSkipToContent" style="transform:scale(0,0);z-index: 0;position: absolute;top: -10;left: -10;" 
    type="link" 
    
    data-skip-to-content="layout-body-main"
    >Skip To Content</button>`
return sD;    
};

connectedCallback() {
    try {
        const btn = this.shadowRoot.querySelector("#layoutSkipToContent");;
        const el = this.shadowRoot.querySelector("#layout-body-main");
btn.onclick = (e) => { el.onclick();};


    } // try
    catch(e) {
        hl("layout connected callback: "+e.message);
    }
    
  } // connected_Callback

  disconnectedCallback() {
    hl("Disconnected Layout.");
  }

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