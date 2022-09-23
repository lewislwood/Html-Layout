

"use strict";

class devOps {
static mode = 2;
static modes =[ "disabled", "visible", "invisible"] // determines mode values and order 
static notes = true; // Wether or not to add a developers Notes and section
static #controls = {
  root : null, // #devOpsRoot
style: null,   // style
"container" : null, 
logContainer: null,  // #devOpsLogSection
header: null,  // #devOpsHeading
hl: null,  // #devOpsLog
clearButton: null,
notesContainer: null,
notesList: null,
notesHeader : null
}; // Controls
static actions =  { mode :    { "Toggle": true, "key": -1,statusMessage: null} , log: { "Toggle": true, "key": -1}, clear: { "Toggle": true, "key": -1, statusMessage:null  }, share: { "Toggle": true, "key": -1, statusMessage:null  }    }
constructor() {
throw new error("Static class you cannot create an instance");
}; // constructor
static {
  devOps.#initialize(); 
};
static #initialize() {
  const dc = devOps.#controls;
  dc.root = document.querySelector("#devOpsRoot");
  if (dc.root === null) {console.log("devOps Root not there."); }  
  else {
    const dr = dc.root;
    dc.style = dr.querySelector("style");;
    if (dc.style === undefined) { console.log("Style not found.")};
    
    dc.container = dr.querySelector("#devOpsContainer");
    if (dc.container === null) {console.log("devOpsContainter not found.");}
    else {
      devOps.#initLog(dr);
    }; // devOps Containter

    devOps.#initNotes(dr);
  devOps.log("DevOps Loaded successfully.");
  }; // devOps Root is defined.
  
}; // Initialize()}
 static #initLog(  root ) {
try {
  const dc = devOps.#controls;
  dc.logContainer = root.querySelector("#devOpsLogSection");
  if (dc.logContainer  === null) {console.log("Log containter not there."); }
  else {
  if (dc.header  === null) dc.header = root.querySelector("#devOpsHeading");
  if (dc.header === undefined) { console.log("header not found.")};
if (dc.hl  === null) dc.hl = root.querySelector("#devOpsLog");
  if (dc.hl === undefined) { console.log("HL not found.")};
  if (dc.clearButton  === null) dc.clearButton = root.querySelector("#devOpsClear");
  if (dc.clearButton === undefined) { console.log ("clear button not found.")}
  else {
  dc.clearButton.onclick = () => { devOps.clearLog(); {;}};
  }; // clearButton
  window.addEventListener( "keyup",devOps.keyHandler);
  devOps.toggleMode(devOps.mode, true);
}; // if containter
  
  devOps.loaded = true;
  
} catch(e) {
console.log('devOps.initLog error: '+ e.message);
}; //  catch
}; // initLog 

 static #initNotes(  root ) {
try {
if (devOps.notes) {
const dc = devOps.#controls;
if (dc.notesContainer === null) dc.notesContainer = root.querySelector("#devOpsNotesContainer");
if (dc.notesContainer === null) console.log("Notes Container not found.")
else {
dc.notesHeader = root.querySelector("#devOpsNotesHeader");
if (dc.notesHeader === null) console.log("devOps Notes Header not found.")
else dc.notesHeader.setAttribute("tabindex", "0");  // allows focus from button

dc.notesList = root.querySelector("#devOpsNotesList");
if (dc.notesList  === null) console.log("Notes List not found.")
else {
  // Add List Items
  console.log("Will add list items later.");
}; // if noteList
}; // if notes container
const b = document.querySelector("#devOpsNotesButton");
if (b === null) console.log("Notes button not found.")
else {
  console.log("found notes button.");
  
  b.onclick = (e) => {devOps.goToNotes(e);};
}; // if notes button exist

};// if notes enabled
} catch(e) {
console.log('devOps.initNotes error: '+ e.message);
}; //  catch
}; // initNotes 

