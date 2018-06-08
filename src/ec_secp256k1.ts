// https://github.com/indutny/elliptic
import * as EC from 'elliptic';

interface ISignature {
    r: string;
    s: string;
    recoveryParam: number;
}

class KeyPair {
    public pub: string;
    public priv: string;
    constructor(pub: string, priv: string) {
        this.priv = priv;
        this.pub = pub;
    }
}

// Create and initialize EC context (better do it once and reuse it)
const CONTEXT = new EC.ec('secp256k1');

// Generate keys (d,P)
const createKeyPair = () => {
    const kp = CONTEXT.genKeyPair();
    return new KeyPair(
        kp.getPublic().encode('hex'), kp.priv.toString('hex')
    );
};
const hash = (msg: string): string => {
    return Buffer.from(msg, 'ascii').toString('hex');
};
// Sign message (r,s)
const signMessage = (m: string, privateKey: string): ISignature => {
    const msgHash = hash(m);
    // return /*signature*/ key.sign(msgHash);
    // Export DER encoded signature in Array
    // var derSign = signature.toDER();
    return CONTEXT.sign(msgHash, privateKey);
};

const verifySignatureMessage = (message: string, publicKey: string, signature: any) => {
    // Import public key
    const key = CONTEXT.keyFromPublic(publicKey, 'hex');
    const msgHash = hash(message);
    return CONTEXT.verify(msgHash, signature, key);
};

export { ISignature, CONTEXT, KeyPair, createKeyPair, signMessage, verifySignatureMessage };
