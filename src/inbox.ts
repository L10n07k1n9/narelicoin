import * as EC from './ec_secp256k1';

export interface IMessageInfo {
    message: string;
    id: number;
    valid: boolean;
}

export class InboxMessage {
    public message: string;
    private id: number;
    private from: string;
    private valid: boolean;
    private signature: EC.ISignature;
    constructor(id: number, message: string, sourcePublicKey: string, sourceSignature: EC.ISignature) {
        this.id = id;
        this.message = message;
        this.from = sourcePublicKey;
        this.signature = sourceSignature;
        this.valid = EC.verifySignatureMessage(this.message, this.from, this.signature);
    }
    public isValid(): boolean {
        return this.valid;
    }
    public getId(): number {
        return this.id;
    }
}
