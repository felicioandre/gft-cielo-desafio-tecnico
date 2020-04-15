import { Injectable } from '@angular/core';
import { Constants } from 'src/app/enums/constants.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public getData(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
}
