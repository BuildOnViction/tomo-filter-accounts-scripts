const Trie = require('merkle-patricia-tree/secure');
const rlp = require('rlp');
const level = require('level');
const Account = require("ethereumjs-account").default;
const ethutil = require('ethereumjs-util');
const BN = ethutil.BN;
const ENV = require("./env.json");
const db = level(ENV.FORK_CHAINDATA_PATH);

var root = "0xb789eea477a3e1900146fd3f891eebe5150acb8a301a54ec871e019e9161217a"; // 9073620                 
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
