import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Device } from '../model/device';
import { DataService } from './data.service';

@Injectable()
export class HttpService {
  query: FirebaseListObservable<any[]>;
  data: any[];


  constructor(af: AngularFire, private dataService: DataService) {
    this.query = af.database.list('/devices/');
    console.log(this.query);

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



}
