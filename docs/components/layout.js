import {helpLog} from "./utils.js";
import { layoutStyle } from "./styles/layoutstyle.js";
import {regFooter} from "./footer.js";
import {regHeader } from "./header.js";




customElements.define('lw-layout', 
class lwLayout extends HTMLElement {
constructor() {
super();
try {
    const shadow = this.attachShadow({mode: "open"});
const style = document.createElement("style"); 
style.textContent = layoutStyle ;
shadow.appendChild(style);
const theOptions = options();

} // Try
catch(e) {
    hl("lw-layout Error: " + e.message);
} // catch
} // constructor

Options(){
var opts = { header: true, footor: true,
logoHeader: true, logofooter: true,
menu: true, navBar: true,
address: true
 }

 if (this.getAttribute("header") !== null) {
    opts.header = ((this.getAttribute("header") === "true")  ?true : false);  
 } // if  header

return opts;
} // Options

}); // lw-layout



const getLayout = () => {
    const hl = helpLog;
    helpLog("Doing Layout");
const footer = regFooter;
hl("Registering Footer..");
footer();

const header = regHeader;
hl( "Registering Header");
header();


}









export default getLayout 