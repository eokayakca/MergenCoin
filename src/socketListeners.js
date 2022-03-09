let mongoDB = require("mongoose");

const socketListeners = (socket,mergenChain) => {

    socket.on("endMinning", (newChain) => {
      console.log('endMinning');
      console.log(newChain);
    });
  
    return socket;
};
  
module.exports = socketListeners;