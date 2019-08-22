/*
    We just compare accounts have more than 1000 tomo
*/

'use strict';
var _ = require('lodash');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ENV = require("./env.json"),
    Excel = require('exceljs');

mongoose.connect(ENV.MONGODB_URI, { useNewUrlParser: true });

var accountCanonical = new Schema({
    keyHash: String,
    nonce: Number,
    balance: Number,
    storageRoot: String,
    codeHash: String
}, {
        timestamps: false
    });

var accountForkPath = new Schema({
    keyHash: String,
    nonce: Number,
    balance: Number,
    storageRoot: String,
    codeHash: String
}, {
        timestamps: false
    });


var canonical = mongoose.model('canonical-accounts', accountCanonical);
var forkpath = mongoose.model('fork-accounts', accountForkPath);

var injectedAccounts = [];
var ether = 1000000000000000000;

async function findAccountsThatHasBalanceMoreThan1000(collection) {
    return await collection.aggregate([
        {
            $match: {
                balance: { $gte: ether * 1000 }
            }
        },
        {
            $project: {
                _id: "$keyHash",
                tomo: {
                    $divide: ["$balance", ether]
                }
            }
        }, {
            $sort: { tomo: -1 }
        }
    ]);
}

async function findDiff() {
    let wrongAccounts = await findAccountsThatHasBalanceMoreThan1000(canonical);
    let realAccounts = await findAccountsThatHasBalanceMoreThan1000(forkpath);

    let listDiff = _.differenceWith(wrongAccounts, realAccounts, _.isEqual);

    for (let index = 0; index < listDiff.length; index++) {
        const account = listDiff[index];
        let realAccount = await forkpath.findOne({
            keyHash: account._id
        });
        realAccount.tomo = realAccount.balance / ether;

        if (!realAccount || account.tomo - realAccount.tomo > 1000) {
            injectedAccounts.push({
                ...account,
                realBalance: realAccount ? realAccount.tomo : -1
            });
        }

    }

    return injectedAccounts;
}

async function writeToExcel(accounts) {
    const options = {
        filename: ENV.REPORT_OUTPUT_NAME,
        useStyles: true,
        useSharedStrings: trueaccounts
    };

    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);

    const worksheet = workbook.addWorksheet('Report');

    worksheet.columns = [
        { header: '#', key: 'index' },
        { header: 'SHA3(ACCOUNT)', key: 'keyHash' },
        { header: 'Hacked Balance', key: 'tomo' },
        { header: 'Origin Balance', key: 'realBalance' }
    ]

    for (let index = 1; index <= accounts.length; index++) {
        let data = {
            id: index,
            ...accounts[index]
        };accounts

        worksheet.addRow(data).commit();
    }

    workbook.commit().then(function () {
        console.log('excel file created');
    });
}

const injectedAccounts = await findDiff();
writeToExcel(injectedAccounts);