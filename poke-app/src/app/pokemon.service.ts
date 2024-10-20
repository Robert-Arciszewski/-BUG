import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Pobieranie listy Pokemonów (limit do 150)
  getPokemonList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon?limit=150`);
  }

  // Pobieranie szczegółów dla danego Pokemona
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }
}
