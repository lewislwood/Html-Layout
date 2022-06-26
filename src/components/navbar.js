import { helpLog } from "./utils.js";
import {navStyles } from './styles/navstyle.js';

const hl = helpLog;
const navList = 
[
  { "name": "Home", "href": "#home", "img": "", "title": "Non Component Home"},
  { "name": "cHome", "href": "#chome", "img": "", "title": "Component based Home"},
  { "name": "About", "href": "#About", "img": "", "title": "Company About Page"},
  { "name": "Gallery", "href": "#Gallery", "img": "", "title": "Gallery Images"}
]

// Creates and appends the list item to the uul element
function addListItem( ul, {name, href,img,title}) {
  const li= document.createElement("li");
  li.setAttribute("class", "navItem");
  const a = document.createElement("a");
  a.setAttribute("href", href );
  a.setAttribute("title", title);
  a.textContent = name;

  li.appendChild(a);  
  ul.appendChild(li);  
}  // end of addListItem


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

navList.forEach((value) => { addListItem(ul, value)});

    shadow.appendChild(navbar);
} catch(e) {
hl("NavBar Error: " + e.message);
}


  }
}

// Define the new element
export const regNavBar = () => {
  customElements.define("lw-navbar", lwNavBar);
  hl("lw-navbar registered.");
};
