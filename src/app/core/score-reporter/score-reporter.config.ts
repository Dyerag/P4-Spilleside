// src/app/core/score-reporter/score-reporter.config.ts

export interface GameEntry {
  spilId: number;
  navn: string;
}

export const SCORE_REPORTER_CONFIG = {
  apiBase: 'http://localhost:5176/api',

  /** Nøglen i localStorage hvor brugernavnet ligger */
  usernameKey: 'username',

  /** Registrer alle spil her (key bruges i report(score, 'key')) */
  games: {
    unitygame1: { spilId: 1, navn: 'unitygame1' } as GameEntry,
    unitygame2: { spilId: 1002, navn: 'spil2' } as GameEntry,
    // Tilføj flere spil her:
    // myOtherGame: { spilId: 3, navn: 'myOtherGame' },
  } as Record<string, GameEntry>,
} as const;

/** Hjælp-type: gyldige keys til report(score, gameKey) */
export type GameKey = keyof typeof SCORE_REPORTER_CONFIG.games;
