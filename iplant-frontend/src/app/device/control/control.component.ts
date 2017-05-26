import { Component, Input, DoCheck, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

import { Actuator } from '../../model/actuator';
import { DataService } from '../../services/data.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { HttpService } from '../../services/http.service';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements DoCheck {


  @Input() actuatorId ;
  @Input() deviceId ;
  actuator: Actuator;
  selectedAction: String = "On";
  actions = ["On","Off","Toggle"];
  dropdownOpen: boolean = false;

  query: FirebaseObjectObservable<any>;

  constructor(private dataService: DataService, private httpService: HttpService, private af: AngularFire) { };

  ngDoCheck() {
    if(this.actuatorId) {
      this.actuator = this.dataService.getDeviceById(this.deviceId).getActuatorById(this.actuatorId);
      const path = '/devices/' + this.deviceId + '/actuators/' +this.actuatorId+'/actions';
      this.query =  this.af.database.object(path);
    }
  }

  selectAction(value) {
    this.dropdownOpen = !this.dropdownOpen;
    this.selectedAction = value;
  }

  executeAction(){
    this.query.set(this.selectedAction);
  }

  isCamera(){
    return this.actuator.type === 'CAM';
  }
}
