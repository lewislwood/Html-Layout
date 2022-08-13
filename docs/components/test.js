import {helpLog as hl,getJson } from "./utils.js";

// I use this file to test my latest javascript on test.html
//


export async function renderColors(){

const displayColors = (val) => {
  var out = "";
  // try {
    // const v = JSON.parse(val);
    // out = JSON.stringify( val);
  // } catch(e) {
    // hl("Parsing error: " + e.message);
  // } // catch
  hl("Parsing..");
  val.forEach((color) => {
    out = out + `${color.name}  = ${color.color}<br/>`;
  });
    const p = document.querySelector("#myJson") ;
    p.innerHTML= out;
}// DisplayColors
hl( "fetching data");
fetch("../data/test.json")
  .then((response) => response.json())

  .then((data) => displayColors(data));

  
    
  

 } // renderColors