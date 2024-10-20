import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  })
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  errorMessage: string = '';

  constructor(private pokemonService: PokemonService) {}

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
}
