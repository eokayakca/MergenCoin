 let mongo = require("mongoose")

 let MergenChainModel = require("./model");

 mongo.connect("mongodb://127.0.0.1:27017/mergenChain", (err) => {
     if(err) return console.log("Veritabanına bağlanılamadı.");
     console.log("Veritabanına başarıyla bağlanıldı.");

     connectionCallBack();
 })


 let connectionCallBack = () => {
      
 }

module.exports.onConnect = (callback) => {
    connectionCallBack = callback;

}