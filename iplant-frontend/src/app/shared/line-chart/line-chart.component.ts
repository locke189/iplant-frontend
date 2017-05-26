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

    if(JSON.stringify(this._datasets)!==JSON.stringify(datasets)){
      this._datasets = datasets;
      if(this.chart){
                 this.updateData();
      }
    }

  };

  _labels: Array<any>;

  @Input() set labels(labels){

    if(JSON.stringify(this._labels)!==JSON.stringify(labels)){
      this._labels = labels;
      if(this.chart){
                 this.updateData();
      }
    }
  };



  private margin: any = { top: 20, bottom: 20, left: 20, right: 50};
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

  private legend = ["Data","Average"];

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
    this.xScale.domain([this._labels[0], this._labels[this._labels.length - 1]]).range([this.padding, this.width - this.padding]);
    this.yScale.domain([0, d3.max(this.maxSet, d => d)])
                    .range([this.height - this.padding, this.padding ]);

    let line = d3.line<any>().curve(d3.curveBasis)
    .x((d, i) => { return this.xScale(this._labels[i]); })
    .y((d) => { return  this.yScale(d) ; });


    // Select the section we want to apply our changes to
    let svg = d3.select(element).transition();

    svg.select('svg')
      .duration(750)
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

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

        svg.selectAll('.legend')
          .duration(750)
          .attr("transform", (d, i) => {
            const horz = element.offsetWidth - 90;
            const vert = (this.height / 2 - 50) + (i * 18);
            return 'translate(' + horz + ',' + vert + ')'; });
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleTime().domain([this._labels[0], this._labels[this._labels.length - 1]]).range([this.padding, this.width - this.padding]);

    this.maxValues(this._datasets);

        this.chart = true;

    this.yScale = d3.scaleLinear()
                    .domain([0, d3.max(this.maxSet, d => d)])
                    .range([this.height - this.padding, this.padding ]);



    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

      let line = d3.line<any>().curve(d3.curveBasis)
      .x((d, i) => { return this.xScale(this._labels[i]); })
      .y((d) => { return  this.yScale(d) ; });

      this._datasets.forEach( (dataset,i) => {
        svg.append('path')
          .attr('d', line(dataset))
          .attr('stroke', this.colors[i])
          .attr("data-legend", (d,i) => { return this.legend[i]})
          .attr('stroke-width', "2")
          .attr('class', "line" + i)
          .attr('fill', 'none');
      });

    let legends = svg.selectAll(".legend")
    .data(this.legend)
    .enter()
    .append('g')
    .attr("class","legend")
    .attr("transform", (d, i) => {
        const horz = element.offsetWidth - 90;
        const vert = (this.height / 2 - 100) + (i * 18);
        return 'translate(' + horz + ',' + vert + ')'; })
    .style("font-size","12px");

    legends.append('rect')
    .attr('width', '14' )
    .attr('height', '14' )
    .style('fill', (d, i) => {return this.colors[i]})
    .style('stroke', (d, i) => {return this.colors[i]});

    legends.append('text')
    .attr('x', '18')
    .attr('y', '10')
    .text((d, i) => {return d});



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
