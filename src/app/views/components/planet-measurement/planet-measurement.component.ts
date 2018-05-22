import { LocationService } from './../../../shared/services/location.service';
import { MocksService } from './../../../shared/services/mocks.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-planet-measurement',
  templateUrl: './planet-measurement.component.html',
  styleUrls: ['./planet-measurement.component.scss'],

})
export class PlanetMeasurementComponent implements OnInit {
  public gas: any;
  public isToxic:string;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private mocksService: MocksService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.updateData();
    this.locationService.locationChanges().subscribe(
      (changeLocation) => {
        this.getGasData();
      }
    )
    this.getGasData();
  }

  async getGasData() {
    const planet = await this.locationService.getLocation(this.locationService.currentLocation);
    this.gas = await this.mocksService.getMeasurement(planet.atmosphere);
    this.chartDatasets = [
      { data: [55], label: this.gas.gas }      
    ];
    this.chartLabels = ['0'];
    
  }
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [55], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['1'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(56,150,27,0.32)',
      borderColor: 'rgba(0,0,0,0.25)',
      borderWidth: 2,
      pointBackgroundColor: '#f00',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    }
  ];

  public chartOptions: any = {
    responsive: true,
    animation: {
      duration: 0
    }
  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  private updateData() {
    let i = 0;
    setInterval(
      () => {
        const dataset = this.chartDatasets[0].data.filter(p => true);
        dataset.push(Math.floor(Math.random() * this.gas.maxRnd) + this.gas.minRnd);

        const labels = this.chartLabels.filter(p => true);
        i += 1;
        labels.push(i.toString());

        if (dataset.length > 10) {
          dataset.shift();
          labels.shift();
        }

        this.chartDatasets[0].data = [];
        this.chartLabels = [];
        this.chartDatasets[0].data = dataset;
        this.chartLabels = labels;

        let media = dataset.reduce((d, c) => d + c);
        this.isToxic = media / 10 > this.gas.toxicAfter ? 'Si' : 'No';


        this.changeDetectorRef.detectChanges();
      },
      1000
    )
  }
}
