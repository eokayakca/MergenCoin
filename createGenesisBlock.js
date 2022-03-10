let hash = require("object-hash");

let block = {
    index: 0,
    timestamp: Date.now(),
    transactions: [{"type":"genesisBlock","data":"𐰤𐰀:𐰢𐰆𐱃𐰞𐰆:𐱅𐰇𐰼𐰜𐰢:𐰓𐰃𐰘𐰤𐰀"}], //İşlemleri bloğa ekliyoruz
    prevHash: "",
    hash: "",
    nonce: null
}

hash_str = JSON.stringify(block.transactions) + block.index + block.previousHash + 1923;

block.hash = hash(hash_str);
block.nonce = 552;

console.log(JSON.stringify([block]));