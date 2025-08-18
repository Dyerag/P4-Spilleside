import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScoreReporterService } from '../../core/score-reporter/score-reporter.service';



@Component({
  selector: 'app-game-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-viewer.html',
  styleUrls: ['./game-viewer.css']
})
export class GameViewerComponent implements OnInit {
  folderName: string = '';
  gameName: string = '';
  safeUrl?: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    //  TILFØJET: inject servicen
    private scoreReporter: ScoreReporterService
  ) {}

  ngOnInit(): void {
    this.folderName = this.route.snapshot.paramMap.get('folder') || '';
    this.gameName = this.route.snapshot.queryParamMap.get('name') || 'Ukendt spil';
    console.log('folderName:', this.folderName);
  
    if (this.folderName) {
      const url = `/assets/${this.folderName}/index.html`;
      console.log('iframe URL:', url);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      console.warn('folderName er tom!');
    }
  }

  //  TILFØJET: lyt efter beskeder fra spillet (iframe -> window.postMessage)
  @HostListener('window:message', ['$event'])
  async onGameMessage(event: MessageEvent) {
    // Basal sikkerhed: accepter kun samme origin
    if (event.origin !== window.location.origin) return;

    const data = event.data;
    let score: number | null = null;

    // Understøt både { type:'GAME_OVER', score } og bare { score }
    if (data && typeof data === 'object') {
      if (typeof (data as any).score === 'number') {
        score = (data as any).score;
      } else if ((data as any).type === 'GAME_OVER' && typeof (data as any).value === 'number') {
        score = (data as any).value;
      }
    } else if (typeof data === 'number') {
      // Fallback: hvis spil bare poster et tal
      score = data;
    }

    if (score == null) return;

    try {
      // Brug mappenavnet som key til config (fx 'unitygame2')
      const gameKey = (this.folderName || '').toLowerCase();
      await this.scoreReporter.report(score, gameKey);
      console.log('Score gemt for', gameKey, '→', score);
    } catch (err) {
      console.error('Kunne ikke gemme score:', err);
    }
  }
}