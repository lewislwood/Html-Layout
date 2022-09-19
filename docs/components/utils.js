

const hl = document.querySelector("#helpLog");
let btnClearLogSet = false;



export async function getJSON(url, callBack) {
  helpLog( "Fetching : " + url );
try {
  fetch(url)
  .then((response) => response.json())

  .then((data) => callBack(data));

} catch(e) {
hl("getJSON Error ()" + url + "): " + e.message);
} //catch
} // getJSON(url, callback)
  




const getSkipToContent = () => {return document.body.querySelector( "#layoutSkipToContent");};


// Set the data attribute to where you want it to skip to
export const setSkipToContent = (cSelector) => {
  try {
    const btn = getSkipToContent ();
    btn.setAttribute("data-skip-to-content", cSelector);

  } //try
    catch(e) {
helpLog( "setSkipToContent Error: " + e.message);
  } // catch
} //setSkipToContent 



// attach click event handler to skipToContent buttonthe
export const initSkipToContent = () => {
try {
  const btn = getSkipToContent ();
  btn.addEventListener("click", (we) => {
    try {
      const cT = document.body.dataset.skipToContent;
      const el = document.querySelector(cT);
      el.focus();
    } //try
    catch(error) {
      helpLog("SkipToContent Error: " + error.message)

    } // catch
})

} //try
catch(e) {
helpLog("initSkipToContent  error: " + e.message);
} //catch
} //initSkipToContent 





const devEmulators= [ 
  {name: "iPhone", width: 768, height: 900},
  {name: "tablet", width: 1080, height: 900},
  {name: "HD", width: 1260, height: 900},


];


export function getAllCSSVariableNames(styleSheets = document.styleSheets){
  var cssVars = [];
  // loop each stylesheet
  for(var i = 0; i < styleSheets.length; i++){
     // loop stylesheet's cssRules
     try{ // try/catch used because 'hasOwnProperty' doesn't work
        for( var j = 0; j < styleSheets[i].cssRules.length; j++){
           try{
              // loop stylesheet's cssRules' style (property names)
              for(var k = 0; k < styleSheets[i].cssRules[j].style.length; k++){
                 let name = styleSheets[i].cssRules[j].style[k];
                 // test name for css variable signiture and uniqueness
                 if(name.startsWith('--') && cssVars.indexOf(name) == -1){
                    cssVars.push(name);
                 }
              }
           } catch (error) {}
        }
     } catch (error) {}
  }
  return cssVars;
} // getAllCSSVariableNames


export const rootElement = () =>{ return  document.querySelector(":root")}

export const getCssVar = (CssVar) => {
    const rs =getComputedStyle( rootElement());
    return rs.getPropertyValue(CssVar);
}

export const setCssVar = (CssVar, value) =>    rootElement().style.setProperty(CssVar ,value);
const setUpDeviceList = ()  =>{
return "";
}  //setUpDeviceList


function quarter() {
  window.resizeTo(
    window.screen.availWidth / 2,
    window.screen.availHeight / 2
  );
}



export const helpLog = (message) => {
  console.log("HelpLog: ", message);

  try {
    
  if (helpLogExists()) {
    if ( btnClearLogSet !== true)  { setClearLogButton();};
      const cur = hl.innerHTML;
    hl.innerHTML = message + "<br/>" +cur;
  } // if 
  } // try
  catch(e) {
       console.log("HelpLog Error: ", e.message);    
       alert(e.message);
      }
} // HelpLog

const setClearLogButton = () => {
btnClearLogSet = true;
const btn = document.getElementById("clearHelpLog");

if ( btn !== null) {
btn.onclick = clearHelpLog;
} // if if btn ClearLog found

} // setClearLogButton


export const helpLogExists = () =>  {
return  (hl !== null)   ;
}

export const clearHelpLog = () => {

try {
if (helpLogExists() )   {
  hl.innerHTML ="Log Cleared.." ;
} // if hl
} //try
catch(e) {
    }
} //ClearLog
