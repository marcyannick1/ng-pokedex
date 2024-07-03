import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { NgForOf } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonCardComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemonUrls: string[] = [];
  pokemonDetails: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemonUrls = data.results.map((pokemon: any) => pokemon.url);

      const requests = this.pokemonUrls.map(url => this.pokemonService.getPokemonDetailsByUrl(url));

      forkJoin(requests).subscribe(responses => {
        this.pokemonDetails = responses;
        console.log(this.pokemonDetails);
      });
    });
  }
}
