import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Game {
  name: string;
  folder: string| null;
  icon: string | null;
}

@Component({
  selector: 'app-game-list',
  imports: [CommonModule, RouterModule, ],
  templateUrl: './game-list.html',
  styleUrls: ['./game-list.css']
})
export class GameListComponent  {
  // constructor(private router: Router, private http: HttpClient) {}
  constructor(private router: Router) {}
  
   //games = new Array(7).fill(null); // Midlertidigt placeholder array
  games: Game[] = [
    { name: 'Flappy-Bird', folder: 'Flappy Bird WebGL', icon: 'Flappy thumbnail.png' },
    {
      name: 'spil2', folder: 'unitygame2', icon: null
    },
  ];

  // navigateToGame(game: Game): void {
  // this.router.navigate(['/games/view', game.folder]);
  navigateToGame(game: Game): void {
  if (game.folder && game.folder.trim()) {
    this.router.navigate(['/games/view', game.folder], { queryParams: { name: game.name }});}
  }
}


