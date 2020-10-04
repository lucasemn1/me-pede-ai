import * as crypto from 'crypto';

export default class KeysUtil {
  static generatePrivateKey() {
    const dh = crypto.createDiffieHellman(512);
    dh.generateKeys();
    
    return dh.getPrivateKey('base64');
  }
}