import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html', // POPRAWNE
  styleUrls: ['./pokemon-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class PokemonDetailsComponent implements OnInit { // POPRAWNE
  pokemonDetails: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe(
        (response: any) => {
          console.log('Szczegóły Pokemona:', response);
          this.pokemonDetails = response;
        },
        (error) => {
          console.error('Błąd podczas pobierania szczegółów Pokemona:', error);
          this.errorMessage =
            'Wystąpił błąd podczas pobierania szczegółów Pokemona.';
        }
      );
    }
  }
}
