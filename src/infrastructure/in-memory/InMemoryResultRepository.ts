import type { ResultRepository } from '../../application/ports/ResultRepository';
import type { DrawResult } from '../../domain/entities/DrawResult';

export class InMemoryResultRepository implements ResultRepository {
  constructor(private readonly records: readonly DrawResult[]) {}

  async listPublished() {
    return this.records;
  }
}
