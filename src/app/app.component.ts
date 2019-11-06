import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

// Send message to worker

  chartData: Array<any>;

  constructor() {}

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();
      // console.log(this.chartData)
      // change the data periodically
      // setInterval(() => this.generateData(), 5000);
      // setInterval(() => this.bubbleSort(this.chartData), 5000);
    }, 1000);

  }

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 1000)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }

  resetChart(){
    this.generateData()
  }



}
