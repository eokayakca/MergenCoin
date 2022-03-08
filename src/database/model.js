let mongoDB = require("mongoose");
let Schema = mongoDB.Schema;

let MergenSchema = new Schema({
    index: {
        required: true,
        type: Schema.Types.Number
    },
    timestamp: {
        required: true,
        type: Schema.Types.Date 
    },
    transactions: {
        required: true,
        type: Schema.Types.Array
    },
    prevHash: {
        required: false, //Genesis Blok
        type: Schema.Types.String
    },
    hash: {
        required: true,
        type: Schema.Types.String
    }
});

module.exports = mongoDB.model("MergenChain", MergenSchema)
