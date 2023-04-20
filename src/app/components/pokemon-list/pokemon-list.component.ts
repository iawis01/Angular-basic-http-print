import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfiguracionItem } from 'src/app/classes/Configuration-item';
import { environment } from 'src/environments/environment';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  listPokemon: any[] = [];
  configuracionListPokemon: any[] = [];
  configuracion!: ConfiguracionItem;
  paginasTotales = 0;
  nombreListado = "Pokemon";
  pageNumber = 1;

  constructor(public http: HttpClient, private _apiPokemonService: ApiPokemonService){
  }
  ngOnInit(): void {
   this.getConfiguracionPokemon();
    this._apiPokemonService.getFullData().subscribe(data => {
      this.listPokemon = data.results
    });

  const listPokemon$ = this._apiPokemonService.getFullData();


  console.log(listPokemon$);
  }

  cambiarPagina(page: number) {
    this.pageNumber = page;
  }

  getConfiguracionPokemon() {
    this.configuracion = { nombreColumna: "Nombre", campo: "name", tipo: "Dato", link: "", clase: "", parametro: "" };
    this.configuracionListPokemon.push(this.configuracion);

    this.configuracion = { nombreColumna: "URL", campo: "url", tipo: "Dato", link: "", clase: "", parametro: "" };
    this.configuracionListPokemon.push(this.configuracion);

    this.configuracion = { nombreColumna: "Ver detalles", campo: "", tipo: "Boton Ver", link: "/pokemon/ver/", clase: "btn btn-warning btn-sm", parametro: "name" };
    this.configuracionListPokemon.push(this.configuracion);
  }
}
