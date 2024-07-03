import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PokemonCardComponent} from "../pokemon-card/pokemon-card.component";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    PokemonCardComponent,
    NgOptimizedImage
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit{
  pokemon!: any;
  ngOnInit(): void {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login']);
    }
    this.getPokemonDetails();
  }
  private getPokemonDetails() {
    const pokemonId = this.route.snapshot.params['id'];
    this.pokemonService.getPokemonDetails(pokemonId).subscribe((data: any) => {
      this.pokemon = data;
    })
  }
  constructor(private pokemonService: PokemonService,
              private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  protected readonly console = console;
}
