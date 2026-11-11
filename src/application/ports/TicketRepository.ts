import type { Ticket } from '../../domain/entities/Ticket';

export interface TicketRepository {
  listSamples(): Promise<readonly Ticket[]>;
}
