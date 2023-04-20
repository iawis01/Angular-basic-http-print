import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {
  pageLimit: any;
  constructor(public http: HttpClient) {
    this.pageLimit = 20; }

  public getFullData(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'pokemon');
  }

  public getPokemonDataByName(name: string) {
    return this.http.get<any>(environment.apiUrl + 'pokemon' + '/' + name);
  }

  public getPaginatedData(page: number): Observable<any> {
    const offset = ((page-1) * this.pageLimit) +1;
    return this.http.get<any>(environment.apiUrl + 'pokemon?limit=' + this.pageLimit + '&offset=' + offset);
  }
}

