import type { DrawResult } from '../../domain/entities/DrawResult';

export interface ResultRepository {
  listPublished(): Promise<readonly DrawResult[]>;
}
