import { Injectable } from '@angular/core';
import { Constants } from '../../enums/constants.enum';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class DataService {
  private bingApiUrl: string;
  private covid19ApiUrl: string;
  
  constructor(private httpClient: HttpClient) {
    
    this.bingApiUrl = Constants.BING_API_URL;
    this.covid19ApiUrl = Constants.COVID19_API_URL;

    // if(!environment.production){
      this.bingApiUrl = 'http://cors-anywhere.herokuapp.com/' + this.bingApiUrl;
      this.covid19ApiUrl = 'http://cors-anywhere.herokuapp.com/' + this.covid19ApiUrl;
    // }
  }

  public getMainInformation(): Observable<any>{
    const ret = this.httpClient.get(this.bingApiUrl)
    return ret;
  }
}
