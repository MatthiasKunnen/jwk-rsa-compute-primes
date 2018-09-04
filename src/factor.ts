import * as BN from 'bn.js';
import * as crypto from 'crypto';

const zero = new BN(0);
const one = new BN(1);
const two = new BN(2);

function rand(low: BN, high: BN): BN {
    let b;

    do {
        b = new BN(crypto.randomBytes(high.byteLength()));
    } while (b.cmp(low) <= 0 || b.cmp(high) >= 0);

    return b;
}

function odd(n: BN): BN {
    if (n.cmp(zero) === 0) {
        return zero;
    }

    let r = n;

    while (r.isEven()) {
        r = r.div(two);
    }

    return r;
}

function rootOne(x: BN, r: BN, n: BN): BN {
    let i = x.toRed(BN.red(n)).redPow(r).fromRed();
    let o = zero;

    while (i.cmp(one) !== 0) {
        o = i;
        i = i.mul(i).mod(n);
    }

    if (o.cmp(n.sub(one)) === 0) {
        return zero;
    }

    return o;
}

/**
 * Calculate primes using e, d, and n.
 * @param e
 * @param d
 * @param n
 * @return the two primes used. p will be greater than q.
 */
export function factor(e, d, n): {p: BN, q: BN} {
    const k = e.mul(d).sub(one);
    const r = odd(k);
    let y;

    do {
        y = rootOne(rand(two, n), r, n);
    } while (y.cmp(zero) === 0);

    const p = y.sub(one).gcd(n);
    const q = n.div(p);

    return {
        p: p.gt(q) ? p : q,
        q: p.gt(q) ? q : p,
    };
}
