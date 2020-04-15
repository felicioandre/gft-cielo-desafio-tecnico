import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data/data.service';
import { ICard } from './interfaces/ICard';
import { parseJSON } from 'date-fns';
import { IChart } from './interfaces/IChart';

// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public mainInformationData: ICard[] = [];
  public mainChartData: IChart;
  public lastUpdate: Date;

  constructor(private dataServ: DataService) {}

  async ngOnInit() {
    this.getMainData();
    await this.getDataFromCountry();
  }

  public get loading() {
    return this.mainInformationData.length === 0 || !this.mainChartData;
  }

  private async getDataFromCountry() {
    const dataCountry = await this.dataServ.getInformationFromCountry('brazil');
    this.mainChartData = { ...dataCountry };
  }

  private getMainData() {
    this.dataServ.getMainInformation().subscribe((ret) => this.fillData(ret));
  }

  private fillData(data) {
    const { data: content, lastUpdate } = data;
    this.lastUpdate = lastUpdate;
    this.mainInformationData = content;
  }
}
