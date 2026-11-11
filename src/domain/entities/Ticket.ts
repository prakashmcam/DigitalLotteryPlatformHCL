import type { DrawId } from '../value-objects/DrawId';

export type TicketStatus = 'Upcoming' | 'Drawn' | 'No prize';

export interface Ticket {
  readonly id: string;
  readonly drawId: DrawId;
  readonly drawName: string;
  readonly drawDate: string;
  readonly numbers: readonly number[];
  readonly bonus: number | null;
  readonly status: TicketStatus;
}

export interface DemoSelection {
  readonly drawId: DrawId;
  readonly numbers: readonly number[];
  readonly bonus: number | null;
  readonly priceCents: number;
  readonly notice: 'Demo only — no ticket is created, purchased, or reserved.';
}
