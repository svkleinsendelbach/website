export interface CallSecret {
    expiresAt: Date;
    hashedData: string;
}

export namespace CallSecret {
    export interface Flatten {
        expiresAt: string;
        hashedData: string;
    }
}
