

const hl = document.querySelector("#helpLog");

const devEmulators= [ 
  {name: "iPhone", width: 768, height: 900},
  {name: "tablet", width: 1080, height: 900},
  {name: "HD", width: 1260, height: 900},


];



export const rootElement = () =>{ return  document.querySelector(":root")}

export const getCssVar = (CssVar) => {
    const rs =getComputedStyle( rootElement());
    return rs.getPropertyValue(CssVar);
}

export const setCssVar = (CssVar, value) =>    rootElement().style.setProperty(CssVar ,value);


export const helpLog = (message) => {
    console.log("HelpLog: ", message);

    try {
    if (helpLogExists()) {
        const cur = hl.innerHTML;
      hl.innerHTML = message + "<br/>" +cur;
    } // if 
    } // try
    catch(e) {
         console.log("HelpLog Error: ", e.message);    
         alert(e.message);
        }
} // HelpLog


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





const setUpDeviceList = ()  =>{
return "";
}  //setUpDeviceList


function quarter() {
  window.resizeTo(
    window.screen.availWidth / 2,
    window.screen.availHeight / 2
  );
}
