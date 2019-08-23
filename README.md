# Scripts and snapshot links of tomochain to find all the injected accounts's balance
## Link
  - Canonical snapshot: 
  - Fork snapshot:
  - [Extracted accounts from canonical snapshot:](https://sgp1.digitaloceanspaces.com/chaindata/accounts-canonical-9073620.txt)
  - Extracted accounts from fork snapshot:

## Script
Tomochain is forked from Ethereum so we use levelDB to storing data. The given script querys all accounts from chaindata at block 9073620

First you need to download the Canonical Snapshot and Fork Snapshot data from links above then create env.json from env.json-template, run two commands to extracts data - normally it costs you some hours to download, extract and run.
```sh
$ npm run query-accounts-canonical
$ npm run query-accounts-fork
```
The use mongoimport to import the accounts
```sh
$ npm run import-canonical-data
$ npm run import-fork-data
```
Finally generate the report
```sh
$ npm run diff
```

We attached the result in case you don't want to run those command.
Enjoy