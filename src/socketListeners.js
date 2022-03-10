const crypto = require("crypto");

const buffer = require('buffer');

const socketListeners = (socket,mergenChain) => {

    socket.on("endMinning", (newChain) => {
      mergenChain.addBlock(newChain);
    });

    socket.on("transaction", (data) => {
        if(data["signature"] && data["data"] && data["publicKey"]){

            let signature = Buffer.from(data["signature"], 'base64')
            
            let isVerified = crypto.verify(
                "SHA256", 
                Buffer.from(JSON.stringify(data["data"])), 
                data["publicKey"], 
                signature
            );

            if(isVerified){
                console.log("İmza doğrulandı");
                mergenChain.addTransaction(data["data"]);
            }
        }
    });
  
    return socket;
};
  
module.exports = socketListeners;