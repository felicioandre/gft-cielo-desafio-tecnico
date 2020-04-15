import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data/data.service';
import { ICard } from './interfaces/ICard';
import { parseJSON } from 'date-fns'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public mainInformationData: ICard[] = [];
  public lastUpdate: Date = new Date()
  constructor(private dataServ: DataService) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.dataServ.getMainInformation().subscribe((ret) => {
      // console.log({ ret });
      this.manipulateData(ret);
    });
  }

  private manipulateData(data) {
    this.mainInformationData = [];

    const { totalConfirmed, totalDeaths, totalRecovered, lastUpdated } = data;

    this.lastUpdate = parseJSON(lastUpdated)

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
