import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

interface Spil {
  spilId: number;
  navn: string;
}

interface Score {
  scoreId: number;
  brugerId: number;
  brugernavn: string;   
  spilId: number;
  spilnavn?: string;
  point: number;
  dato: string;
}

@Component({
  selector: 'app-score-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './score-list.html',
  styleUrls: ['./score-list.css']
})
export class ScoreListComponent implements OnInit {

  spilListe: Spil[] = [];
  alleScores: Score[] = [];   // rå data fra API
  scores: Score[] = [];       // viste scores (filtreret)
  valgtSpilId: number | null = null;

  visning: 'bruger' | 'global' = 'global';  // standard: global
  private readonly apiBase = 'http://localhost:5176/api';
  private readonly usernameKey = 'username';
  private currentUsername: string | null = null;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    // Læs brugernavn fra localStorage (trim + tjek tom streng)
    const raw = (typeof window !== 'undefined') ? localStorage.getItem(this.usernameKey) : null;
    const uname = (raw ?? '').trim();
    this.currentUsername = uname.length > 0 ? uname : null;

    // Hent spil til dropdown
    this.http.get<Spil[]>(`${this.apiBase}/spil`).subscribe({
      next: (data) => {
        this.spilListe = [...(data ?? [])];
        this.valgtSpilId = null;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Fejl ved hentning af spil', err)
    });
  }

  // Kaldes når du trykker "Hent" efter at have valgt et spil
  hentScores() {
    this.http.get<Score[]>(`${this.apiBase}/scores`).subscribe({
      next: (data) => {
        this.alleScores = data ?? [];
        this.anvendFiltre();
      },
      error: (err) => console.error('Fejl ved hentning af scores', err)
    });
  }

  // Skift mellem 'bruger' og 'global'
  setVisning(mode: 'bruger' | 'global') {
    this.visning = mode;
    this.anvendFiltre();
  }

  // Filtrér efter valgt spil + visning
  private anvendFiltre() {
    let list = [...this.alleScores];

    if (this.valgtSpilId !== null) {
      list = list.filter(s => s.spilId === this.valgtSpilId);
    }

    if (this.visning === 'bruger' && this.currentUsername) {
      const u = this.currentUsername.toLowerCase();
      list = list.filter(s => (s.brugernavn ?? '').toLowerCase() === u);
    }

    this.scores = list;
    this.cd.detectChanges();
  }
}