import { Component, Input, DoCheck, ViewChild } from '@angular/core';

import { Sensor } from '../../model/sensor';
import { DataService } from '../../services/data.service';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

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




  sensor: Sensor ;

  ChartColor: Array<any> = [];
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




  constructor(private dataService: DataService) { };

  ngDoCheck() {

    if(this.sensorId){

      this.sensor = this.dataService.getDeviceById(this.deviceId).getSensorById(this.sensorId);


      this.ChartColor = [{  backgroundColor: 'rgba(0,83,0,0.2)',
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
      this.ChartLabels = this.sensor.datasetLabel;
      this.ChartData = [  { data: this.sensor.dataset, label: 'Raw data', },
                          { data: this.sensor.datasetAvg, label: 'Filtered data', },
                         ];
      setTimeout(() => {
              if (this.chart && this.chart.chart && this.chart.chart.config) {
                  this.chart.chart.config.data.labels = this.sensor.datasetLabel;
                  this.chart.chart.update();
              }
          });
    }
  }







}
