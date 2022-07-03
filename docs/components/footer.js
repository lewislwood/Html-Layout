import {helpLog as hl} from "./utils.js";
import { footerStyle} from "./styles/footerStyle.js";
import { regNavBar} from "./navbar.js";
import { regAddress} from "./address.js";

// Create a class for the element
class lwFooter extends HTMLElement{
    constructor() {
      super();
try   {
  hl("Generating footer..");
// Create a shadow root
const shadow = this.attachShadow({mode: 'open'});

const style = document.createElement('style');
style.textContent = footerStyle;   
shadow.appendChild(style);

const footer= document.createElement('footer');
footer.setAttribute('class', 'footer');
footer.setAttribute('role', 'navigation');
footer.setAttribute('title', 'footer');
const fOptions = this.footerOptions();

// NavBar component
if( fOptions.navBar === "true") {
const lwNavBar = document.createElement('lw-navbar');
footer.appendChild(lwNavBar);
} // if navBar
// Address

if( fOptions.address === "true") {
const lwAddress = document.createElement('lw-address');
footer.appendChild(lwAddress);
} // if address


shadow.appendChild(footer);

}
catch(e) {
hl( "Footer creation error: " + e.message);
} // catch
        } // constructor

        footerOptions() {
          return{ 
          logo: this.defaultAttr("logo", 'true'),
          navBar: this.defaultAttr("navBar", 'true'),
          address: this.defaultAttr("address", 'true')
           }} // footerOptions
          defaultAttr( attr, defValue) {
          var a = this.getAttribute( attr);
          if (a === null) return defValue; 
          a = a.toLowerCase();
          return a; 
          } // defaultAttribute
          
  } // class lwFooter
  
  // Define the new element
export const regFooter =() => {
  const nb = regNavBar;
  nb();

  const a = regAddress;
  a();

  customElements.define('lw-footer', lwFooter);

  hl("lw-footer defined.");
}
  
  