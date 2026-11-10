import type { DrawRepository } from '../ports/DrawRepository';
import type { DrawId } from '../../domain/value-objects/DrawId';

export class GetDraw {
  constructor(private readonly draws: DrawRepository) {}

  execute(id: DrawId) {
    return this.draws.getById(id);
  }
}
