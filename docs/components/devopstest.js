import devOps from  "./devops.js";



"use script";



const myTest= (e) => {
   const obj = {
lewis: [ 1, "programmer"],
paris: [2, "tech"],
peggy: [74, "mother"]
   }; // obj

   try {
   devOps.log("Lewis is testing devOps");
   devOps.log("lewis " + obj.lewis.join(" "));
   obj["richard"] = [81, "deceased"];
   obj["lewis"] = [12, "javascript"];
devOps.log("richard : " + obj.richard.join(" "));
devOps.log("lewis " + obj.lewis.join(" "));
devOps.log("Length: " + obj.length);
   } catch(e) {
      devOps.logError("Testing error: " + e.message);
   }; // catch


}; 



export default   myTest;