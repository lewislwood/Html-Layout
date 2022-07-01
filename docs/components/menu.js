import { helpLog as hl} from "./utils.js";
import menuStyles from './styles/menuStyle.js';
import menuList from "../data/menuData.js";

const lwMenu = () => {
    hl("registering lw-menu");
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
            
            const menu= document.createElement("div");
                menu.setAttribute("class", "menu");
                menu.setAttribute("title", "main menu");
            
                const ul = document.createElement("ul");
                ul.setAttribute("class", "menulist");
                menuList.forEach((v) => { this.addListItem(ul,v); }); 

                menu.appendChild(ul);
                mC.appendChild(menu);
            shadow.appendChild(mC);

                
            
            
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
        
}; //lwMenu
export default lwMenu 