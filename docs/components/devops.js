

"use strict";

const devOpsStatus = { 
    "mode":1,  //  ["visible", "invisible", 'disabled"0-disabled, 1-invisible, 2-visible
"toggleMode": true,
"enableClearLog": true,
"keyMode": -1,
"keyClear": -1
};

const devOps = {  "loaded": false,
"container": null,  // #devOpsContainter
"style": null,   // style
"logSection": null,  // #devOpsLogSection
"header": null,  // #devOpsHeading
'hl': null,  // #devOpsLog
 "clearButton": null    // #devOpsClear
};


 (function init() {

if ( ! devOps.loaded) {
console.log("Not loaded yet");
devOps .container = document.querySelector("#devOpsContainter");
if (devOps .container  === undefined) {console.log("containter not there."); }
else {
    const dc = devOps .container ;
    devOps.style = dc.querySelector("style");;
    if (devOps.style === undefined) { console.log("Style not found.")};
devOps.header = dc.querySelector("#devOpsHeading");
if (devOps.header === undefined) { console.log("header not found.")};
devOps.hl = dc.querySelector("#devOpsLog");
if (devOps.hl === undefined) { console.log("HL not found.")};
devOps.clearButton = dc.querySelector("#devOpsClear");
if (devOps.clearButton === undefined) { console.log("clear button not found.")};
};
};

console.log("Hello World");
})()






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




