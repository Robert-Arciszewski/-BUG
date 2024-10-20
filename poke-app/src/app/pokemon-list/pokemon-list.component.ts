import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  errorMessage: string = '';
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemonList().subscribe(
      (response: any) => {
        console.log('Odpowiedź z API:', response);
        this.pokemonList = response.results;
      },
      (error) => {
        console.error('Błąd podczas pobierania danych z API:', error);
        this.errorMessage = 'Wystąpił błąd podczas pobierania danych z API.';
      }
    );
  }

  searchPokemon(): void {
    if (this.searchTerm.trim()) {
      const url = `${this.pokemonService.apiUrl}/pokemon/${this.searchTerm.toLowerCase()}`;
      this.router.navigate(['/pokemon-details'], { queryParams: { url } });
    }
  }

  // Nowa metoda do pobierania obrazka Pokemona
  getPokemonImage(url: string): string {
    const id = url.split('/').filter((x) => x).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
