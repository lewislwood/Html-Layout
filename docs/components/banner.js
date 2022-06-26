import {helpLog} from "./utils.js";
 import { bannerStyle, bannerTitle, logoUrl, logoAlt  } from "./styles/bannerStyle.js";

const hl = helpLog;

class lwBanner extends HTMLElement {
    constructor() {
      super();
try {
// hl("Generating banner..");
// Create a shadow root
const shadow = this.attachShadow({mode: 'open'});
const style = document.createElement('style');
style.textContent = bannerStyle;   
shadow.appendChild(style);
const LB= document.createElement("DIV");
LB.setAttribute("CLASS", "LOGO-BANNER-flex")
const LOGO = document.createElement("DIV");

LOGO .setAttribute("CLASS", "LOGO-CONTAINER")


LB.appendChild(LOGO );

const image= document.createElement("img"); 
image.setAttribute("class", "logoImage");
image.setAttribute("alt",logoAlt );

image.setAttribute("src", logoUrl );
LOGO .appendChild(image);

const BC = document.createElement("DIV");
BC.setAttribute("CLASS","BANNER-CONTAINER");

LB.appendChild(BC);

const banner= document.createElement("span");
banner.setAttribute("class", "banner");
banner.textContent =bannerTitle; 
BC.appendChild(banner);


shadow.appendChild( LB);

}
catch(e) {
    hl( "banner creation error: " + e.message);
}


    } //constructor
} //Class lwBanner

export const regBanner= () => {
hl("Defining banner.");  
    customElements.define('lw-banner', lwBanner );
  
    hl("lw-banner defined.");
  } // regBanner
    
    