import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import {NgForOf, NgIf} from '@angular/common';
import { forkJoin } from 'rxjs';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonCardComponent, NgForOf, FormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemonUrls: string[] = [];
  pokemonDetails: any[] = [];
  filteredPokemonDetails: any[] = [];
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login']);
    }
    this.pokemonService.getPokemons().subscribe((data: any) => {
      this.pokemonUrls = data.results.map((pokemon: any) => pokemon.url);

      const requests = this.pokemonUrls.map(url => this.pokemonService.getPokemonDetailsByUrl(url));

      forkJoin(requests).subscribe(responses => {
        this.pokemonDetails = responses;
        this.filteredPokemonDetails = responses;
        console.log(this.pokemonDetails);
      });
    });
  }

  filterPokemons(): void {
    this.filteredPokemonDetails = this.pokemonDetails.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleFavorite(pokemon: any): void {
    if (this.pokemonService.isFavorite(pokemon)) {
      this.pokemonService.removeFavorite(pokemon);
    } else {
      this.pokemonService.addFavorite(pokemon);
    }
  }
}
