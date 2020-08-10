import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>
  {
    debugger;
    return this.httpClient.get<Country[]>("api/countries", {responseType : "json"});
    
   /*  return [
      new Country(1,"India"),
      new Country(2,"UK"),
      new Country(3,"USA"),
      new Country(4,"Japan")
    ]; */
  }
}
