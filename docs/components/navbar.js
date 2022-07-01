import { helpLog as hl } from "./utils.js";
import {navStyles } from './styles/navstyle.js';
import menuList from "../data/menuData.js";





// Create a class for the custom  lw-navbar  element
class lwNavBar extends HTMLElement {
  constructor() {
    super();
try {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement('style');
    style.textContent = navStyles;
    shadow .appendChild(style);

    const navbar= document.createElement("div");
    navbar.setAttribute("class", "navBar");
    navbar.setAttribute("title", "Navigation Bar");

    const ul = document.createElement("ul");
    ul.setAttribute("class", "navlist");
navbar.appendChild(ul);

menuList.forEach((value) => { this.addListItem(ul, value)});

    shadow.appendChild(navbar);
} catch(e) {
hl("NavBar Error: " + e.message);
} //catch
  } // constructor

  // Creates and appends the list item to the uul element
addListItem( ul, {name, href,img,title}) {
  const li= document.createElement("li");
  li.setAttribute("class", "navItem");
  const a = document.createElement("a");
  a.setAttribute("href", href );
  a.setAttribute("title", title);
  a.textContent = name;

  li.appendChild(a);  
  ul.appendChild(li);  
}  // end of addListItem

} //Class

// Define the new element
export const regNavBar = () => {
  customElements.define("lw-navbar", lwNavBar);
  hl("lw-navbar registered.");
};
