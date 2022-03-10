const crypto = require("crypto");

const buffer = require('buffer');
const fs = require('fs');
const axios = require('axios');

const privateKey = fs.readFileSync("./private.pem", { encoding: "utf8" });
const publicKey = fs.readFileSync("./public.pem", { encoding: "utf8" });

const algorithm = "SHA256";

let data_res = {
    "type":"transfer",
    "from":"eokayakca",
    "to":"almilaai",
    "amount":20
}
data = Buffer.from(JSON.stringify(data_res));

let signature = crypto.sign(algorithm, data , privateKey);

const isVerified = crypto.verify(algorithm, data, publicKey, signature);

if(isVerified){
    console.log("Data: ", JSON.parse(data.toString()));
    signature = signature.toString("base64");
    data = {"signature":signature,"data":data_res,"publicKey":publicKey}

    axios.post('http://localhost:1923/transaction', {"data":JSON.stringify(data)})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("hata");
      });
}