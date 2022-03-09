let hash = require("object-hash");

module.exports.validProof = (nonce,block,difficulty,diffString) => {
    let guessHash = module.exports.getHash(block,nonce);

    //console.log("Hash: ", guessHash);
    
    return guessHash.substring(0, difficulty) == diffString
}

module.exports.getHash = (block,nonce) => {
    hash_str = JSON.stringify(block.transactions) + block.index + block.previousHash + nonce;
    return hash(hash_str);
}

//Aslında ilk nonce değerini bulan ağa duyurur. Ama ödüller rehin edilen kripto oranında paylaştırılır.
module.exports.PoW = (block,difficulty) => {
    let nonce = Math.floor(Math.random() * (100**difficulty));

    diffString = "";

    for (let step = 0; step < difficulty; step++) diffString += "0";

    if(!module.exports.validProof(nonce,block,difficulty,diffString)){
        return false;
    }else{
        return nonce;
    }

    //console.log(nonce)
    
}