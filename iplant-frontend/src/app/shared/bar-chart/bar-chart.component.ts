import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private labels: Array<any>;


  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private width: number;
  private height: number;
  private barPadding: number = 1;
  private padding: number = 40;
  private chart:any;

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {

  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    let  xScale = d3.scaleBand().padding(0.1).domain(this.labels).rangeRound([this.padding, this.width - this.padding]);

    let  yScale = d3.scaleLinear()
                    .domain([0, d3.max(this.data, d => d)])
                    .range([this.height - this.padding, this.padding ]);

    let  colorScale = d3.scaleLinear()
                    .domain([0, d3.max(this.data, d => d)])
                    .rangeRound([0, 255 ]);

    console.log("height:")
    console.log(this.height);

    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

     svg.selectAll("rect")
     .data(this.data)
     .enter()
     .append("rect")
     .attr("x", (d,i) => { return  xScale(this.labels[i])})
     .attr("y", (d) => { return  yScale(d) })
     .attr("width",  xScale.bandwidth() )
     .attr("height", (d, i) => { return this.height - this.padding - yScale(d);})
     .attr("fill", (d) => { return "rgb(0, 0, " + colorScale(d) + ")";});

     svg.selectAll("text")
     .data(this.data)
     .enter()
     .append("text").text((d) => { return d; })
     .attr("x", (d,i) => { return  xScale(this.labels[i]) + this.padding + this.barPadding})
     .attr("y", (d) => { return this.height - this.padding})
     .attr("font-family", "sans-serif")
     .attr("font-size", "6px")
     .attr("fill", "white")
     .attr("text-anchor", "middle");


     let yAxis = d3.axisLeft(yScale);
     svg.append("g")
     .attr("class", "axis")
     .attr("transform", "translate(" + (this.padding) + ",0)")
     .call(yAxis);

     let xAxis = d3.axisBottom(xScale);
     svg.append("g")
     .attr("class", "axisx")
     .attr("transform", "translate(0," + (this.height - this.padding) + ")")
     .call(xAxis);

  }

  /*
  updateChart() {

    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }
  */
}
