import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemon: any;
  @Output() toggleFavoriteEvent = new EventEmitter<any>();
  isFavorite: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.isFavorite = this.pokemonService.isFavorite(this.pokemon);
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.toggleFavoriteEvent.emit(this.pokemon);
  }
}
