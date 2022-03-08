let difficulty = 3;

let validator = require("../src/validator");

let mongoDB = require("mongoose");

let MergenChainModel = mongoDB.model("MergenChain");

class BlockChain{

    constructor(){

        this.chain = [] //
        this.currTransaction = []
    }

    //Son bloğu çağırıyoruz
    getLastBlock(callback){
        return MergenChainModel.findOne({}, null, {sort:{ _id: -1}, limit:1}, (err,  block) => {
            if(err) return console.log("Son blok bulunamadı.");
            return callback(block);
        });
    }

    //Yeni blok oluşturuyoruz
    newBlock(prevHash){
        let block = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.currTransaction, //İşlemleri bloğa ekliyoruz
            prevHash: prevHash,
            hash: "",
            nonce: null
        }

        let nonce = validator.PoW(block,difficulty);
        block.nonce = nonce;
        block.hash = validator.getHash(block,nonce);

        this.getLastBlock((lastBlock) => {

            if(lastBlock){
                block.prevHash = lastBlock.hash;
            }

            let newBlock = new MergenChainModel(block);

            newBlock.save((err) => {
                if(err) return console.log("Blok kayıt edilemedi. ", err.message);
                console.log("Blok başarıyla kayıt edildi.");
            });
            
            this.chain.push(block); //Zincire ekledik
            this.currTransaction = [] //İşlemler bloğa eklendiği için temizliyoruz
    
            return block
        });

       
    }

    //Yeni işlem oluşturuyoruz
    newTransaction(sender, recipient, amount){
        this.currTransaction.push({sender,recipient,amount});
    }

    lastBlock(){
        return this.chain.slice(-1)[0];
    }

    /*isEmpty(){
        return this.chain.length == 0; 
    }*/

}

module.exports = BlockChain;