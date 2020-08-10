import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location';

@Injectable({
  providedIn: 'root'
})
export class ClientLcationsService {

  constructor(private httpClient: HttpClient) 
  { 

  }
  getClientLocations(): Observable<ClientLocation[]>
  {
    debugger;
    return this.httpClient.get<ClientLocation[]>("api/clientlocations", {responseType : "json"});
  }
}
