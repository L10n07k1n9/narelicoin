import * as EC from './ec_secp256k1';
import { IMessageInfo, InboxMessage } from './inbox';
import { Token } from './token';

interface IPublicUser {
    id: number;
    publicKey: string;
}

interface IPublicUser {
    id: number;
    publicKey: string;
}

class User {
    public id: number;
    private inbox: InboxMessage[];
    private keyPair: EC.KeyPair;
    constructor(id) {
        this.keyPair = EC.createKeyPair();
        this.id = id;
        this.inbox = [];
    }
    /**
     * getInbox
     */
    public getInbox(): IMessageInfo[] {
        return this.inbox.map((m: InboxMessage): IMessageInfo =>
            ({
                id: m.getId(),
                valid: m.isValid(), message: m.message
            }));
    }
    /**
     * addInboxMessage
     *
     * @param {string} message
     * @param {string} sourcePublicKey
     * @param {*} sourceSignature
     * @memberof User
     */
    public addInboxMessage(message: string, sourcePublicKey: string, sourceSignature: EC.ISignature) {
        const newMsg = new InboxMessage(this.inbox.length + 1, message, sourcePublicKey, sourceSignature);
        this.inbox.push(newMsg);
    }
    /**
     *
     *
     * @returns
     * @memberof User
     */
    public getPrivateKey() {
        return this.keyPair.priv;
    }
    /**
     *
     *
     * @returns
     * @memberof User
     */
    public getPublicKey() {
        return this.keyPair.pub;
    }
}

const users: User[] = [];

export function resetUsers(): boolean {
    return users.splice(0, users.length).length === 0;
}

const createUser = (): Token => {
    const u = new User(users.length + 1);
    users.push(u);
    return new Token(u.id, u.getPrivateKey());
};

const addSignedMessageToPublicKeyInbox = (
    msg: string, signature: any,
    destinyPublicKey: string,
    fromPublicKey: string): boolean => {
    const destinyUser = users.filter((u: User) => u.getPublicKey() === destinyPublicKey);
    try {
        // try to fetch public key of sender
        if (destinyUser.length > 0) {
            destinyUser[0].addInboxMessage(msg, fromPublicKey, signature);
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const listInboxByPrivatekeyToken = (
    tokenKeyOfInbox: string): IMessageInfo[] => {
    const destinyUser = users.filter((u: User) => u.getPrivateKey() === tokenKeyOfInbox);
    try {
        // try to fetch public key of sender
        if (destinyUser.length > 0) {
            return destinyUser[0].getInbox();
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

const listUsers = (): IPublicUser[] => {
    return users.map((u: User): IPublicUser => ({ id: u.id, publicKey: u.getPublicKey() }));
};

export { IPublicUser, createUser, listUsers, addSignedMessageToPublicKeyInbox, listInboxByPrivatekeyToken };
