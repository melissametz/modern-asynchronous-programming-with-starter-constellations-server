const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

async function update(constellation) { 
  try{
    const url = `${BASE_URL}/constellations/${constellation.id}`;
    const promise = await axios.put(url, constellation);
       return promise;
     }catch (error){
       console.log(`Updating constellation (id: ${constellation.id}) failed.`);
     }
}

async function bulkImport(constellations) {
 try {
    if (!Array.isArray(constellations)) {
      throw "Inputted argument must be an array.";
    }
    if (constellations.every((constellation) => isValid(constellation))) {
      return Promise.allSettled(
        constellations.map((constellation) => update(constellation))
      );
}
  } catch (error) {
    console.log("All constellations must include relevant fields.");
  }
}

module.exports = { bulkImport, update };
   