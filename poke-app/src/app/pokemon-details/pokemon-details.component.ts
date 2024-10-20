import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class PokemonDetailsComponent implements OnInit {
  pokemonDetails: any;
  errorMessage: string = '';
  movesLimit: number = 10;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

ngOnInit(): void {
  const url = this.route.snapshot.queryParamMap.get('url');
  if (url) {
    this.pokemonService.getPokemonDetailsByUrl(url).subscribe(
      (response: any) => {
        console.log('Szczegóły Pokemona:', response);
        this.pokemonDetails = response;
      },
      (error) => {
        console.error('Błąd podczas pobierania szczegółów Pokemona:', error);
        this.errorMessage = `Nie znaleziono danych dla podanego URL.`;
      }
    );
  } else {
    this.errorMessage = 'Brak URL do pobrania danych Pokemona.';
  }
}


  getSprites(): { name: string; url: string }[] {
    const sprites = this.pokemonDetails.sprites;
    const spriteUrls: { name: string; url: string }[] = [];

    // Główne sprite'y
    for (const key in sprites) {
      if (
        sprites.hasOwnProperty(key) &&
        typeof sprites[key] === 'string' &&
        sprites[key]
      ) {
        spriteUrls.push({ name: key, url: sprites[key] });
      }
    }

    // Dodatkowe sprite'y w 'other'
    if (sprites.other) {
      for (const category in sprites.other) {
        if (sprites.other.hasOwnProperty(category)) {
          const sprite = sprites.other[category];
          for (const key in sprite) {
            if (sprite.hasOwnProperty(key) && sprite[key]) {
              spriteUrls.push({ name: `${category} ${key}`, url: sprite[key] });
            }
          }
        }
      }
    }

    return spriteUrls;
  }

  showAllMoves(): void {
    this.movesLimit = this.pokemonDetails.moves.length;
  }
}
