import type { Draw } from '../domain/entities/Draw';
import type { DrawResult } from '../domain/entities/DrawResult';
import type { DemoSelection, Ticket } from '../domain/entities/Ticket';
import type { DrawId } from '../domain/value-objects/DrawId';

export interface ApiClient {
  listDraws(): Promise<readonly Draw[]>;
  getDraw(id: DrawId): Promise<Draw | null>;
  listResults(): Promise<readonly DrawResult[]>;
  listTickets(): Promise<readonly Ticket[]>;
  previewSelection(input: {
    readonly drawId: DrawId;
    readonly numbers: readonly number[];
    readonly bonus: number | null;
  }): Promise<DemoSelection | null>;
}
