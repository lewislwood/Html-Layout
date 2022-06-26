import {helpLog} from "./utils.js";
import { footerStyle} from "./styles/footerStyle.js";
import { regNavBar} from "./navbar.js";
import { regAddress} from "./address.js";

const hl = helpLog;

// Create a class for the element
class lwFooter extends HTMLElement {
    constructor() {
      super();
try   {
  // hl("Generating footer..");
// Create a shadow root
const shadow = this.attachShadow({mode: 'open'});

const style = document.createElement('style');
style.textContent = footerStyle;   
shadow.appendChild(style);

const footer= document.createElement('footer');
footer.setAttribute('class', 'lw-footer');
footer.setAttribute('role', 'navigation');
footer.setAttribute('title', 'footer');

const lwNavBar = document.createElement('lw-navbar');
footer.appendChild(lwNavBar);
const lwAddress = document.createElement('lw-address');
footer.appendChild(lwAddress);


shadow.appendChild(footer);

}
catch(e) {
hl( "Footer creation error: " + e.message);
}
        }
  }
  
  // Define the new element
export const regFooter =() => {
  const nb = regNavBar;
  nb();

  const a = regAddress;
  a();

  customElements.define('lw-footer', lwFooter);

  hl("lw-footer defined.");
}
  
  