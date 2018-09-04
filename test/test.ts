import * as assert from 'assert';
import { computePrimes } from '../src';
import { JwkRsaWithoutPrimes } from '../src/jwk.interface';

const oneLine = (strings, ...values) => {
    let output = '';
    for (let i = 0; i < values.length; i++) {
        output += strings[i] + values[i];
    }
    output += strings[values.length];

    return output.replace(/\s/g, '');
};

const getValidInput: () => JwkRsaWithoutPrimes = () => ({
    kty: 'RSA',
    d: oneLine`
        X3R1wmXxK5FZWkoL9f2uH6ypNrvg0d6jZwioGVjtxqSmbBsE_of7-8Fr8pdQgS-ERUxWV7dz
        TCHq6sHjgYtsKtUCnr_NKsvqaESoAqbu2nVk6ex-4SNuAVvVha8JQYdUMKeFLJ67SHu7HICl
        79PjWUDCwhb0jBFsmRrilA55xzXM4y1JvZsGBRaQY16VC7UelhaIwsM5aTUD_RBwHdfmjYxz
        09TmixJDLq8UsMkG_iisOfb0PCHn6YMrMO0piNdLk3xoSThTukZxIIKnMMKlABvxmWC4Z3B-
        8gZJ0syA4qGxX-gxRuKoS6HCdebDNWoAVeZT5o308AjfzlJ6uCv-AQ`,
    e: 'AQAB',
    use: 'sig',
    kid: 's1',
    alg: 'RS256',
    n: oneLine`
        qj2UMQrfLVlTGfzvu707u9SsmWIe7gP61BqpdFsIZ9iwLO4uJLFUjR_T_9PhqDxI51l_MFNX
        S4TaQMC170JFVTrl_f8fI0BYMqd96mkGOxeQQG-_x51nQb4E2Gm3kNFe8nKyOCno_a_scIWp
        07gnt6HXEgjPZscC4YD4OZQ2WdSH9yk4BahPyg79aHslNn0vz2u-jizkr3d1BFWSWXC100te
        bWReaeqeXm_QOkLoyUMTHQzyteR_hx5uwWockuLgMooNhbOKPumM2XLf4G8Q-vlIsBo4nXp0
        mgSbpIJi1l4Ljmv3qYNQi__RIytteGtivrOo-OhI6YRh2JG_kz-8cQ`,
});

assert.strictEqual(oneLine`t
est`, 'test', 'oneLine template tag not working');

const missingParameters = (() => {
    const jwk = getValidInput();
    delete jwk.e;
    delete jwk.d;
    delete jwk.n;

    return jwk;
})();
assert.throws(() => computePrimes(missingParameters), 'Missing parameters should throw!');

const incorrectKty = (() => {
    const jwk = getValidInput();
    jwk.kty = 'EC';

    return jwk;
})();
assert.throws(() => computePrimes(incorrectKty), 'Non-RSA should throw!');

assert.deepStrictEqual(computePrimes(getValidInput()), {
    kty: 'RSA',
    d: oneLine`
        X3R1wmXxK5FZWkoL9f2uH6ypNrvg0d6jZwioGVjtxqSmbBsE_of7-8Fr8pdQgS-ERUxWV7dz
        TCHq6sHjgYtsKtUCnr_NKsvqaESoAqbu2nVk6ex-4SNuAVvVha8JQYdUMKeFLJ67SHu7HICl
        79PjWUDCwhb0jBFsmRrilA55xzXM4y1JvZsGBRaQY16VC7UelhaIwsM5aTUD_RBwHdfmjYxz
        09TmixJDLq8UsMkG_iisOfb0PCHn6YMrMO0piNdLk3xoSThTukZxIIKnMMKlABvxmWC4Z3B-
        8gZJ0syA4qGxX-gxRuKoS6HCdebDNWoAVeZT5o308AjfzlJ6uCv-AQ`,
    e: 'AQAB',
    use: 'sig',
    kid: 's1',
    alg: 'RS256',
    n: oneLine`
        qj2UMQrfLVlTGfzvu707u9SsmWIe7gP61BqpdFsIZ9iwLO4uJLFUjR_T_9PhqDxI51l_MFNX
        S4TaQMC170JFVTrl_f8fI0BYMqd96mkGOxeQQG-_x51nQb4E2Gm3kNFe8nKyOCno_a_scIWp
        07gnt6HXEgjPZscC4YD4OZQ2WdSH9yk4BahPyg79aHslNn0vz2u-jizkr3d1BFWSWXC100te
        bWReaeqeXm_QOkLoyUMTHQzyteR_hx5uwWockuLgMooNhbOKPumM2XLf4G8Q-vlIsBo4nXp0
        mgSbpIJi1l4Ljmv3qYNQi__RIytteGtivrOo-OhI6YRh2JG_kz-8cQ`,
    p: oneLine`
        2AxTFKklIK077je1CLhzolRnUdHuYOtfo0s69ipDWhGYaCb8owofQDllFxhDh3K0Tjr5UlHH
        4g7rFLi45n_uCD20XQjJHzsimrUGcWxIK9waC2Fnq9rhBK7tL8bR2CDxiK9X5TXPbJFlLP28
        4oH2z3Bnr7Pn_dScA_N5aTevHSE`,
    q: oneLine`
        ybi7Vp89X_KGw-kPc8nIlJzjSTCdF2mCy9mF-G0t7Uq0C9ISlYZs4OvWcYugXzR-WmpwUnZr
        PUW9w-k3AfbVaFb6y3xnIjeO8F27YrD4mpnfuOKIUfKHq3b-Aiek8BBsiDXn1UrCvfJMr08a
        q_SA1pp8QNoJo5Pv6aSDW3Wp5VE`,
    dp: oneLine`
        vggRJ7IjqxtVBJLRVKtRYq5U9r3trCg8RhiM8yt3dIjXgn0QaKQlmsshJPA9razx9YGf_Y1b
        gHZYxjA4yt4p0-vacp6gsSzFokiqMyfoT1PZQLtbgekTVZg7nnOF7lIDwZNhf4YWPcuhr7I7
        6wwfuJSJTx2yaC0TUdJdr3PAPqE`,
    dq: oneLine`
        apM4HwbYxVV8UAtVR6aHW8Ub7DJL_O-Y1ByjxGHijukWANzHRsqTwa24SZssasBwNVLg7yBz
        fhbXsKcJkfcYPx0dOd8LGi_iTCopc3XukrfTVHoS7cDGXxfqEbdiVBdJUBmy16S9CN_4FfMk
        M09ltnw-Q4Eu8IabjYSGhg6_aVE`,
    qi: oneLine`
        fHBGcXSVdL3X-8JPeoCva6ePWeU5NbTGYdbO4DetPX27VjhAGeizYJFdkW0nBXAy2GESPtCB
        d3q5RbUffnifEkVBQmfSeANO8maOgVadRxe2tKa5xcnBp6CR70odraMERExMFexQL6671vd_
        Nw-Y5GdMFH7R260Mzg4wT-16yLA`,
});
