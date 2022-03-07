let BlockChain = require("./Blockchain/BlockChain")

let MergenChain = new BlockChain();

let hash = require("object-hash");

let PROOF = 1560;

let validProof = (proof) => {
    let guessHash = hash(proof);

    console.log("Hash: ", guessHash);

    return guessHash == hash(PROOF)
}

//Burası PoS şeklinde değişecek. Diğer projeleri biraz incelemek lazım.
let proofOfWork = () => {
    let proof = 0;

    while(true){
        if(!validProof(proof)){
            proof++;
        }else{
            break;
        }
    }

    return proof
}

if(proofOfWork() == PROOF){
    MergenChain.newTransaction("Ertunç","Okay",20);
    let prevHash = MergenChain.lastBlock() ? MergenChain.lastBlock().hash : null;
    MergenChain.newBlock(prevHash)
}

console.log("Chain: ",MergenChain.chain)