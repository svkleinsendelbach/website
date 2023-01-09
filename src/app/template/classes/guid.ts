import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a guid; used to generate a new guid.
 */
export class guid {

    /**
     * Initializes guid with a string.
     * @param { string } guidString String value of the guid.
     */
    public constructor(
      public readonly guidString: string
    ) {}
}

export namespace guid {

    /**
     * Generates a new guid.
     * @return { guid } Generated guid.
     */
    export function newGuid(): guid {
      return new guid(uuidv4().toUpperCase())
    }
}
