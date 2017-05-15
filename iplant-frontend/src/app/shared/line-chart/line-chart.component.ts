import { HostListener, Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnChanges {
  _datasets:Array<any>;

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.updateData();
 }

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() set datasets(datasets: Array<any>){
    console.log("old value:");
    console.log(this._datasets);
    console.log("new value:");
    console.log(datasets);

    if(JSON.stringify(this._datasets)!==JSON.stringify(datasets)){
      this._datasets = datasets;
      if(this.chart){
                console.log("OH NO!")
                 this.updateData();
      }
    }

  };

  @Input() private labels: Array<any>;



  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private width: number;
  private height: number;
  private barPadding: number = 1;
  private padding: number = 40;
  private chart:any =false;
  private xScale:any;
  private yScale:any;
  private xAxis:any;
  private yAxis:any;
  private colors:Array<any>;
  private maxSet:Array<any>;
  constructor() { }

  ngOnInit() {
    this.colors = ["green", "blue", "red", "yellow"];
    this.createChart();
  }

  ngOnChanges() {
  }

  maxValues(datasets:Array<any>){
   this.maxSet = datasets.map( (dataset) => { return Math.max(...dataset) });
  }



  updateData(){
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.maxValues(this._datasets);
    this.xScale.domain([this.labels[0], this.labels[this.labels.length - 1]]).range([this.padding, this.width - this.padding]);
    this.yScale.domain([0, d3.max(this.maxSet, d => d)])
                    .range([this.height - this.padding, this.padding ]);

    let line = d3.line<any>().curve(d3.curveBasis)
    .x((d, i) => { return this.xScale(this.labels[i]); })
    .y((d) => { return  this.yScale(d) ; });


    // Select the section we want to apply our changes to
    let svg = d3.select(element).transition();


    this._datasets.forEach((dataset,i) => {
      // Make the changes
          svg.select(".line"+i)   // change the line
              .duration(750)
              .attr("d", line(dataset));
    });

        svg.select(".axisx") // change the x axis
            .duration(750)
            .call(this.xAxis);
        svg.select(".axis") // change the y axis
            .duration(750)
            .call(this.yAxis);
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleTime().domain([this.labels[0], this.labels[this.labels.length - 1]]).range([this.padding, this.width - this.padding]);

    this.maxValues(this._datasets);

        this.chart = true;

    this.yScale = d3.scaleLinear()
                    .domain([0, d3.max(this.maxSet, d => d)])
                    .range([this.height - this.padding, this.padding ]);



    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

      let line = d3.line<any>().curve(d3.curveBasis)
      .x((d, i) => { return this.xScale(this.labels[i]); })
      .y((d) => { return  this.yScale(d) ; });

      this._datasets.forEach( (dataset,i) => {
        svg.append('path')
          .attr('d', line(dataset))
          .attr('stroke', this.colors[i])
          .attr('stroke-width', "2")
          .attr('class', "line" + i)
          .attr('fill', 'none');
      });




     this.yAxis = d3.axisLeft(this.yScale);
     svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + (this.padding) + ",0)")
     .call(this.yAxis);

     this.xAxis = d3.axisBottom(this.xScale);
     svg.append("g")
     .attr("class", "axisx")
     .attr("transform", "translate(0," + (this.height - this.padding) + ")")
     .call(this.xAxis);

  }
}