static  goToNotes(  e ) {
try {
  const dc = devOps.#controls;
  const nh = dc.notesHeader;
  if (nh=== null) devOps.log("Notes Header not set.")
  else nh.focus();
} catch(e) {
devOps.log('devOps.goToNotes error: '+ e.message);
}; //  catch
}; // goToNotes 
  static log(message) {
    console.log("HelpLog: ", message);
  try {
    
    const hl = devOps.#controls.hl;
  if (hl !== null) {
      const cur = hl.innerHTML;
      hl.innerHTML = message + "<br/>" +cur;
  } // if 
  } // try
  catch(e) {
       console.log("HelpLog Error: ", e.message);    
       alert(e.message);
      }; 
  }; // log(message)
  static keyHandler(e) {
    if ( e.altKey  && e.shiftKey) {
    switch (e.key) {
    case "C":
      devOps.clearLog();
    break;
    case "D":
    devOps.toggleMode();
    break;
    case "S" :
      devOps.shareLog();
    break;
    }; // switch
  }; // if alt + shift
  }; keyHandler

  static toggleMode(setMode = null, silent = false) {
    try {
      devOps.mode = ((setMode  === null)? devOps.mode + 1 :  setMode);
    if ((devOps.mode > (devOps.modes.length - 1) ) || (devOps.mode < 0)) devOps.mode = 0;
      const mode = ((devOps.modes.length > 0) ? devOps.modes[devOps.mode]: 'empty')  
      const act = devOps.actions.mode;
      if (act.statusMessage === null) act.statusMessage = devOps.log;
      const c = devOps.#controls.container;
    switch (mode) {
    case "empty":
      devOps.log("Empty devOps.modes: adding mode visible");
      devOps.modes.push("visible");
      case "visible": 
      act.statusMessage(`Enable Log: Visible`);

      c.classList.remove("devOpsNotVisible");
      c.setAttribute("aria-hidden", "false");
      break;
      case "invisible" :
        act.statusMessage(`Log not visible or accessible without screen reader`);
        c.classList.add("devOpsNotVisible");
      c.setAttribute("aria-hidden", "false");
      break;
      case "disabled" :
        act.statusMessage(`Log disabled for everyone. Press alt plush shift + D to bring it back.`);
        setTimeout(() => {
        c.classList.add("devOpsNotVisible");
      c.setAttribute("aria-hidden", "true");
    },350);
      break;
      default :
      devOps.log(`Invalid mode, ignoring value:${mode}  #${devOps.mode}}`);
    }; // switch
      } catch(e) {
    devOps.log("devOps.toggleMode error: " + e.message);
      }; // catch
  }; // toggleMode
  static setAction(actionName= "mode", key = null, statusMessage= devOps.log, toggle = true) {
    try {
    const act = devOps.actions[actionName];
    
    act.toggle == toggle;
    if (key !== null) act.key = key;
    act.statusMessage = statusMessage;
    
    } catch(e) {
    devOps.log('devOps.setAction error: '+ e.message);
    }; //  catch
     }; // setAction

     static clearLog()  {
      try {
        const hl = devOps.#controls.hl;
      if (hl !== null )   {
        hl.innerHTML ="Log Cleared.." ;
      };  // if hl
    }   catch(e) {
        console.log("devOps.clearLog error: " + e.message);
          }; // catch
     }; // clearLog
     static 
     shareLog()  {
      try {
       const hl = devOps.#controls.hl ;
      if (hl !== null) {
        const act = devOps.actions.share;
        if (act.statusMessage === null) act.statusMessage = devOps.log;  
        
        const txt = hl.innerHTML.split("<br>");
        navigator.clipboard.writeText(txt.join("\n"));
        const sm = act.statusMessage;
        sm("Log shared to clipboard.");
        sm("Log shared to clipboard.");
      
      }
      } catch(e) {
      devOps.log("devOps.share error: " + e.message);
      }; // catch
       };  // share
       
    

}; //  class devOps

const devOpsDefaultStyleCss =`
.devOpsNotVisible {  // Default styling used to create style object
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
`;


export default devOps;