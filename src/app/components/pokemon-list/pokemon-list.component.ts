import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfiguracionItem } from 'src/app/classes/Configuration-item';
import { environment } from 'src/environments/environment';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  listPokemon: any[] = [];
  configuracionListPokemon: any[] = [];
  configuracion!: ConfiguracionItem;
  paginasTotales = 0;
  nombreListado = 'Pokemon';
  pageNumber = 1;
  dataPokemon: any;
  //listPokemon$!: Subscription;


  constructor(
    public http: HttpClient,
    private _apiPokemonService: ApiPokemonService,
    private _utilitiesService: UtilitiesService
  ) {}
  ngOnInit(): void {
    this.getConfiguracionPokemon();
    this.getPokemonsFunction(this.pageNumber);
  }

  cambiarPagina(page: number) {
    this.pageNumber = page;
    this.getPokemonsFunction(this.pageNumber);
  }

  getPokemonsFunction(page: number) {
    this._apiPokemonService.getPaginatedData(page).subscribe(data => {
      this.listPokemon = data.results;
      this.getPaginasTotales(data);
    });

  }

  getPaginasTotales(data: any){
    this.paginasTotales = this._utilitiesService.roundPagination(data);
    console.log(this.paginasTotales);
  }

  getConfiguracionPokemon() {
    this.configuracion = {
      nombreColumna: 'Nombre',
      campo: 'name',
      tipo: 'Dato',
      link: '',
      clase: '',
      parametro: '',
    };
    this.configuracionListPokemon.push(this.configuracion);

    this.configuracion = {
      nombreColumna: 'URL',
      campo: 'url',
      tipo: 'Dato',
      link: '',
      clase: '',
      parametro: '',
    };
    this.configuracionListPokemon.push(this.configuracion);

    this.configuracion = {
      nombreColumna: 'Ver detalles',
      campo: '',
      tipo: 'Boton Ver',
      link: '/pokemon/ver/',
      clase: 'btn btn-warning btn-sm',
      parametro: 'name',
    };
    this.configuracionListPokemon.push(this.configuracion);
  }
}
