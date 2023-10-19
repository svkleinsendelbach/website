import { v4 as uuidv4 } from 'uuid';

export class Guid {
    public constructor(
        public readonly guidString: string
    ) {}

    public static fromString(value: string): Guid {
        const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/u;
        if (!regex.test(value))
            throw new Error(`Couldn't parse Guid, guid string isn't a valid Guid: ${value}`);
        return new Guid(value.toUpperCase());
    }

    public static newGuid(): Guid {
        return new Guid(uuidv4().toUpperCase());
    }
}

