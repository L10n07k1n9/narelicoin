# NARELICOIN : IPN CIC A18 Intro to cryptography

The following homework is a proof of concept to show a simple blockchain without mining or ledger concepts.
Nevertheless the following features should be working:

* [x] A block and a blockchain structure.
* [x] Functionality (code) to add blocks to the blockchain.
* [x] Nodes (_or peers_) that communicate and sync the blockchain with other nodes.
* [x] An HTTP API to dispatch the nodes actions against the blockchain.

The purpose is solely to integrate the elliptic curve signing and verification scheme with an arbitrary hash.

Developed on node.js and compiled with typescript.

## To build src

```
npm install
npm start
node ./dist/main.js
```
## To build local docker
To create your local docker image and container:

1. Run `docker build --rm -f Dockerfile -t 73k1l4/blockchain:narelicoin .`
2. Then : `docker run --rm -d -p 3001:3001 73k1l4/blockchain:narelicoin`

## References

* [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1) and [paper](http://www.secg.org/SEC2-Ver-1.0.pdf)
* [Elliptic](https://github.com/indutny/elliptic)
* [Typescript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
  * [Templates](https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html)
  * [Interfaces]((https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html))
* Based on: [Naivecoin: a tutorial](https://lhartikk.github.io/) for building a cryptocurrency or [this](https://medium.com/@lhartikk/a-blockchain-in-200-lines-of-code-963cc1cc0e54)
  * [naivecoin chp 1](https://github.com/lhartikk/naivecoin/tree/chapter1) or **[naivecoin](https://github.com/lhartikk/naivecoin/tree/master)**

## Credits

[

* { Author: "[Leo Lara](b170448@sagitario.cic.ipn.mx)" , ID: B170448 }

]