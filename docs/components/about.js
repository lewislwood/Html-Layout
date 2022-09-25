import {helpLog as hl} from "./utils.js";
 import { aboutStyle } from "./styles/aboutStyle.js";
 import{ companyName,  logoUrl, logoAlt  }  from "../data/companyInfo.js"; 
 "use script";
export const lwAbout = () => {
hl("registering lw-about..");
customElements.define("lw-about", 
class extends HTMLElement {
constructor() {
    super();
    try {
const shadow = this.attachShadow({mode: "open"});
const style = document.createElement("style");
style.textContent = aboutStyle;
shadow.appendChild(style);

const aC = document.createElement ("div");
const art = document.createElement ("div");
const aL = document.createElement ("div");
const aI = document.createElement ("div");
aC.setAttribute("class", "aboutContainer");
art.setAttribute("class", "aboutFlex");
aL.setAttribute("class", "logo");
aI.setAttribute("class", "main");
aC.appendChild(art);
art.appendChild(aL);
art.appendChild(aI);
art.setAttribute("role", "main")
art.setAttribute("title", "About Company");

aL.innerHTML = ` 
<img = src="${logoUrl}" alt="${logoAlt}"/>
`

aI.innerHTML= `
<h1>${companyName}</h1> 
<lw-address type="about"  />
`

shadow.appendChild(aC);
    } //try
    catch(e) {
hl("Error About: " + e.message);
    } // catch

} // constructor
}); // class lw-about
}; // lwAbout

