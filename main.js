let database = require("./src/database")
database.onConnect(() => {

    let BlockChain = require("./Blockchain/BlockChain")

    let MergenChain = new BlockChain();
    
    /*if(proofOfWork() == PROOF){
        MergenChain.newTransaction("Ertunç","Okay",20);
        let prevHash = MergenChain.lastBlock() ? MergenChain.lastBlock().hash : null;
        MergenChain.newBlock(prevHash)
    }*/

    MergenChain.newTransaction("Ertunç","Okay",20);
    MergenChain.newBlock(null)

    console.log("Chain: ",MergenChain.chain)

});