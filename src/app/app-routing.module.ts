import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { VerPokemonComponent } from './components/ver-pokemon/ver-pokemon.component';

const routes: Routes = [
  {
    // route => /home/language
    path: 'home',
    component: MainPageComponent,
  },
  {
    //pokemon/ver/bulbasur
    path: 'pokemon/ver/:name',
    component: VerPokemonComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
