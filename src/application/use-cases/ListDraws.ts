import type { DrawRepository } from '../ports/DrawRepository';

export class ListDraws {
  constructor(private readonly draws: DrawRepository) {}

  execute() {
    return this.draws.list();
  }
}
