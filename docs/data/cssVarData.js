import {helpLog as hl} from "../components/utils.js";

  export const cssVars = {
    "main": { name: "main", inHerit_fg: "", inHerit_bg: "", fg: "", bg: "", notes: "Default color used throughout the web"},
    "header": { name: "header", inHerit_fg: "main", inHerit_bg: "main", fg: "", bg: "", notes: "Default colors used by objects in the header area."},
    "footer": { name: "footer", inHerit_fg: "main", inHerit_bg: "main", fg: "", bg: "", notes: "Default colors used by the objects placed in the footer area."},
    "banner": { name: "banner", inHerit_fg: "header", inHerit_bg: "header", fg: "", bg: "", notes: "Colors used in the banner area. Typically inherits header colors."},
    "menu": { name: "menu", inHerit_fg: "header", inHerit_bg: "header", fg: "", bg: "", notes: "Menu bar colors in the header area. Typically inherits from header."},
"navBar": { name: "navBar", inHerit_fg: "footer", inHerit_bg: "footer", fg: "", bg: "", notes: "Navigation Bar is similar to menu, but resiexit  in the footer area. Typically inherits footer colors."},
    "address": { name: "addres", inHerit_fg: "footer", inHerit_bg: "footer", fg: "", bg: "", notes: "Address bar is the company address and resides in the footer. Typically inherits footer colors."},
    "about": { name: "about", inHerit_fg: "main", inHerit_bg: "main", fg: "", bg: "", notes: "About page colors. Typically inherits from main colors."},
  }



  export const newColor = (color) => {
    const nc = { 
      name: color, 
      inHerit_fg: "", inHerit_bg: "", 
      fg: "", bg: "" , 
      notes: color + " added"
    };
    return nc; };;


  
    export const isColorVar = (cVar) => {
return ((typeof(cVar) === "string") ? (cVar.endsWith("_bg") || cVar.endsWith("_fg")): false); 
    }; 

    