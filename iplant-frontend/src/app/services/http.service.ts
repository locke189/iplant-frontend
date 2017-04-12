import { Injectable } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Device } from '../model/device';
import { DataService } from './data.service';

@Injectable()
export class HttpService {
  query: FirebaseListObservable<any[]>;
  data: any[];


  constructor(af: AngularFire, private dataService: DataService, private http:Http) {
    this.query = af.database.list('/devices/');

    // subscribe to changes
    this.query.subscribe(queriedItems => {
      this.getDeviceList(queriedItems);
    });
  }


getDeviceList(queriedItems) {
  for (let item of queriedItems) {
    this.dataService.addDevice(new Device(item));
  }
}

getJson(url){
  return this.http.get(url);
}


}
