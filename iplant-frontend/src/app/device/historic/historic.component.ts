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
  dropdownOpen = false;
  selectedListItem = "Live Data!";
  historicDataset;

  constructor(private dataService: DataService, private httpService: HttpService) { };

  ngDoCheck() {
    if(this.sensorId) {
      this.sensor = this.dataService.getDeviceById(this.deviceId).getSensorById(this.sensorId);

      /*
      this.datasets = [];
      this.datasetLabel = [];
      this.datasets.push(this.sensor.dataset.map((data, i) => {
                return Number(data);
            }));

      this.datasets.push(this.sensor.datasetAvg.map((data, i) => {
                return Number(data);
            }));


      this.datasetLabel = this.sensor.datasetLabel.map((data, i) => {
          return data;
      });
      */

      if(this.selectedListItem === "Live Data!"){
        this.formatData(this.sensor.dataset, this.sensor.datasetAvg, this.sensor.datasetLabel);
      }


    }

  }

  onDataSelected(file){
    this.selectedListItem = file.date;
    this.dropdownOpen = false;
    const observable = this.httpService.getJson(file.url).subscribe((data: Response) => {
      const historicDataset = data.json();
      observable.unsubscribe();
      this.formatData(historicDataset.dataset, historicDataset.datasetAvg, historicDataset.datasetLabel);
    });

  }

  onLiveDataSelected(){
    this.selectedListItem = "Live Data!";
    this.dropdownOpen = false;
    //this.formatData(this.sensor.dataset, this.sensor.datasetAvg, this.sensor.datasetLabel);
  }

  formatData(dataset, datasetAvg, datasetLabel){
    this.datasets = [];
    this.datasetLabel = [];
    this.datasets.push(dataset.map((data, i) => {
              return Number(data);
          }));

    this.datasets.push(datasetAvg.map((data, i) => {
              return Number(data);
          }));

    if(this.selectedListItem === "Live Data!"){
      this.datasetLabel = datasetLabel;

    } else {
        this.datasetLabel = datasetLabel.map((data) => {
            return moment.utc(data, 'YYYY-MM-DD HH:mm:ss').utcOffset('-05:00').toDate();
        });
    }

  }

}
