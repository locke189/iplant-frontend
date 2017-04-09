import { Component, DoCheck, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() selectedSensor = new EventEmitter()

  constructor(private dataService: DataService) { }

  ngDoCheck() {
    this.device = this.dataService.getDeviceById(this.deviceId);
  }

  onRowClick(sensor){
    this.selectedSensor.emit(sensor.sensorId);
  }
}
