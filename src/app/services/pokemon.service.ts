import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Pokemon} from '../pokemons/models/pokemon.model';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PagedData} from '../pokemons/models/paged-data.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonsUrl = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getPokemons(): Observable<PagedData<Pokemon>> {
    return this.http.get<PagedData<Pokemon>>(this.pokemonsUrl).pipe(
      catchError(this.handleError<PagedData<Pokemon>>('getPokemons'))
    );
  }

  getPokemon(id: number): Observable<Pokemon> {
    const url: string = this.pokemonsUrl + '/' + id;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>('getPokemon id=${id}'))
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
