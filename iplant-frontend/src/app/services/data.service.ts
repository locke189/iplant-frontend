import { Injectable } from '@angular/core';

import { Device } from '../model/device';

@Injectable()
export class DataService {

deviceList: Device[] = [];

  constructor() { }

  addDevice(device: Device) {
    const index = this.deviceList.findIndex( (element) => element.deviceId === device.deviceId);
    if (index === -1) {
      this.deviceList.push(device);
    } else {
      this.deviceList.splice(index, 1, device);
    }
  }

  getDeviceById(id: string) {
    return this.deviceList.find( (device) => device.deviceId === id);
  }

  getDeviceIdList() {
    return this.deviceList.map( (device) => {
      return device.deviceId;
    });
  }

  getDeviceList() {
    return this.deviceList;
  }
}
