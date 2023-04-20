import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiPokemonService {

  constructor(public http: HttpClient) { }

  public getFullData(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + 'pokemon');
  }

  public getPokemonDataByName(name: string) {
    return this.http.get<any>(environment.apiUrl + 'pokemon' + '/' + name);
  }
}

