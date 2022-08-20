import {helpLog as hl} from "./utils.js";


"use strict";

/***************
 *    Used by colorCssVars   .  Provides details for the list.
 *   by Lewis Wood
 * *********/

export class colorDetails {
    names;
    curVar;
hs;
varsList = 0;
constructor() {
try {
    this.hs = hl;
this.varsList = "xyz";


} catch(e) {
hl("colorDetails constructor error: " + e.message);
} // catch
}; // constructor
// Load up the combo boxes
LoadColorVars() {
hl("Loading Color Details");
};  // loadColorVars
connected(root) {
hl("Connected Details.");
this.LoadColorVars();
this.LoadColorVars();
} // connected



}; // class colorDetails

