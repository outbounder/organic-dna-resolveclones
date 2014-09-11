var selectBranch = require("organic-dna-branches").selectBranch
var clone = require('clone')

var findDnaValueAndClone = function(dna, query) {
  if(query.indexOf("!@") === 0)
    query = query.substr(2)
  try {
    return clone(selectBranch(dna, query))
  } catch(e){
    console.log(dna, query)
    throw e
  }
}
var walk = function(dna, rootDNA){
  for(var key in dna) {
    // resolves key: "!@namespace.branch"
    if(typeof dna[key] == "string" && dna[key].indexOf("!@") === 0) {
      dna[key] = findDnaValueAndClone(rootDNA, dna[key])
    } else
    // resolves key: [ ... ]
    if(typeof dna[key] == "object" && Array.isArray(dna[key])) {
      for(var i = 0; i<dna[key].length; i++) {
        if(dna[key][i]["!@"]) {
          // resolves "!@": "namespace.branch"
          dna[key][i] = findDnaValueAndClone(rootDNA, dna[key][i]["!@"])
        } else
        if(typeof dna[key][i] == "string" && dna[key][i].indexOf("!@") === 0) {
          // resolves "!@namespace.branch"
          dna[key][i] = findDnaValueAndClone(rootDNA, dna[key][i])
        } else
        if(typeof dna[key][i] == "object")
          // resolves { ... }
          walk(dna[key][i], rootDNA)
      }
    } else
    // resolves key: { ... }
    if(typeof dna[key] == "object")
      walk(dna[key], rootDNA)
  }
}
module.exports = function(rootDNA){
  walk(rootDNA, rootDNA)
}