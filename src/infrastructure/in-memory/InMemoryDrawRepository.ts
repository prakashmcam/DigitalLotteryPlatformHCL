import type { DrawRepository } from '../../application/ports/DrawRepository';
import type { Draw } from '../../domain/entities/Draw';
import type { DrawId } from '../../domain/value-objects/DrawId';

export class InMemoryDrawRepository implements DrawRepository {
  constructor(private readonly records: readonly Draw[]) {}

  async list() {
    return this.records;
  }

  async getById(id: DrawId) {
    return this.records.find((draw) => draw.id === id) ?? null;
  }
}
