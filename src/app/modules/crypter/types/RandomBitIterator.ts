import { BytesToBitIterator } from './BytesToBitIterator';
import { PseudoRandom } from './PseudoRandom';

export class RandomBitIterator implements Iterator<0 | 1> {
    private readonly pseudoRandom: PseudoRandom;

    private bitIterator: Iterator<0 | 1>;

    public constructor(seed: Uint8Array) {
        this.pseudoRandom = new PseudoRandom(seed);
        this.bitIterator = new BytesToBitIterator(Uint8Array.from([this.pseudoRandom.randomByte()]));
    }

    public next(): IteratorResult<0 | 1> {
        let bitResult = this.bitIterator.next();
        while (bitResult.done ?? false) {
            this.bitIterator = new BytesToBitIterator(Uint8Array.from([this.pseudoRandom.randomByte()]));
            bitResult = this.bitIterator.next();
        }
        return { value: bitResult.value };
    }
}
