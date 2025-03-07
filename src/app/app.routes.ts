import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FavorisComponent} from "./favoris/favoris.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'favoris', component: FavorisComponent },
];
