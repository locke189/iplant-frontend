import { Component, DoCheck, Input } from '@angular/core';

import { Device } from '../../model/device';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements DoCheck {

  @Input() deviceId ;
  device: Device ;

  constructor(private dataService: DataService) { }

  ngDoCheck() {
    this.device = this.dataService.getDeviceById(this.deviceId);
  }

}
