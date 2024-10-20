import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    console.log('PokemonListComponent załadowany');  // Log do konsoli

    this.pokemonService.getPokemonList().subscribe(
      (response: any) => {
        console.log('Odpowiedź z API:', response);
        this.pokemonList = response.results;
      },
      (error) => {
        console.error('Błąd podczas pobierania danych z API:', error);
      }
    );
  }
}
