

"use strict";
// devOps namespace
const devOps = {
  mode:1, // Initial mode see modes for value mode selected 
  modes : [ "disabled", "visible", "invisible"], // determines mode values and order
  actions: { mode :    { "Toggle": true, "key": -1,statusMessage: null} , log: { "Toggle": true, "key": -1}, clear: { "Toggle": true, "key": -1, statusMessage:null  }  },
  styleContent : `.devOpsNotVisible {  // Default styling used to create style object
    transform: scale(0,0);
  z-index: 0;
  position: absolute;
  top: -10;
  left: -10;
}
.devOpsContainer {
    display : flex;
    border-width: 3px;
    border-style: outset;
    flex-direction: row;
margin: 5px;
padding: 5px;
background-color: #000080; 
color: yellow;
}
#devOpsLogSection {
    flex-direction: column;
    align-items: flex-start;
}
`,
  loaded : false,
  "container": null,  // #devOpsContainter
  root : null,
"style": null,   // style
container : null, 
"logSection": null,  // #devOpsLogSection
"header": null,  // #devOpsHeading
'hl': null,  // #devOpsLog
 "clearButton": null,    // #devOpsClear,
 log: (message) => {
  console.log("HelpLog: ", message);

  try {
    
  if (devOps.hl !== null) {
      const cur = devOps.hl.innerHTML;
      devOps.hl.innerHTML = message + "<br/>" +cur;
  } // if 
  } // try
  catch(e) {
       console.log("HelpLog Error: ", e.message);    
       alert(e.message);
      }
 },
 clearLog : () => {
  try {
  if (devOps.hl !== null )   {
    devOps.hl.innerHTML ="Log Cleared.." ;
  };  // if hl
  }   catch(e) {
    console.log("devOps.clearLog error: " + e.message);
      }; // catch
 },
 setAction: (actionName= "mode", key = null, statusMessage= devOps.log, toggle = true) => {  // Way to turn off, reassign key where message goes
try {
const act = devOps.actions[actionName];

act.toggle == toggle;
if (key !== null) act.key = key;
act.statusMessage = statusMessage;

} catch(e) {
devOps.log('devOps.setAction error: '+ e.message);
}; //  catch
 },
 toggleMode : (m) => { 
  try {
  devOps.mode = ((m === undefined)? devOps.mode + 1 :  m);
if ((devOps.mode > (devOps.modes.length - 1) ) || (devOps.mode < 0)) devOps.mode = 0;
  const mode = ((devOps.modes.length > 0) ? devOps.modes[devOps.mode]: 'empty')  
  devOps.log(`toggling mode:${devOps.mode}  [${mode}}]`)
  const act = devOps.actions.mode;
  devOps.log(`#${devOps.mode}  mode:${mode}`)
  if (act.statusMessage === null) act.statusMessage = devOps.log;
  // act.statusMessage(`Switch to devOps mode ${mode}.`);
switch (mode) {
case "empty":
  devOps.log("Empty devOps.modes: adding mode visible");
  devOps.modes.push("visible");
  case "visible": 
  devOps.container.classList.remove("devOpsNotVisible");
  devOps.container.setAttribute("aria-hidden", "false");
  break;
  case "invisible" :
    devOps.container.classList.add("devOpsNotVisible");
  devOps.container.setAttribute("aria-hidden", "false");
  break;
  case "disabled" :
    devOps.container.classList.add("devOpsNotVisible");
  devOps.container.setAttribute("aria-hidden", "true");
  break;
  default :
  devOps.log(`Invalid mode, ignoring value:${mode}  #${devOps.mode}}`);
}; // switch
  } catch(e) {
devOps.log("devOps.toggleMode error: " + e.message);
  }; // catch
 }
}; // devOps namespace

// KeyHandler outside devOps namespace in order to for security reasons
const devOpsKeyHandler = (e) => {
const message = `You pressed key:${e.key}  code:${e.code}.`;
if ( e.altKey  && e.shiftKey) {
switch (e.key) {
case "C":
  devOps.log("You pressed clear log");
  devOps.clearLog();
break;
case "D":
  devOps.log("You pressed toggle log.");
devOps.toggleMode();
break;
}; // switch
};
}; // devOpsKeyHandler

(function init() {
  console.log("devOps Initializing..");
  devOps .root = document.querySelector("#devOpsRoot");
  if (devOps .root === undefined) {console.log("devOps Root not there."); }  
  else {
    const dr = devOps.root;
    devOps.style = dr.querySelector("style");;
    if (devOps.style === undefined) { console.log("Style not found.")};
  devOps .container = dr.querySelector("#devOpsContainer");
  if (devOps .container  === undefined) {console.log("containter not there."); }
  devOps.header = dr.querySelector("#devOpsHeading");
  if (devOps.header === undefined) { console.log("header not found.")};
  devOps.hl = dr.querySelector("#devOpsLog");
  if (devOps.hl === undefined) { console.log("HL not found.")};
  devOps.clearButton = dr.querySelector("#devOpsClear");
  if (devOps.clearButton === undefined) { console.log ("clear button not found.")};
  devOps.clearButton.onclick = () => { devOps.clearLog(); {;}};
  window.addEventListener( "keyup",devOpsKeyHandler );
  
  devOps.loaded = true;
  devOps.log("DevOps Loaded successfully.");
  }; // devOps Root is defined.
  })()  // initializing...
  
export default devOps;