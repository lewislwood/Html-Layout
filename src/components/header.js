import {helpLog} from "./utils.js";
import { headerStyle} from "./styles/headerrStyle.js";
import { regBanner } from './banner.js ';


const hl = helpLog;

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
const header= document.createElement("header");
header.setAttribute('class', 'lw-header');
header.setAttribute('role', 'navigation');
header.setAttribute('title', 'header');
const lb= document.createElement("div");
lb.setAttribute('class', 'header-logo-banner');
const b = document.createElement("lw-banner");
lb.appendChild(b);
const mb = document.createElement("div");
mb.setAttribute('class', 'headerMenu ');
header.appendChild(lb);

header.appendChild(mb);


mb.textContent = "this is menu";

shadow.appendChild( header);

}
catch(e) {
    hl( "header creation error: " + e.message);
}


    } //constructor
} //Class lwHeader

export const regHeader = () => {
    hl("Initializing banner...");
    const ban = regBanner;
    ban()
hl("Defining header.");  
    customElements.define('lw-header', lwHeader);
  
    hl("lw-header defined.");
  } // regheaderheader
    
    