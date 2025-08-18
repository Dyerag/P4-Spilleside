import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list';
import { GameViewerComponent } from './game-viewer/game-viewer';


const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'view/:folder', component: GameViewerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {}
