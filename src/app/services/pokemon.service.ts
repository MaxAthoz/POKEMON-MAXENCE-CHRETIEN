import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Pokemon} from '../pokemons/models/pokemon.model';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PagedData} from '../pokemons/models/paged-data.model';
import {FormGroup} from '@angular/forms';
import {Token} from '@angular/compiler';
import {TokenPokemon} from '../pokemons/models/token';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonsUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  selectedPokemon: Pokemon;

  constructor(private http: HttpClient) {
  }

  getPokemons(offset, limit): Observable<PagedData<Pokemon>> {
    const url: string = this.pokemonsUrl + '/pokemons';
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<PagedData<Pokemon>>(url, {params}).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url: string = this.pokemonsUrl + '/pokemons/' + id;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>('getPokemon id=${id}'))
    );
  }

  getPokemonSearch(recherche: string): Observable<PagedData<Pokemon>> {
    const url: string = this.pokemonsUrl + '/pokemons?search=' + recherche;
    return this.http.get<PagedData<Pokemon>>(url).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemonSearch'))
    );
  }

  login(data: FormGroup): Observable<TokenPokemon> {
    const url: string = this.pokemonsUrl + '/auth/login';
    return this.http.post<TokenPokemon>(url, data).pipe(
      catchError(this.handleError<TokenPokemon>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
