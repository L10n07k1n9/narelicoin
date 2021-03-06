import * as  bodyParser from 'body-parser';
import * as express from 'express';
import { Block, generateNextBlock, getBlockchain } from './blockchain';
import * as EC from './ec_secp256k1';
import { connectToPeers, getSockets, initP2PServer } from './p2p';
import {
    addSignedMessageToPublicKeyInbox, createUser,
    listInboxByPrivatekeyToken, listUsers, resetUsers
} from './users';

const httpPort: number = parseInt(process.env.HTTP_PORT) || 3001;
const p2pPort: number = parseInt(process.env.P2P_PORT) || 6001;

const initHttpServer = (myHttpPort: number) => {
    const app = express();
    app.use(bodyParser.json());

    app.get('/blocks', (req, res) => {
        res.send(getBlockchain());
    });
    app.post('/mineBlock', (req, res) => {
        const newBlock: Block = generateNextBlock(req.body.data);
        res.send(newBlock);
    });
    app.get('/peers', (req, res) => {
        res.send(getSockets().map((s: any) => s._socket.remoteAddress + ':' + s._socket.remotePort));
    });
    app.post('/addPeer', (req, res) => {
        connectToPeers(req.body.peer);
        res.send();
    });

    // curl -H "Content-type:application/json" --data {} http://localhost:3001/createWallet
    app.post('/resetUsers', (req, res) => {
        res.send(JSON.stringify(resetUsers()));
    });
    app.post('/createWallet', (req, res) => {
        const token = createUser();
        res.send(JSON.stringify(token));
    });
    /*
    * curl http://localhost:3001/listWallets
    */
    app.get('/listWallets', (req, res) => {
        res.send(listUsers());
    });

    // tslint:disable-next-line:max-line-length
    // curl -H "Content-type:application/json" --data '{"msg" : "SHola mundo","privKey": "7c7baa01a080542ea4e427ad5142f8dabb47dec9e8e1962cbacb559a3b4abc39" ,"from":"147f28ca1996e9924a9e657d94bf9ee2b25107c784eabbb49dc6f49f5c55a4898a131936c662f7286ff35ac90fe78885595cb7399b98e49df88a24607b7f76179c"}"to":"047f28ca1996e9924a9e657d94bf9ee2b25107c784eabbb49dc6f49f5c55a4898a131936c662f7286ff35ac90fe78885595cb7399b98e49df88a24607b7f76179c"}' http://localhost:3001/sendSignedMessage
    app.post('/sendSignedMessage', (req, res) => {
        const messageSignature: any = EC.signMessage(req.body.msg, req.body.privKey);
        addSignedMessageToPublicKeyInbox(req.body.msg, messageSignature, req.body.to, req.body.from);
        res.send(JSON.stringify(messageSignature));
    });
    /*
       * curl http://localhost:3001/listWallets
       */
    app.post('/listInbox', (req, res) => {
        res.send(listInboxByPrivatekeyToken(req.body.tokenKey));
    });

    app.listen(myHttpPort, () => {
        console.log('Listening http on port: ' + myHttpPort);
    });
};

initHttpServer(httpPort);
initP2PServer(p2pPort);
