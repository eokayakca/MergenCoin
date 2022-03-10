let hash = require("object-hash");

let block = {
    index: 0,
    timestamp: Date.now(),
    transactions: [{"type":"genesisBlock","data":"𐰀𐰤𐰀𐰘𐰃𐰓:𐰢𐰜𐰼𐰇𐱅:𐰆𐰞𐱃𐰆𐰢:𐰀𐰤"}], //İşlemleri bloğa ekliyoruz
    prevHash: "",
    hash: "",
    nonce: null
}

hash_str = JSON.stringify(block.transactions) + block.index + block.previousHash + 1923;

console.log(hash(hash_str));

block.hash = hash(hash_str);
block.nonce = 552;

console.log(JSON.stringify(block));