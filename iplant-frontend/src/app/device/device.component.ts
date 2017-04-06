import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  deviceIdList = ['No data'];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.deviceIdList = this.dataService.getDeviceIdList();
  }



}
