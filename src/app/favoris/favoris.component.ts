import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import {NgForOf, NgIf} from "@angular/common";
import {PokemonCardComponent} from "../pokemon-card/pokemon-card.component";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-favorites',
  templateUrl: './favoris.component.html',
  standalone: true,
  imports: [
    NgForOf,
    PokemonCardComponent,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit {
  favorites: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.favorites = this.pokemonService.getFavorites();
  }

  toggleFavorite(pokemon: any): void {
    this.pokemonService.removeFavorite(pokemon);
    this.favorites = this.pokemonService.getFavorites();
  }
}
