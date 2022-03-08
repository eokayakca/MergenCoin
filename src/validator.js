let hash = require("object-hash");

module.exports.validProof = (nonce,block,difficulty,diffString) => {
    let guessHash = module.exports.getHash(block,nonce);

    console.log("Hash: ", guessHash);
    
    return guessHash.substring(0, difficulty) == diffString
}

module.exports.getHash = (block,nonce) => {
    hash_str = JSON.stringify(block.transactions) + block.index + block.previousHash + nonce;
    return hash(hash_str);
}

//Burası PoS şeklinde değişecek. Konsensus algoritmaları incelenecek.
//Aslında ilk nonce değerini bulan ağa duyurabilir.
module.exports.PoW = (block,difficulty) => {
    let nonce = 0;

    diffString = "";

    for (let step = 0; step < difficulty; step++) {
        diffString += "0";
    }

    while(true){
        if(!module.exports.validProof(nonce,block,difficulty,diffString)){
            nonce++;
        }else{
            break;
        }
    }

    return nonce;
}