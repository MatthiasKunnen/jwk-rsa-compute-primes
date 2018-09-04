import * as base64url from 'base64url';
import * as BN from 'bn.js';

import { factor } from './factor';
import { JwkRsaWithoutPrimes, JwkRsaWithPrimes } from './jwk.interface';

const one = new BN(1);

export function computePrimes(jwk: JwkRsaWithoutPrimes): JwkRsaWithPrimes {
    const required = ['e', 'd', 'n'].filter(r => jwk[r] == null);

    if (required.length > 0) {
        throw Error('The following parameters are required: ' + required.join(', '));
    }

    if (jwk.kty.toUpperCase() !== 'RSA') {
        throw Error('kty MUST be RSA!');
    }

    const d = string2bn(jwk.d);
    const e = string2bn(jwk.e);
    const n = string2bn(jwk.n);

    const {p, q} = factor(e, d, n);

    const dp = d.mod(p.sub(one));
    const dq = d.mod(q.sub(one));
    const qi = q.invm(p);

    return {
        ...jwk,
        p: binaryToBase64Url(p),
        q: binaryToBase64Url(q),
        dp: binaryToBase64Url(dp),
        dq: binaryToBase64Url(dq),
        qi: binaryToBase64Url(qi),
    };
}

function pad(hex: string): string {
    return hex.length % 2 === 1 ? '0' + hex : hex;
}

function binaryToBase64Url(bn: BN): string {
    return base64url(pad(bn.toString('hex')), 'hex');
}

function base64UrlToBinary(str: string): BN {
    return new BN(base64url.toBuffer(str));
}

function string2bn(str: string): BN {
    if (/^[0-9]+$/.test(str)) {
        return new BN(str, 10);
    }

    return base64UrlToBinary(str);
}
