import { Injectable } from '@angular/core';
//import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncrDecrService {
  // constructor() {}

  // key = 'RandomInitVector';

  // set(value) {
  //   var key = CryptoJS.enc.Utf8.parse(this.key);
  //   var iv = CryptoJS.enc.Utf8.parse(this.key);
  //   var encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), key, {
  //     keySize: 128 / 8,
  //     iv: iv,
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });

  //   return encrypted.toString();
  // }

  // get(value) {
  //   var key = CryptoJS.enc.Utf8.parse(this.key);
  //   var iv = CryptoJS.enc.Utf8.parse(this.key);
  //   var decrypted = CryptoJS.AES.decrypt(value, key, {
  //     keySize: 128 / 8,
  //     iv: iv,
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });
  //   if (decrypted.words.length > 0) {
  //     return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
  //   } else {
  //     return {};
  //   }
  // }

  // ecr(obj) {
  //   return CryptoJS.AES.encrypt(JSON.stringify(obj), this.key).toString();
  // }

  // dcr(obj) {
  //   return JSON.parse(
  //     CryptoJS.AES.decrypt(obj, this.key).toString(CryptoJS.enc.Utf8)
  //   );
  // }

  // dcr2(obj) {
  //   return JSON.parse(
  //     CryptoJS.AES.decrypt(obj, this.key).toString(CryptoJS.enc.Utf8)
  //   );
  // }
}
