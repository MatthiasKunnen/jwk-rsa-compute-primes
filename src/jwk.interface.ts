export interface JwkRsaBase {

    /**
     * The "alg" (algorithm) parameter identifies the algorithm intended for
     * use with the key.
     * See {@link https://tools.ietf.org/html/rfc7517#section-4.4}
     */
    alg?: string;

    /**
     * RSA public exponent e.
     * See {@link https://www.gnupg.org/documentation/manuals/gcrypt-devel/RSA-key-parameters.html}
     */
    e: string;

    /**
     * RSA secret exponent d = e^-1 \bmod (p-1)(q-1).
     * See {@link https://www.gnupg.org/documentation/manuals/gcrypt-devel/RSA-key-parameters.html}
     */
    d: string;

    /**
     * The "kid" (key ID) parameter is used to match a specific key.  This
     * is used, for instance, to choose among a set of keys within a JWK Set
     * during key rollover.
     * See {@link https://tools.ietf.org/html/rfc7517#section-4.5}
     */
    kid?: string;

    /**
     * The "kty" (key type) parameter identifies the cryptographic algorithm
     * family used with the key, such as "RSA" or "EC".
     * See {@link https://tools.ietf.org/html/rfc7517#section-4.1}
     */
    kty: string;

    /**
     * RSA public modulus n.
     * See {@link https://www.gnupg.org/documentation/manuals/gcrypt-devel/RSA-key-parameters.html}
     */
    n: string;

    /**
     * The "use" (public key use) parameter identifies the intended use of
     * the public key.  The "use" parameter is employed to indicate whether
     * a public key is used for encrypting data or verifying the signature
     * on data.
     * See {@link https://tools.ietf.org/html/rfc7517#section-4.2}
     */
    use?: string;

    [k: string]: any; // Some other fields can be specified
}

export interface JwkRsaPrimes {

    /**
     * The "p" (first prime factor) parameter contains the first prime factor.
     * See {@link https://tools.ietf.org/html/rfc7518#section-6.3.2.2}
     */
    p: string;

    /**
     * The "q" (seconds prime factor) parameter contains the second prime factor.
     * See {@link https://tools.ietf.org/html/rfc7518#section-6.3.2.3}
     */
    q: string;

    /**
     * The "dp" (first factor CRT exponent) parameter contains the Chinese
     * Remainder Theorem (CRT) exponent of the first factor.
     * See {@link https://tools.ietf.org/html/rfc7518#section-6.3.2.4}
     */
    dp: string;

    /**
     * The "dq" (second factor CRT exponent) parameter contains the CRT
     * exponent of the second factor.
     * See {@link https://tools.ietf.org/html/rfc7518#section-6.3.2.5}
     */
    dq: string;

    /**
     * The "qi" (first CRT coefficient) parameter contains the CRT coefficient
     * of the second factor.
     * See {@link https://tools.ietf.org/html/rfc7518#section-6.3.2.6}
     */
    qi: string;
}

export interface JwkRsaWithPrimes extends JwkRsaBase, JwkRsaPrimes {
}

export interface JwkRsaWithoutPrimes extends JwkRsaBase, Partial<JwkRsaPrimes> {
}
