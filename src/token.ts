
export class Token {
    public userId: number;
    public privateKey: string;
    constructor(userId: number, privateKey: string) {
        this.userId = userId;
        this.privateKey = privateKey;
    }
}
