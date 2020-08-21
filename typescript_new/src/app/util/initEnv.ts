import * as crypto from 'crypto';

const privateKey = crypto.createDiffieHellman(512).generateKeys('base64');

console.log(privateKey);