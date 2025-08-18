// src/app/core/score-reporter/score-reporter.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SCORE_REPORTER_CONFIG } from './score-reporter.config';

interface BrugerDto {
  id: number;
  brugernavn: string;
}

interface ScoreCreateDto {
  brugerId: number;
  spilId: number;
  point: number;
  dato: string; 
}

@Injectable({ providedIn: 'root' })
export class ScoreReporterService {
  private userIdCache: number | null = null;
  private cachedUsername: string | null = null; // til at opdage brugerskift

  constructor(private http: HttpClient) {}

  /**
   * Kald denne ved Game Over.
   * @param score   Spillerens score (heltal; afrundes ned)
   * @param gameKey Nøglen til det specifikke spil i config, fx 'unitygame2'
   */
  async report(score: number, gameKey: string): Promise<void> {
    const game = SCORE_REPORTER_CONFIG.games?.[gameKey];
    if (!game) {
      throw new Error(`Ukendt gameKey '${gameKey}'. Tjek SCORE_REPORTER_CONFIG.games.`);
    }

    const brugerId = await this.resolveUserId();
    const payload: ScoreCreateDto = {
      brugerId,
      spilId: game.spilId,
      point: Math.max(0, Math.floor(score)),
      dato: new Date().toISOString(), // kan erstattes af servertid på serveren
    };

    await firstValueFrom(
      this.http.post(`${SCORE_REPORTER_CONFIG.apiBase}/scores`, payload)
    );
  }

  /** Kan kaldes ved logout for at tømme cachen manuelt. */
  clearUserCache(): void {
    this.userIdCache = null;
    this.cachedUsername = null;
  }

  /** Slår brugerId op robust ud fra username i localStorage – håndterer dubletter og brugerskift. */
  private async resolveUserId(): Promise<number> {
    const usernameKey = SCORE_REPORTER_CONFIG.usernameKey ?? 'username';
    const raw = (typeof window !== 'undefined') ? localStorage.getItem(usernameKey) : null;
    const username = (raw ?? '').trim();

    if (!username) {
      this.clearUserCache();
      throw new Error(`Mangler brugernavn i localStorage ('${usernameKey}')`);
    }

    // Hvis brugernavn har ændret sig siden sidst, nulstil cache
    if (this.cachedUsername === null || this.cachedUsername !== username) {
      this.userIdCache = null;
      this.cachedUsername = username;
    }

    if (this.userIdCache) return this.userIdCache;

    // Hent brugere og find match på brugernavn
    const brugere = await firstValueFrom(
      this.http.get<BrugerDto[]>(`${SCORE_REPORTER_CONFIG.apiBase}/brugere`)
    );

    const unameLower = username.toLowerCase();

    // Case-insensitiv filtrering
    const matchesInsensitive = brugere.filter(
      b => (b.brugernavn ?? '').toLowerCase() === unameLower
    );

    if (matchesInsensitive.length === 0) {
      throw new Error(`Bruger '${username}' blev ikke fundet`);
    }

    // Foretræk case-sensitivt eksakt match, hvis der er flere
    const matchesSensitive = matchesInsensitive.filter(
      b => (b.brugernavn ?? '') === username
    );

    // Vælg laveste id blandt de bedste matches
    const pickFrom = (matchesSensitive.length > 0) ? matchesSensitive : matchesInsensitive;
    const chosen = pickFrom.reduce((min, cur) => (cur.id < min.id ? cur : min), pickFrom[0]);

    this.userIdCache = chosen.id;
    return this.userIdCache;
  }
}
