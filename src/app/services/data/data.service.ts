import { Injectable } from '@angular/core';
import { parseJSON } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { Constants } from '../../enums/constants.enum';
import { IChart } from '../../interfaces/IChart';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private bingApiUrl: string;
  private covid19ApiUrl: string;

  constructor(private httpServ: HttpService) {
    this.covid19ApiUrl = Constants.COVID19_API_URL;

    this.bingApiUrl =
      'https://cors-anywhere.herokuapp.com/' + Constants.BING_API_URL;

    
  }

  public getMainInformation(): Observable<any> {
    const ret = this.httpServ.getData(this.bingApiUrl);
    return ret;
  }

  public getInformationFromCountry(country: string): Promise<IChart> {
    return new Promise((resolve, reject) => {
      this.httpServ
        .getData(this.covid19ApiUrl + `country/${country}`)
        .subscribe((data: any[]) => {
          const labels: Label[] = [];
          const deathValues: ChartDataSets = {
            data: [],
            label: 'Mortes',
            backgroundColor: 'rgba(235, 69, 89,0.2)',
            borderColor: 'rgba(235, 69, 89,1)',
            pointBackgroundColor: 'rgba(235, 69, 89,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(235, 69, 89,0.8)',
          };
          const confirmedValues: ChartDataSets = {
            data: [],
            label: 'Confirmados',
            backgroundColor: 'rgba(0, 188, 212,0.2)',
            borderColor: 'rgba(0, 188, 212,1)',
            pointBackgroundColor: 'rgba(0, 188, 212,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 188, 212,0.8)',
          };
          const recoveredValues: ChartDataSets = {
            data: [],
            label: 'Recuperados',
            backgroundColor: 'rgba(76, 211, 194,0.2)',
            borderColor: 'rgba(76, 211, 194,1)',
            pointBackgroundColor: 'rgba(76, 211, 194,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(76, 211, 194,0.8)',
          };

          const values = data.length > 10 ? data.slice(data.length - 10) : data;

          values.forEach((val) => {
            // labels
            const date = utcToZonedTime(val.Date, '');
            labels.push(format(date, 'dd/MM'));

            deathValues.data.push(val.Deaths);
            confirmedValues.data.push(val.Confirmed);
            recoveredValues.data.push(val.Recovered);
          });

          const chartData: IChart = {
            data: [deathValues, confirmedValues, recoveredValues],
            labels,
          };
          resolve(chartData);
        });
    });
  }

}
