let difficulty = 4;

let validator = require("../src/validator");

let mongoDB = require("mongoose");

let MergenChainModel = mongoDB.model("MergenChain");

class BlockChain{

    constructor(server){
        this.chain = [] //
        this.currTransaction = []
        this.pendingTransaction = [] //işlemler önce sıraya alınacak.
        this.server = server
    }

    //Son bloğu çağırıyoruz
    getLastBlock(callback){
        return MergenChainModel.findOne({}, null, {sort:{ _id: -1}, limit:1}, (err,  block) => {
            if(err) return console.log("Son blok bulunamadı.");
            return callback(block);
        });
    }

    mining(){
        let block = {
            index: 1,
            timestamp: Date.now(),
            transactions: this.currTransaction, //İşlemleri bloğa ekliyoruz
            prevHash: "",
            hash: "",
            nonce: null
        }

        let nonce = validator.PoW(block,difficulty);

        if(nonce == false){
            setInterval(() => {
                this.mining();
            }, 1);
        }else{

            block.nonce = nonce;
            block.hash = validator.getHash(block,nonce);

            //this.server.emit("endMinning", block);

            this.getLastBlock((lastBlock) => {

                if(lastBlock){
                    block.prevHash = lastBlock.hash;
                    block.index = lastBlock.index + 1;
                }

                let newBlock = new MergenChainModel(block);

                this.server.emit("endMinning", newBlock);

                newBlock.save((err) => {
                    if(err) return console.log("Blok kayıt edilemedi. ", err.message);
                    //console.log("Blok başarıyla kayıt edildi.");
                    console.log("Blok: ",block);

                    this.currTransaction = this.pendingTransaction.splice(0, 10000); //İşlemler bloğa eklendiği için sıradaki işlemleri alıyoruz.

                    this.mining();
                }); //Zincire ekledik
                
            });
        }

        
    }

    //Yeni blok oluşturuyoruz
    newBlock(){
        let block = {
            index: 1,
            timestamp: Date.now(),
            transactions: this.currTransaction, //İşlemleri bloğa ekliyoruz
            prevHash: "",
            hash: "",
            nonce: null
        }

        let nonce = validator.PoW(block,difficulty);
        console.log(nonce)
        block.nonce = nonce;
        block.hash = validator.getHash(block,nonce);

        this.getLastBlock((lastBlock) => {

            if(lastBlock){
                block.prevHash = lastBlock.hash;
                block.index = lastBlock.index + 1;
            }

            let newBlock = new MergenChainModel(block);

            newBlock.save((err) => {
                if(err) return console.log("Blok kayıt edilemedi. ", err.message);
                console.log("Blok başarıyla kayıt edildi.");
                console.log("Blok: ",block);
            }); //Zincire ekledik
            console.log(this.pendingTransaction);
            this.currTransaction = this.pendingTransaction.splice(0, 10000); //İşlemler bloğa eklendiği için sıradaki işlemleri alıyoruz.
            return block
        });

       
    }

    //Yeni işlem ekliyoruz
    newTransaction(sender, recipient, amount){
        this.pendingTransaction.push({sender,recipient,amount});
    }

}

module.exports = BlockChain;