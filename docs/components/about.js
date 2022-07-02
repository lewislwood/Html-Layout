import {helpLog as hl} from "./utils.js";
 import { aboutStyle, logoUrl   } from "./styles/aboutStyle.js";

export const lwAbout = () => {
hl("registering lw-about..");
customElements.define("lw-about", 
class extends HTMLElement {
constructor() {
    super();
    try {
const shadow = this.attachShadow({mode: "open"});

const aC =document.createElement ("div");
const aR =document.createElement ("article");
const aL =document.createElement ("div");
const aI =document.createElement ("div");
aC.setAttribute("class", "lw-about");
aR.setAttribute("class", "lw-article");
aL.setAttribute("class", "logo");
aI.setAttribute("class", "main");
aC.appendChild(aR);
aR.appendChild(aL);
aR.appendChild(aI);
aR.setAttribute("role", "main")
AR.setAttribute("title", "About Company");

const img = document.createElement("img");
img.setAttribute("href", logoUrl);
img.setAttribute("alt", logoAlt);
aL.appendChild(img);

const h = document.createElement("h1"); 
h.textContent = "Company Info";
aI.appendChild(h);

shadow.appendChild(aC);
    } //try
    catch(e) {
hl("Error About: " + e.message);
    } // catch

} // constructor
}); // class lw-about
}; // lwAbout

