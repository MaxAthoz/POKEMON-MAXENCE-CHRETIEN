import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../models/pokemon.model';
import {PokemonService} from '../../services/pokemon.service';
import {PagedData} from '../models/paged-data.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[];
  nbPokemon = 0;
  limit = 20;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService = pokemonService;
  }

  onScroll() {
    this.pokemonService.getPokemons(this.nbPokemon, this.limit).subscribe(
      myPokemon => this.pokemons = this.pokemons.concat(myPokemon.data)
    );
    this.nbPokemon += this.limit;
  }

  ngOnInit() {
    this.nbPokemon = 0;
    this.limit = 20;
    this.pokemonService.getPokemons(this.nbPokemon, this.limit).subscribe(myPokemon => this.pokemons = myPokemon.data);
    this.nbPokemon += this.limit;
  }

  searching(mystring: string) {
    if (mystring) {
      this.pokemonService.getPokemonSearch(mystring).subscribe(myPokemon => this.pokemons = myPokemon.data);
    } else {
      this.ngOnInit();
    }
  }

  setSelectedPokemon(pokemon: Pokemon) {
    this.pokemonService.selectedPokemon = pokemon;
  }
}
