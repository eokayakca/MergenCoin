let hash = require("object-hash")

class BlockChain{

    constructor(){

        this.chain = [] //
        this.currTransaction = []
    }

    //Yeni blok oluşturuyoruz
    newBlock(prevHash){
        let block = {
             index: this.chain.length + 1,
             timestamp: Date.now(),
             transactions: this.currTransaction, //İşlemleri bloğa ekliyoruz
             prevHash: prevHash
        }

        this.hash = hash(block)

        this.chain.push(block); //Zincire ekledik
        this.currTransaction = [] //İşlemler bloğa eklendiği için temizliyoruz

        return block
    }

    //Yeni işlem oluşturuyoruz
    newTransaction(sender, recipient, amount){
        this.currTransaction.push({sender,recipient,amount});
    }

    lastBlock(){
        return this.chain.slice(-1)[0];
    }

    isEmpty(){
        return this.chain.length == 0; 
    }

}

module.exports = BlockChain;