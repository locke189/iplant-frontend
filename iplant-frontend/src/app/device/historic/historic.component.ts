import { Component, Input, DoCheck, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';

import { Sensor } from '../../model/sensor';
import { DataService } from '../../services/data.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements DoCheck {
  @Input() sensorId ;
  @Input() deviceId ;

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  dropdownOpen: boolean = false;
  selectedDataset: string = "Dataset";
  datasetUrl: string = '';
  historicDataset;
  sensor: Sensor ;
  timeout;

  // Chart Settings
  ChartColor: Array<any> = [{  backgroundColor: 'rgba(0,83,0,0.2)',
                        borderColor: 'rgba(0,83,0,1)',
                        pointBackgroundColor: 'rgba(0,83,0,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(0,83,0,1)',
                      }, {
                        backgroundColor: 'rgba(0,0,96,0.2)',
                        borderColor: 'rgba(0,0,96,1)',
                        pointBackgroundColor: 'rgba(0,0,96,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(0,0,96,1)',
                      }];
  ChartLabels: string[] = [];
  ChartData: Array<any> = [];
  ChartOptions:any = {
    responsive: true,
    scales: {
        xAxes: [{
          ticks: {
              autoSkip: true,
              maxTicksLimit: 12
          }
        }]
    }
  };


  constructor(private dataService: DataService, private httpService: HttpService) { };

  ngDoCheck() {

    if(this.sensorId) {
      let dataset;
      let datasetAvg;
      let labels;
      let payload;

      if (!this.datasetUrl) {
        this.sensor = this.dataService.getDeviceById(this.deviceId).getSensorById(this.sensorId);
        dataset = this.sensor.dataset;
        datasetAvg = this.sensor.datasetAvg;
        labels = this.sensor.datasetLabel;
      } else {
        dataset = this.historicDataset.dataset;
        datasetAvg = this.historicDataset.datasetAvg;
        labels = this.historicDataset.datasetLabel.map((label) => {
          return moment.utc(label, 'HH:mm').utcOffset('-05:00').format('HH:mm');
        });
      }

      this.ChartLabels = labels;
      this.ChartData = [  { data: dataset, label: 'Raw data', },
                          { data: datasetAvg, label: 'Filtered data', },
                         ];
      this.timeout = setTimeout(() => {
              if (this.chart && this.chart.chart && this.chart.chart.config) {
                  this.chart.chart.config.data.labels = labels;
                  this.chart.chart.update();
              }
          });
    }
    else {
      this.datasetUrl = '';
      this.selectedDataset = "Live data";
    }
  }

selectDataset(value) {
  this.dropdownOpen = !this.dropdownOpen;
  this.datasetUrl = '';
  if (value){
    console.log('Getting Historic');
    this.httpService.getJson(value.url).subscribe((data: Response) => {
      this.historicDataset = data.json();
      this.selectedDataset = value.date;
      this.datasetUrl = value.url;

    });
  } else {
    this.selectedDataset = "Live data";
  }

}


}
