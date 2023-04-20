import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiPokemonService } from 'src/app/services/api-pokemon.service';

@Component({
  selector: 'app-ver-pokemon',
  templateUrl: './ver-pokemon.component.html',
  styleUrls: ['./ver-pokemon.component.css'],
})
export class VerPokemonComponent implements OnInit {
  name: string;
  pokemon: any | undefined;
  loading = true;
  img = '';
  public title: string = 'DETALLE DEL POKEMON CON EL NOMBRE : ';

  constructor(
    private aRoute: ActivatedRoute, private _apiPokemonService: ApiPokemonService) {
    this.name = this.aRoute.snapshot.paramMap.get('name')!;
    this.title = this.title + this.name;
    console.log(this.name);
  }
  ngOnInit(): void {
    this._apiPokemonService.getPokemonDataByName(this.name).subscribe(data => {
      console.log(data)
      this.pokemon = data
    });
  }
}
