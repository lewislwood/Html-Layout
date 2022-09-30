import devOps from  "./devops.js";



"use script";



const myTest= (e) => {
   try {
      const td = new Date() 
      const nColors = ["x", "y", "z"];
const th = {  "name":"_default", 
"creator": "Lewis Wood",
"created": td.toDateString(),
"modifiedby": "Lewis Wood",
"modified": td.toDateString(),
"colors":nColors 
   }

   devOps.log("Lewis is testing devOps");
devOps.log( JSON.stringify(th));
devOps.log(th["sam"]);
   


   } catch(e) {
      devOps.logError("Testing error: " + e.message);
   }; // catch


}; 



export default   myTest;