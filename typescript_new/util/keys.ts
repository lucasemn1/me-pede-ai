import * as crypto from 'crypto';

export function generatePrivateKey(): string{
  const dh = crypto.createDiffieHellman(512);
  dh.generateKeys();
  
  return dh.getPrivateKey('base64');
}