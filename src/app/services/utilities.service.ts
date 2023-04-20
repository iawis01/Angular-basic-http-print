import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  roundPagination(data: any): number{
    return Math.ceil(data.count / 10);
  }
}
