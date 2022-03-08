let hash = require("object-hash");

const TARGET_HASH = 1923;

module.exports.validProof= (proof) => {
    let guessHash = hash(proof);

    console.log("Hash: ", guessHash);
    
    return guessHash == hash(TARGET_HASH)
}

//Burası PoS şeklinde değişecek. Konsensus algoritmaları incelenecek.
module.exports.PoW = ( ) => {
    let proof = 0;

    while(true){
        if(!module.exports.validProof(proof)){
            proof++;
        }else{
            break;
        }
    }

    return hash(proof);
}