import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../models/pokemon.model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location: Location) {
    this.pokemonService = pokemonService;
  }


  ngOnInit() {
    if (this.pokemonService.selectedPokemon) {
      this.getPokemonSelected(this.pokemonService.selectedPokemon.id);
    }
  }

  getPokemonSelected(id: number) {
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

  getPokemon() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

  getPokemonById(id) {
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }


  play(playSong: HTMLAudioElement) {
    playSong.play();
  }

}
