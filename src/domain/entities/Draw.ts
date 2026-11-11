import type { DrawId } from '../value-objects/DrawId';

export type DrawStatus = 'featured' | 'open';

export interface DrawRules {
  readonly mainCount: number;
  readonly mainMax: number;
  readonly bonusMax: number | null;
}

export interface Draw {
  readonly id: DrawId;
  readonly name: string;
  readonly jackpot: string;
  readonly schedule: string;
  readonly closesIn: string | null;
  readonly status: DrawStatus;
  readonly summary: string;
  readonly rules: DrawRules;
  readonly ticketPriceCents: number;
}
