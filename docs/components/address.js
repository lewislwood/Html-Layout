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

    const ul = document.createElement("ul");
    ul.setAttribute("class", "addressList");
address.appendChild(ul);


// Define Address List Items
ul.appendChild(this.createLi(companyInfo .street)); 
ul.appendChild(this.createLi(companyInfo .csz)); 
ul.appendChild(this.createLi(companyInfo .phone, "tel:" + companyInfo .phone)); 
ul.appendChild(this.createLi(companyInfo .email, "mailto:" + companyInfo .email)); 

    shadow.appendChild(address);
} catch(e) {
hl("Address Error: " + e.message);
} // catch
  } // constructor

createLi(text, link) {
    const li = document.createElement('li');
    li.setAttribute("class", "addrItem");
try {
if (typeof(link)  !== "undefined") {
const a = document.createElement("a");
a.setAttribute("href",link );
a.textContent =  text;
li.appendChild(a);
    } else {
li.textContent = text;
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
    

}); // class lw-address
}; // lwAddress

export default lwAddress;