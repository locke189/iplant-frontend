import { Component, DoCheck, Input, Output, EventEmitter } from '@angular/core';

import { Device } from '../../model/device';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-actuator',
  templateUrl: './actuator.component.html',
  styleUrls: ['./actuator.component.css']
})
export class ActuatorComponent implements DoCheck {

  @Input() deviceId ;
  device: Device;
  @Output() selectedActuator = new EventEmitter()

  constructor(private dataService: DataService) { }

  ngDoCheck() {
    this.device = this.dataService.getDeviceById(this.deviceId);
  }

  onRowClick(actuator){
    this.selectedActuator.emit(actuator.actuatorId);
  }
}
