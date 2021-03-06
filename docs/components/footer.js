import {helpLog as hl} from "./utils.js";
import { footerStyle} from "./styles/footerStyle.js";
import lwNavBar from "./navbar.js";
import lwAddress from "./address.js";

function lwFooter () {
  lwNavBar();
lwAddress()  
customElements.define('lw-footer', 
class extends HTMLElement{
  
    constructor() {
      super();
try   {
  hl("Generating footer..");
// Create a shadow root
const shadow = this.attachShadow({mode: 'open'});

const style = document.createElement('style');
style.textContent = footerStyle;   
shadow.appendChild(style);

const footer= document.createElement('div');
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

if( fOptions.address !== "false") {
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
          
  }); // class lw-Footer
}; // lwFooter
  
export default lwFooter;