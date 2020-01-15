import {Component, OnInit} from '@angular/core';
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
  pokemons: PagedData<Pokemon>;

  constructor(private pokemonService: PokemonService) {
  }

  onScroll() {
    console.log('cc');
  }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe(myPokemon => this.pokemons = myPokemon);
  }
}
