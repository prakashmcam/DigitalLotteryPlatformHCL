import type { TicketRepository } from '../ports/TicketRepository';

export class ListTickets {
  constructor(private readonly tickets: TicketRepository) {}

  execute() {
    return this.tickets.listSamples();
  }
}
