let database = require("./src/database")
const config = require("./config.json");
const app = require('express')();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const client = require('socket.io-client');

let BlockChain = require("./Blockchain/BlockChain");
const socketListeners = require('./src/socketListeners');

let MergenChain = new BlockChain(io);
app.use(bodyParser.json());

database.onConnect(() => {

    io.on('connection', (socket) => {
        console.info(`Socket connected, ID: ${socket.id}`);
        socket.on('disconnect', () => {
          console.log(`Socket disconnected, ID: ${socket.id}`);
        });
    });

    app.post('/transaction', (req, res) => {
        let data = JSON.parse(req.body["data"]);
        io.emit("transaction", data);
        res.json({"durum":"başarılı"}).end();
    });

    socketListeners(client("http://localhost:"+config.host.PORT), MergenChain);
    
    httpServer.listen(config.host.PORT, () => console.info(`Express server running on ${config.host.PORT}...`));

    if(config.mining){//Ayarlarda madencilik yapmak istendiğinde çalışacak.
        console.log("Madencilik aktif");
        MergenChain.mining();
    }

});