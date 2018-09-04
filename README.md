# Compute primes from an existing RSA JWK

This code is extracted from
https://github.com/dannycoates/pem-jwk.

# Usage
```TypeScript
import { computePrimes } from 'jwk-rsa-compute-primes';

console.log(computePrimes({
    kty: 'RSA',
    d: `
        X3R1wmXxK5FZWkoL9f2uH6ypNrvg0d6jZwioGVjtxqSmbBsE_of7-8Fr8pdQgS-ERUxWV7dz
        TCHq6sHjgYtsKtUCnr_NKsvqaESoAqbu2nVk6ex-4SNuAVvVha8JQYdUMKeFLJ67SHu7HICl
        79PjWUDCwhb0jBFsmRrilA55xzXM4y1JvZsGBRaQY16VC7UelhaIwsM5aTUD_RBwHdfmjYxz
        09TmixJDLq8UsMkG_iisOfb0PCHn6YMrMO0piNdLk3xoSThTukZxIIKnMMKlABvxmWC4Z3B-
        8gZJ0syA4qGxX-gxRuKoS6HCdebDNWoAVeZT5o308AjfzlJ6uCv-AQ`,
    e: 'AQAB',
    use: 'sig',
    kid: 's1',
    alg: 'RS256',
    n: `
        qj2UMQrfLVlTGfzvu707u9SsmWIe7gP61BqpdFsIZ9iwLO4uJLFUjR_T_9PhqDxI51l_MFNX
        S4TaQMC170JFVTrl_f8fI0BYMqd96mkGOxeQQG-_x51nQb4E2Gm3kNFe8nKyOCno_a_scIWp
        07gnt6HXEgjPZscC4YD4OZQ2WdSH9yk4BahPyg79aHslNn0vz2u-jizkr3d1BFWSWXC100te
        bWReaeqeXm_QOkLoyUMTHQzyteR_hx5uwWockuLgMooNhbOKPumM2XLf4G8Q-vlIsBo4nXp0
        mgSbpIJi1l4Ljmv3qYNQi__RIytteGtivrOo-OhI6YRh2JG_kz-8cQ`,
}));
```

Will output:
```json
{
    "kty": "RSA",
    "d": "X3R1wmXxK5FZ...AQ",
    "e": "AQAB",
    "use": "sig",
    "kid": "s1",
    "alg": "RS256,
    "n": "qj2UMQrfLVlTGfzvu707u9SsmWIe7gP61BqpdFsIZ9iwLO4uJLFUjR_T_9P...-8cQ",
    "p": "2AxTFKklIK077je1CLhzolRnUdHuYOtfo0s69ipDWhGYaCb8owofQDllFxh...HSE",
    "q": "ybi7Vp89X_KGw-kPc8nIlJzjSTCdF2mCy9mF-...aSDW3Wp5VE",
    "dp": "vggRJ7IjqxtVBJLRVKtRYq5U9r3trCg8RhiM8yt3dIjXgn0QaK...3PAPqE",
    "dq": "apM4HwbYxVV8UAtVR6aHW8Ub7DJL_O-Y1ByjxGH...6_aVE",
    "qi": "fHBGcXSVdL3X-8JPeoCva6eP...Mzg4wT-16yLA",
}
```

Some values are abbreviated for readability purposes. To see the full length
keys, look in `test/test.ts`.
