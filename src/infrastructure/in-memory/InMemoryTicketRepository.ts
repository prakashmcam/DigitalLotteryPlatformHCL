import type { TicketRepository } from '../../application/ports/TicketRepository';
import type { Ticket } from '../../domain/entities/Ticket';

export class InMemoryTicketRepository implements TicketRepository {
  constructor(private readonly records: readonly Ticket[]) {}

  async listSamples() {
    return this.records;
  }
}
