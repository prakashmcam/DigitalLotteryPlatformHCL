import type { ResultRepository } from '../ports/ResultRepository';

export class ListResults {
  constructor(private readonly results: ResultRepository) {}

  execute() {
    return this.results.listPublished();
  }
}
