import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {
  currentState:string = "Bubble sort";
  @ViewChild('chart',{static:true}) private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    let xDomain = this.data.map(d => d[0]);
    let yDomain = [0, d3.max(this.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

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

  onClickChangeState(string){
    this.currentState=string;
  }

  onClickMe() {
    if(this.currentState === "Bubble sort"){
      this.bubbleSort(this.data);
    }
    if(this.currentState === "Insertion sort"){
      this.insertionSort(this.data);
    }
    if(this.currentState === "Selection sort"){
      this.selectionSort(this.data);
    }
    this.updateChart()
  }

  bubbleSort(arr){
    const sortarr = arr.map(e=>e[1])
    var passthrough = 0;
    var swaps = 0
    function recurse(){
    if(sortarr.length-passthrough<0)return 
    for(var i=0; i<sortarr.length-passthrough; i++){      
        // swaps = 0
        if(sortarr[i+1]<sortarr[i]){
            let tmp = sortarr [i];
            let tmp1 = arr [i];
            sortarr[i] = sortarr[i+1]
            arr[i] = arr[i+1]
            sortarr[i+1] = tmp
            arr[i+1] = tmp1
            // swaps++
            }
        // if (swaps === 0) return
        }
        // break;
        return
        // passthrough ++ //removed to allow one iteration 
        // return recurse() //
    }
    recurse()
    // console.log(sortarr)
    return arr
  }


  selectionSort(arr){
    const sortarr = arr.map(e=>e[1])
        let startNum = 0;
    
        function recurse(){
            if(startNum>=sortarr.length) return;
            let smallestIndex = startNum;
            for (let i=startNum; i < sortarr.length ; i++){
                if(sortarr[i]<sortarr[smallestIndex]){
                    smallestIndex=i;
                }
            }
            if(sortarr[startNum]>sortarr[smallestIndex]){
                let tmp = sortarr[startNum];
                let tmp1 = arr[startNum];
                sortarr[startNum] = sortarr[smallestIndex];
                arr[startNum] = arr[smallestIndex];
                sortarr[smallestIndex] = tmp;
                arr[smallestIndex] = tmp1;
                return
            }
            // return
            startNum++
            recurse()
        }
        recurse()
        return arr
    }
    
    insertionSort (arr) {
      const sortarr = arr.map(e=>e[1])
      let pointer = 1;
      while(pointer<sortarr.length){
          if(sortarr[pointer]>=sortarr[pointer-1]){
              pointer++
          }else{
              for(let i=0;i<pointer;i++){
                if(sortarr[pointer]>=sortarr[pointer-1]){continue}
                  if(sortarr[pointer]>sortarr[pointer-i-1]){
                      let tmp1 = arr[pointer]
                      let tmp = sortarr[pointer]
                      arr.splice(pointer,1)
                      sortarr.splice(pointer,1);
                      arr.splice(pointer-i,0,tmp1);
                      sortarr.splice(pointer-i,0,tmp);
                  }else if(i+1==pointer){
                    let tmp1 = arr[pointer]
                    let tmp = sortarr[pointer]
                    arr.splice(pointer,1)
                    sortarr.splice(pointer,1);
                    arr.splice(0,0,tmp1);
                    sortarr.splice(0,0,tmp);
                  }
              }
              return
              pointer++
          }
          // return
      }
  return arr
  }

}
