import {helpLog as hl, getJSON} from "./utils.js";

"use strict";

////
//      Finance sample object
///////////////////

export class myFinance {
    container;
    heading;
    cbSymbols;
symbolUrl = "https://financialmodelingprep.com/api/v3/quotes/crypto?apikey=57dc7fc1f9e94fbc0b9371aeb3ea987f";
symbols = [];
hasLoaded = false; // Symbols haver loaded and combobox created.
    constructor( urlSymbolOverRide = "default") {
try  {
    if (urlSymbolOverRide !== "default") {
        hl("myFinance Symbol OverRide entered.");
        this.symbolUrl = urlSymbolOverRide;
    };
const parser = (data) => { this.parseJson(data);}
getJSON(  this.symbolUrl,  parser);

} catch(e) {;

hl("myFinance.constructor error:" + e.message);
     }; // catch
    }; // constructor


    async parseJson(data) {
        try {
            hl("Parsing Finance Symbols ... Found: "+ data.length);
            const s = this.symbols;
            data.forEach( (e) => {
s.push(e.symbol);
            }); // forEach
            hl(`Added ${s.length} symbols`);
            this.hasLoaded = true;

        } catch(e) {
hl("myFinance.parseJson error: " + e.message);
        }; // catch
    }; // parseJson

// Returns the combox objects
getObjects() {
try {
const div = document.createElement("div");
div.setAttribute("id", "financeContainer");
div.setAttribute("class", "financeContainer");
const h = document.createElement("h2");
h.setAttribute("id", "financeHeader");
h.setAttribute("tabindex", "1");
h.textContent = "Select a symbol?";
div.appendChild(h);

const c = document.createElement("select"); // comboBox
c.setAttribute("id", "financeSymbols");
c.setAttribute("aria-labeledby", "financeHeader")
div.appendChild(c);
return div;
} catch(e) {
hl("myFinance.getObjects errror: " + e.message);
}; // catch 
}; // getObjects

// Connected 
async connected(root, tries = 1) {
    try {
        hl( "connected called will try to load vars if ready..:" + tries);
        const c = root.querySelector("#financeContainer");


if (( c === null) || (this.hasLoaded === false))  {
// Lets check our tries annot do this forever..
if (tries < 8) {
setTimeout( () =>  {
    this.connected(root, ++tries)
}, 200);
} else {
    hl( "myFinance.connected error: TimedOutTries " + tries);

};  // Timed out

} else {
// Ready Not Load everything
this.container = c;
this.loadObjects();
}; //  Note read try again 

    } catch(e) {
hl("myFinance.connected error: " + e.message);
    }; // catch
}

// Load up the Objects Heading, cbSymbols;
loadObjects() {
try {
    hl("Loading the objects");
    const c = this.container;
this.heading =  c.querySelector("#financeHeader");
this.cbSymbols =  c.querySelector("#financeSymbols");
this.loadFinanceSymbols();
} catch(e) {
hl("myFinance.loadObjects error: " + e.message);
};// catch
}; // loadObjects

// Loads the array symbols into the combobox
loadFinanceSymbols() {
try {
    hl("Loading the symbals ");
const cb = this.cbSymbols;

const options =  Array.from( cb.options);
// clear any optinons in the list
options.forEach( (o) => {o.remove();o.selected = false; });
const s = this.symbols;
s.forEach( (value) => {
    const o = document.createElement("option");
o.textContent = value;
    cb.appendChild(o);
});

} catch(e) {
hl("myFinance.loadsymbols error: " + e.message);
}; // catch
}; // loadFinanceSymbols


}; // myFinance class