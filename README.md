# Scripts and snapshot links of tomochain to find all the injected accounts's balance
## Link
  - [Canonical snapshot](https://sgp1.digitaloceanspaces.com/chaindata/20190808-injected-accounts-canonical.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=5B6TL7TYFGTDO6YHZ7VZ%2F20190824%2Fsgp1%2Fs3%2Faws4_request&X-Amz-Date=20190824T024545Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=fc646088b8b05b1cb5f23f53a3cc9fdf54c508c1928198211a6ba515e5657d22)
  - [Fork snapshot](https://sgp1.digitaloceanspaces.com/chaindata/origin_chaindata.tar?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=5B6TL7TYFGTDO6YHZ7VZ%2F20190824%2Fsgp1%2Fs3%2Faws4_request&X-Amz-Date=20190824T034124Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=682b2d205cf3fe7348d3a0e8c5c2ee6fa6e841bb4628d3a57938e90ce28a5ef7)
  - [Extracted accounts from canonical snapshot](https://sgp1.digitaloceanspaces.com/chaindata/accounts-canonical-9073620.txt)
  - [Extracted accounts from fork snapshot](https://sgp1.digitaloceanspaces.com/chaindata/accounts-forkpath-9073620.txt)

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