import { helpLog } from "./utils.js";
import {menuStyles } from './styles/menustyle.js';

// const hl = helpLog;
// 
// 





customElements.define("lw-menu", 
class extends HTMLElement {
constructor() {
super();
try {
// attach shadow
const shadow = this.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = menuStyles;
shadow.appendChild(style);

// Container
const mC = document.createElement("div");
mC.setAttribute("class", "menuContainer");
shadow.appendChild(mC);
mC.textContent = "lw layout is here";

const menu= document.createElement("div");
    menu.setAttribute("class", "menu");
    menu.setAttribute("title", "main menu");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "menulist");
    menuList.forEach((value) => { addListItem(ul, value)});<menu className="app">(ul);</menu>


} // try
catch(e) {
    hl( "Error lwMenu: " + e.message);
} //catch


}; // constructor

// Creates and appends the list item to the uul element
addListItem( ul, {name, href,img,title}) {
    const li= document.createElement("li");
    li.setAttribute("class", "menuItem");
    const a = document.createElement("a");
    a.setAttribute("href", href );
    a.setAttribute("title", title);
    a.textContent = name;
  
    li.appendChild(a);  
    ul.appendChild(li);  
  }  // end of addListItem
  
}); // class lw-menu
