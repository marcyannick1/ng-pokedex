import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import {NgForOf, NgIf} from "@angular/common";
import {PokemonCardComponent} from "../pokemon-card/pokemon-card.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

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

  constructor(private pokemonService: PokemonService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login']);
    }
    this.favorites = this.pokemonService.getFavorites();
  }

  toggleFavorite(pokemon: any): void {
    this.pokemonService.removeFavorite(pokemon);
    this.favorites = this.pokemonService.getFavorites();
  }
}
