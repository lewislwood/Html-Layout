import devOps   from "./devops.js";

"use strict";


class colorVarsMgr{
variables = []; // color variables array
constructor( colorVars = null) {
try {
if (colorVars !== null) this.variables = colorVars;
} catch(e) {
devOps.logError('colorVarsMgr.constructor error: '+ e.message);
}; //  catch
     }; // constructor
    
getColorValue(  colorName, suffix = null ) {
    try {
    if (suffix === null) {
const [c, s] = this.parseColorVar( colorName);
if (s === null) { throw new Error("Invalid Color value " + c);}
else { return this.getColorValue( c, s);};
    }; // If no suffix
    const cvs = this.variables;
    const reg = new RegExp(colorName, "i");

const cv = cvs.find( v => reg.test(v.name));
if ( cv === undefined) { throw new Error("Color " + colorName + " not found.");};
const parent = ((suffix === "fg") ? cv.parent_fg : cv.parent_bg);
if (parent !== "") {return this.getColorValue(parent);}
const value = ((suffix === "fg") ? cv.fg : cv.bg);
return value;

    } catch(e) {
    devOps.logError('colorVarsMgr.getColorValue error: '+ e.message);
    }; //  catch
    }; // getColorValue

    setColorValue(  colorName, suffix = null , value = null) {
        try {
            if (suffix === null) {
                const [c, s] = this.parseColorVar( colorName);
                if (s === null) { throw new Error("Invalid Color Name" + c);}
                else { return this.setColorValue( c, s, value);};
                    }; // If no suffix
                    if ( value === null) { throw new Error("No color value specified.");};
                    if (value.startsWith("#") !== true) {                    return this.setColorParent( colorName, suffix, value);                 }; // Value may be a parent value
                    const cvs = this.variables;
                    const reg = new RegExp(colorName, "i");
    
    const cv = cvs.find( v => reg.test(v.name));
    if ( cv === undefined) { throw new Error("Color " + colorName + " not found.");};
    if (suffix === "fg") {cv.fg = value; cv.parent_fg = "";}
    else {cv.bg = value; cv.parent_bg = ""; };
    return value;
    
    
        } catch(e) {
        devOps.logError('colorVarsMgr.setColorValue error: '+ e.message);
        }; //  catch
        }; // setColorValue 

        setColorParent(  colorName, suffix = null, value = "") {
            try {
                if (suffix === null) {
                    const [c, s] = this.parseColorVar( colorName);
                    if (s === null) { throw new Error("Invalid Color Name" + c);}
                    else { return this.setColorParent( c, s, value);};
                        }; // If no suffix
        const newValue =                ((value === null)? "" : value );
        const cvs = this.variables;
                        const reg = new RegExp(colorName, "i");
        const cv = cvs.find( v => reg.test(v.name));
        if ( cv === undefined) { throw new Error("Color " + colorName + " not found.");};
        if (suffix === "fg") cv.parent_fg = newValue
         else cv.parent_bg = newValue
        return newValue;
            } catch(e) {
            devOps.logError('colorVarsMgr.setColorParent error: '+ e.message);
            }; //  catch
            }; // setColorParent 
        
    




    // parseColorVar returns [ name, suffix]
parseColorVar( colorVar) {
        try {
        const parsed = colorVar.replace("--", "").trim().toLowerCase().split("_");
        // devOps.logError("colorVarsMgr.Parsed: " + JSON.stringify(parsed));
        if (parsed.length === 2)  return [parsed[0], parsed[1]]
        else return [parsed[0], null];
        
        }   catch(e) {
          devOps.logError("colorVarsMgr.parseColorVar error: " + e.message);
        }; // catch
            }    ; // parseColorVar

 cssVarsList(    ) {
try {
const rv = [];
const vl = this.variables;
const cv = (n, s) => { return this.getColorValue(n,s);};
vl.forEach( (v) => {
 rv.push([`--${v.name}_fg` ,cv(v.name, "fg")]);
 rv.push([`--${v.name}_bg` ,cv(v.name, "bg")]);
}); // forEach
return rv;

} catch(e) {
devOps.logError('colorVarsMgr.cssVarsList error: '+ e.message);
}; //  catch
}; // cssVarsList 


// Generates css vars list with inheritance
 rootCSssList(    ) {
try {
    const rv = [];
    const vl = this.variables;
    const fg = (cv) => { return (cv.parent_fg === "")? cv.fg : `var( --${cv.parent_fg});`  };
    const bg = (cv) => { return (cv.parent_bg === "")? cv.bg : `var( --${cv.parent_bg});`  };
    vl.forEach( (v) => {
     rv.push([`--${v.name}_fg` ,fg(v)]);
     rv.push([`--${v.name}_bg` ,bg(v)]);
    }); // forEach
    return rv;
    
} catch(e) {
devOps.logError('ColorVarsMgr.rootCSssList error: '+ e.message);
}; //  catch
}; // rootCSssList 

}; // class colorVarsMgr

export default colorVarsMgr;