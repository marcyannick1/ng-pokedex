import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private favoritesKey = 'pokemonFavorites';

  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 100): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}`);
  }

  getPokemonDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getPokemonDetailsByUrl(url: string): Observable<any> {
    return this.http.get(url);
  }

  getFavorites(): any[] {
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(pokemon: any): void {
    const favorites = this.getFavorites();
    favorites.push(pokemon);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  removeFavorite(pokemon: any): void {
    let favorites = this.getFavorites();
    favorites = favorites.filter(fav => fav.id !== pokemon.id);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  isFavorite(pokemon: any): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.id === pokemon.id);
  }
}
