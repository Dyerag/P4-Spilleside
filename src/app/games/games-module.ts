import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameListComponent } from './game-list/game-list';
import { GameViewerComponent } from './game-viewer/game-viewer';
import { GamesRoutingModule } from './games-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GamesRoutingModule,     // ⬅️ vigtigt for routing
    GameListComponent,      // ⬅️ standalone komponent
    GameViewerComponent     // ⬅️ standalone komponent
  ]
})
export class GamesModule {}
