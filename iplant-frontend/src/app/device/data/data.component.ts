import { Component, DoCheck, Input } from '@angular/core';

import { Device } from '../../model/device';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements DoCheck {
  @Input() deviceId ;
  device: Device;

  constructor(private dataService: DataService) { }

  ngDoCheck() {
    this.device = this.dataService.getDeviceById(this.deviceId);
  }

}
