import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Pobieranie listy Pokemonów
  getPokemonList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon?limit=10`);
  }

  // Pobieranie szczegółów konkretnego Pokemona
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${name}`);
  }
}
