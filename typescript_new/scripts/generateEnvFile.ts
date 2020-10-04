import * as path from 'path';
import * as fs from 'fs';
import KeysUtil from '../util/KeysUtil';

const lines = {
  HOST: '',
  PRIVATE_KEY: KeysUtil.generatePrivateKey(),
  NODE_ENV: '',
  DB_HOST: '',
  DB_DATABASE: '',
  DB_USER: '',
  DB_PASSWORD: '',
}

let fileValue = '';

for(const line in lines) {
  fileValue += `${line}=${lines[line]}\n`;
}

fs.writeFile(path.resolve(__dirname, '..', '.env'), fileValue, err => {
  console.log(err ? err : 'Ok');
});
