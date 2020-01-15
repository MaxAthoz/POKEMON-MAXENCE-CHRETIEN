import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {MatListModule} from '@angular/material/list';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {AppRoutingModule} from '../app-routing.module';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSidenavModule} from '@angular/material';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PokedexComponent } from './pokedex/pokedex.component';
import {FormsModule} from '@angular/forms';




@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent],
  imports: [
    CommonModule,
    MatListModule,
    AppRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class PokemonsModule { }
