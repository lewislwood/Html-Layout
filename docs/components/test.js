import {helpLog as hl, getJSON, rootElement } from "./utils.js";
import {colorCssVars  } from "./colorVars.js";


// I use this file to test my latest javascript on test.html
//


const testContainer = document.getElementById("testContainer");

 const csv = new colorCssVars  ;
let colorNames = [];

let tmr ;
export async function renderColors(){
try {
  testContainer.appendChild( csv.getStyleObject());
  // testContainer.appendChild( GetFetchTest());
testContainer.appendChild( csv.getListBox());
testContainer.appendChild( csv.getDetailsContainer());
 // Add the status update
 testContainer.appendChild(getStatusObject() );

document.addEventListener('DOMContentLoaded', (event) => { connectEveryThing(event);});
// window.addEventListener('load', (event) => {
  // hl('page is fully loaded');
  // myTest();
// });

} catch(e) {
  hl("RenderColors error: " + e.message);
} // catch
  
} // renderColors
const myTest = () => {
  const [n, s]  = myparse ("--header_fg:);")
  hl("Lewis parse test: " + n + "  >" + s);
}



const myparse = ( cvar) => {
const cn = cvar.trim().replace(/^--/, "");
const iSuffix = cn.search(/(?<=_)[f|b]g/);
const  ll = (name.length - 3 );
try {
if (iSuffix != -1) {
const suffix = cn.substr(iSuffix);
const n = cn.substr(0,  iSuffix - 1)
return [n, suffix];
} else {
  return [cn, ""];
}; // if has suffix else

}   catch(e) {
  hl("colorVar.parseColorVar error: " + e.message);
}; // catch
}    ; // parseColorVar



let helpStatus = null;
const initStatus = () => { 
  helpStatus = document.getElementById("helpStatus"); 
}; // initStatus
let tmrStatus = null;
const hs = (text) => { 
clearStatus();

helpStatus.textContent = text;
tmrStatus =  setTimeout(clearStatus, 5000);
};

const clearStatus = () => {
  if (tmrStatus !== null) { clearTimeout(tmrStatus)};
  tmrStatus = null;
  helpStatus.textContent = "";
} // clearStatus

const getStatusObject = () => {
const p = document.createElement("h5");
p.setAttribute("aria-live", "assertive");
p.setAttribute("id","helpStatus")
return p;
} // getStatusObject


const connectEveryThing = (e) => {
hl("Connecting EveryThing");
initStatus ();
csv.hs = hs;

csv.connected(testContainer);

} // connectEveryThing





 // Gets the test objects to inject for fetch test verification
 const GetFetchTest =  () => {
const p = document.createElement("p");

p.setAttribute("id", "myJson");
p.textContent = "Waiting for output";
return p;
 } // GetFetchTest 


 const displayColors = (e) => {
  if (csv.names === undefined) {

    hl( "Color Names not loaded. Setting tier try: " + e)
if (e < 3) {     tmr = setTimeout(displayColors, 300, e + 1);};
    return ;
  } // colorNames = null
  hl("displaying color colorNames.at.apply.");
  hl("Variables loaded: " + csv.hasLoaded());
  colorNames = csv.names;  
  var val  = csv.names;
  const p = document.getElementById("myJson");
      p.textContent = `${val.length} Color Names Found. ${csv.variables.length} variables found.
      `
      initDropBox();
  }// DisplayColors
 const initDropBox = () => {
  hl("Initializing DropBox");
const select = document.querySelector('#colorNames');
const makeOption = (n, h) => {
const o = document.createElement("option");
o.setAttribute("value", h);
o.innerHTML = `
<span style="background-color: #000080">${n}</span>
`
return o;

} // makeOption
const colors =  [];
colorNames.forEach((c) =>colors.push(makeOption(c.name, c.color)) );
try {
const options = Array.from(select.options);
options.forEach(option => { 
  option.remove();
  option.selected = false;
});
hl("Appending Options..");
select.append(... colors);
} catch(e) {
hl("initDropBox error: " + e.message);
} //catch


 }  // initDropBox



 function setUpDropBox() {
  const select = document.querySelectorAll('select');
  const options = Array.from(select[0].options);
  const input = document.querySelector('input');
  function findMatches (search, options) {
    return options.filter(option => {
      const regex = new RegExp(search, 'gi');
      return option.text.match(regex);
    });
  }
  function filterOptions () {
    options.forEach(option => { 
      option.remove();
      option.selected = false;
    });
    const matchArray = findMatches(this.value, options);
    select[0].append(...matchArray);
  }
  input.addEventListener('change', filterOptions);
  input.addEventListener('keyup', filterOptions);
}
