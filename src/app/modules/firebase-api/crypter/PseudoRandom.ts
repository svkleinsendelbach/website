export class PseudoRandom {
    private readonly INITIAL_MASH_N = 0xefc8249d;

    private readonly state: {
        state0: number;
        state1: number;
        state2: number;
        constant: number;
    };

    public constructor(seed: Uint8Array) {
        let n = this.INITIAL_MASH_N;
        let state0 = this.mashResult(n = this.mash(Uint8Array.from([32]), n));
        let state1 = this.mashResult(n = this.mash(Uint8Array.from([32]), n));
        let state2 = this.mashResult(n = this.mash(Uint8Array.from([32]), n));
        state0 -= this.mashResult(n = this.mash(seed, n));
        if (state0 < 0)
            state0 += 1;
        state1 -= this.mashResult(n = this.mash(seed, n));
        if (state1 < 0)
            state1 += 1;
        state2 -= this.mashResult(n = this.mash(seed, n));
        if (state2 < 0)
            state2 += 1;
        this.state = {
            constant: 1,
            state0: state0,
            state1: state1,
            state2: state2
        };
    }

    public randomByte(): number {
        return Math.floor(this.random() * 256);
    }

    private mash(data: Uint8Array, n: number): number {
        let m = n;
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < data.length; i++) {
            m += data[i];
            let h = 0.02519603282416938 * m;
            m = Math.trunc(h);
            h -= m;
            h *= m;
            m = Math.trunc(h);
            h -= m;
            m += h * 0x100000000;
        }
        return m;
    }

    private mashResult(n: number): number {
        return Math.trunc(n) * 2.3283064365386963e-10;
    }

    private random(): number {
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        const t = (2091639 * this.state.state0) + (this.state.constant * 2.3283064365386963e-10);
        this.state.state0 = this.state.state1;
        this.state.state1 = this.state.state2;
        this.state.constant = Math.trunc(t);
        this.state.state2 = t - this.state.constant;
        return this.state.state2;
    }
}
