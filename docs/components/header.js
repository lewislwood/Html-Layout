import {helpLog as hl} from "./utils.js";
import { headerStyle} from "./styles/headerrStyle.js";
import  lwBanner from './banner.js ';
 import lwMenu  from "./menu.js"; 

 const lwHeader = () => {
hl( "Registering LW-Header");
lwBanner()
lwMenu();

 customElements.define('lw-header', 
class lwHeader extends HTMLElement {
    constructor() {
      super();
try {
// hl("Generating header..");
// Create a shadow root
const shadow = this.attachShadow({mode: 'open'});
const style = document.createElement('style');
style.textContent = headerStyle;   
shadow.appendChild(style);
// Header container
const header= document.createElement("header");
header.setAttribute('class', 'lw-header');
header.setAttribute('role', 'navigation');
header.setAttribute('title', 'header');

// Logo plus Banner container
const lb= document.createElement("div");
lb.setAttribute('class', 'header-logo-banner');

// Banner 
const b = document.createElement("lw-banner");
lb.appendChild(b);

// Menu
const mb = document.createElement("lw-menu");
mb.textContent = "this is menu";

header.appendChild(lb);
header.appendChild(mb);



shadow.appendChild( header);

}
catch(e) {
    hl( "header creation error: " + e.message);
}


    } //constructor
}); //Class lw-header
 }; // lwHeader}

export default lwHeader ;