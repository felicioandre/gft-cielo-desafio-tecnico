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
    this.dataServ.getMainInformation().subscribe((ret) => {
      this.manipulateData(ret);
    });
  }

  private manipulateData(data) {
    this.mainInformationData = [];

    const { totalConfirmed, totalDeaths, totalRecovered, lastUpdated } = data;
    this.lastUpdate = parseJSON(lastUpdated);

    this.mainInformationData.push({
      description: 'Total de Casos',
      smallDescription: 'Total',
      title: totalConfirmed,
      type: 'warning',
    });

    this.mainInformationData.push({
      description: 'Total de Casos Ativos',
      smallDescription: 'Ativos',
      title: totalConfirmed - (totalRecovered + totalDeaths),
      type: 'info',
    });

    this.mainInformationData.push({
      description: 'Total de Recuperações',
      smallDescription: 'Recuperações',
      title: totalRecovered,
      type: 'success',
    });

    this.mainInformationData.push({
      description: 'Total de Mortes',
      smallDescription: 'Mortes',
      title: totalDeaths,
      type: 'danger',
    });
  }
}
