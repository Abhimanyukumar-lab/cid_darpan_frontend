import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor(private storage: LocalStorageService) {}

  getStoredValue = (key: string): any => {
    return this.storage.retrieve(key);
  };

  setStoredValue = (key: string, data: any) => {
    return this.storage.store(key, data);
  };

  destroyStoredValue = (key: string): any => {
    return this.storage.clear(key);
  };
}
