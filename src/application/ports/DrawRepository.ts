import type { Draw } from '../../domain/entities/Draw';
import type { DrawId } from '../../domain/value-objects/DrawId';

export interface DrawRepository {
  list(): Promise<readonly Draw[]>;
  getById(id: DrawId): Promise<Draw | null>;
}
