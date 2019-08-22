const Trie = require('merkle-patricia-tree/secure');
const rlp = require('rlp');
const level = require('level');
const Account = require("ethereumjs-account").default;
const ethutil = require('ethereumjs-util');
const BN = ethutil.BN;
const ENV = require("env.json");
const db = level(ENV.CANONICAL_CHAINDATA_PATH);

// var root = '0xc96e205f8e0d7dccea94c04fde6e6f7e508a3bbb91d2630335b37fbe23ec3a87';  // which block is this ?? 9073702
var root = "0x41429ade101c9ed6d4fb1105a4ae9b83645ddffda69cbad282c8947e1ee1fcf6"; // 9073699                 
var trie = new Trie(db, root);

//Creating a nodejs stream object so that we can access the data
var stream = trie.createReadStream()

//Turning on the stream (because the node js stream is set to pause by default)
stream
    .on('data', function (data) {
        var acc = new Account(data.value)
        var balance = parseFloat(new BN(acc.balance).toString());

        // if (balance > 10) {
        var accInJson = {
            keyHash: ethutil.bufferToHex(data.key),
            nonce: new BN(acc.nonce).toString(),
            balance: balance,
            storageRoot: ethutil.bufferToHex(acc.stateRoot),
            codeHash: ethutil.bufferToHex(acc.codeHash)
        };

        if (balance > 0) {
            console.log(JSON.stringify(accInJson));
        }	
        
    })
    .on('end', function () {
        process.exit(-1);
    });
