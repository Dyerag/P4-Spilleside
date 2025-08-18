import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { GameListComponent } from './games/game-list/game-list';
import { GameViewerComponent } from './games/game-viewer/game-viewer';
import { authGuard } from './core/guard/auth.guard';
import { ScoreListComponent } from './score/score-list/score-list';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'games', component: GameListComponent, canActivate: [authGuard] }, //  canActivate: [authGuard]
  { path: 'games/view/:folder', component: GameViewerComponent, canActivate: [authGuard]},
  { path: 'score-list', component: ScoreListComponent, }, 
  { path: '**', redirectTo: 'login' }
];