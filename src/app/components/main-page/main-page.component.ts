import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  listData: any[] = [];
  searchNombrePokemon: string = '';

  constructor() {

  }



  filteredData(searchTerm: string) {
    // Resetear la busqueda al borrar caracter
    if (this.searchNombrePokemon.length > searchTerm.length) {
      this.listData = this.filterData(searchTerm);
    }
    this.searchNombrePokemon = searchTerm;
    if (searchTerm) {
      this.listData = this.filterData(searchTerm);
    }
  }

  filterData(searchTerm: string) {
    return this.listData.filter(
      (pokemom) =>
        pokemom.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        pokemom.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }
}
