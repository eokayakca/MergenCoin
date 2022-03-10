let validator = require("../src/validator");
const config = require("../config.json");

let difficulty = 6;

let mongoDB = require("mongoose");

let MergenChainModel = mongoDB.model("mergens");

class BlockChain{

    constructor(server){
        //this.chain = [] //Sanırım artık bu değişkeni kullanmıyorum. Eğer bir hata yoksa sileceğim
        this.currTransaction = []
        this.pendingTransaction = [] //işlemler önce sıraya alınacak. Aslında sıraya almaya gerek yok
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
            setTimeout(() => {
                this.mining();
            }, 1);
        }else{
            block.nonce = nonce;
            block.hash = validator.getHash(block,nonce);

            this.server.emit("endMinning", block);
        }
        
    }

    //Yeni blok ağda ilan edildiğinde zincire ekliyoruz.
    //Buraya bir kontrol sistemi eklemek lazım.
    addBlock(block){

        this.getLastBlock((lastBlock) => {

            if(lastBlock){
                block.prevHash = lastBlock.hash;
                block.index = lastBlock.index + 1;
            }

            let newBlock = new MergenChainModel(block);

            newBlock.save((err) => {
                if(err) return console.log("Blok kayıt edilemedi. ", err.message);
                //console.log("Blok başarıyla kayıt edildi.");
                console.log("Blok: ",block);

                this.currTransaction = this.pendingTransaction; //İşlemler bloğa eklendiği için sıradaki işlemleri alıyoruz.
                this.pendingTransaction = [];

                if(config.mining){//Ayarlarda madencilik yapmak istendiğinde çalışacak.
                    console.log("Madencilik yeniden başlatıldı.");
                    this.mining();
                }
            }); //Zincire ekledik            
        });
    }

    //Yeni işlem ekliyoruz
    addTransaction(data){
        console.log(data);
        this.pendingTransaction.push(data);
    }

}

module.exports = BlockChain;