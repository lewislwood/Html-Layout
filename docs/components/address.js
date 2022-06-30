import { helpLog as hl} from "./utils.js";
import companyInfo from "../data/companyInfo.js";
 import { addressStyle }  from './styles/addressStyle.js';

const createLi = (text, link) => {
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

} 
catch(e) {
    hl("AddressItem error: " + e.message);
    hl("AddressItem: " + text);
}

    
    
    return li;
}


// Create a class for the custom  lw-address  element
class lwAddress extends HTMLElement {
  constructor() {
    super();
try {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement('style');
    style.textContent = addressStyle;
    shadow .appendChild(style);

    const address= document.createElement("div");
    address.setAttribute("class", "addressBar");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "addressList");
address.appendChild(ul);


// Define Address List Items
ul.appendChild(createLi(companyInfo .street)); 
ul.appendChild(createLi(companyInfo .csz)); 
ul.appendChild(createLi(companyInfo .phone, "tel:" + companyInfo .phone)); 
ul.appendChild(createLi(companyInfo .email, "mailto:" + companyInfo .email)); 

    shadow.appendChild(address);
} catch(e) {
hl("Address Error: " + e.message);
}


  }
}

// Define the new element
export const regAddress = () => {
//   hl("Registering lw-address ...");
  customElements.define("lw-address", lwAddress);
  hl("lw-address registered.");
};
