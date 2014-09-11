# organic-dna-resolveclones

Resolves DNA `!@branch.property` values by cloning the referenced branches

## example

    var dna = {
      "branch": {
        "property": "value"
      },
      "otherBranch": {
        "propertyValueReference": "!@branch.property",
        "wholeBranch": "!@branch"
      }
    }

    var resolveClones = require("organic-dna-resolveclones")
    resolveClones(dna)

    dna.branch.property = "new value"

    console.log(dna.otherBranch.propertyValueReference) // == "value"
    console.log(dna.otherBranch.wholeBranch.property) // == "value"
    console.log(dna.branch.property) // == "new value"