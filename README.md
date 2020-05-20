  
The pruned data that was released on April 24, 2019 (20190424.tar 73GB) contained some invalid states which was subsequently adopted by some Masternodes in the community. 

When the first transaction involved these states were made at block 9073579 on Aug 13, 2019, 11:01 AM +UTC.

The nodes that used the pruned chain data accepted the transaction. 

The nodes that used the original chain data rejected the transaction with error - “Error: insufficient balance for transfer” (https://github.com/tomochain/tomochain/issues/619). 

As a result, the incident forked the blockchain, with 82 nodes accepting the transaction and 68 nodes rejecting it. 

Shortly after that the core team released a new snapshot (20190813.tar 91GB) to fix the fork without knowing the invalid state issue. 

The new snapshot was created from a node that used the pruned chain data with invalid states. 

So, from block 9073579, the entire network was using data from the pruned chain data.

Afterward upon realizing the issue, the core team released an update, v1.5.1, to blacklist all addresses with invalid states using the original chain data.

How? We scanned and compared between the current chain data and the original chain data at the same block number 9073620. 

The resulting hashes of the wallet addresses showed a difference in balance between the two sets of chain data. 

We wrote the following scripts (https://github.com/tomochain/tomo-filter-accounts-scripts) to compare the chain data and verify our findings.

After the update to TomoChain v1.5.1, the core team can confirm that there are no other invalid states between the current updated chain data and the original chain data. 

No further transactions from blacklisted addresses are possible. 

*Lesson learned:*

Nodes should back-up his own chain data at a frequent interval, and use that snapshot when the node is stuck. 

Again backup chain data frequently, or run a backup node in slave-mode. 

If a node copies a data snapshot from somewhere else, the data could be compromised. Be vigilant.

Tools and intructions to verify chain data comparision available in this Repo.

## Links
  - [Canonical snapshot (injected accounts)](https://sgp1.digitaloceanspaces.com/chaindata/20190808-injected-accounts-canonical.zip)
  - [Fork snapshot](https://sgp1.digitaloceanspaces.com/chaindata/origin_chaindata.tar)
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
