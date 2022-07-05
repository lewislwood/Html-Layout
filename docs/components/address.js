import { helpLog as hl} from "./utils.js";
import companyInfo from "../data/companyInfo.js";
 import { addressStyle, addressAboutStyle  }  from './styles/addressStyle.js';
    
function lwAddress() {
customElements.define("lw-address", 
class extends HTMLElement {
  constructor() {
    super();
try {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement('style');
    const lAbout = ( this.defaultAttr("type", "true") === "about") ;
    if(lAbout)  { 
        hl( "Address is About type");
                style.textContent = addressAboutStyle;
    } else {
        style.textContent = addressStyle;
    } //if else
    shadow .appendChild(style);

    const address= document.createElement("div");
    address.setAttribute("class",  (lAbout ? "addressColumn" : "addressBar"));

// Define Address List Items
    address.innerHTML =  this.buildAddress(lAbout);

    shadow.appendChild(address);
} catch(e) {
hl("Address Error: " + e.message);
} // catch
  } // constructor

createItem( tag, text, link) {
var li = `<${tag} class="addressItem">`;
    
try {
if (typeof(link)  !== "undefined") {

    li = li + `
<a href="${link}">${text}</a>
</${tag}>
`
    } else {
        li = li + `${text} </${tag}>`  
    }
} // try 
catch(e) {
    hl("AddressItem error: " + e.message);
    hl("AddressItem: " + text);
} // catch
return li;
} // createLI
defaultAttr( attr, defValue) {
    var a = this.getAttribute( attr);
    if (a === null) return defValue; 
    a = a.toLowerCase();
    return a; 
    } // defaultAttribute
    
buildAddress(lAbout){
    const tag = (lAbout ? "p": "li"); 
    const pre = (lAbout ? "" : `<ul class="addrList">`);
    const post = (lAbout ? "" : "</ul>");
    return `
    ${pre}
${this.createItem( tag, companyInfo .street)}
    ${this.createItem( tag, companyInfo .csz) }
    ${this.createItem( tag, companyInfo .phone, "tel:" + companyInfo .phone)}
    ${this.createItem( tag, companyInfo .email, "mailto:" + companyInfo .email) }
${post}
`
}
}); // class lw-address
}; // lwAddress

export default lwAddress;