import { Component, Input, DoCheck, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

import { Sensor } from '../../model/sensor';
import { DataService } from '../../services/data.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements DoCheck {
  @Input() sensorId ;
  @Input() deviceId ;
  sensor: Sensor;
  dataset = [];
  datasetLabel = [];
  datasets = [];

  constructor(private dataService: DataService, private httpService: HttpService) { };

  ngDoCheck() {
    if(this.sensorId) {
      this.datasets = [];
      this.datasetLabel = [];

      this.sensor = this.dataService.getDeviceById(this.deviceId).getSensorById(this.sensorId);

      this.datasets.push(this.sensor.dataset.map((data, i) => {
                return Number(data);
            }));

      this.datasets.push(this.sensor.datasetAvg.map((data, i) => {
                return Number(data);
            }));

      console.log(this.datasets);

      this.datasetLabel = this.sensor.datasetLabel.map((data, i) => {
          return data;
      });
    }
  }



}
