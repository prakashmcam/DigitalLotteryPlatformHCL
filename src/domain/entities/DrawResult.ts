import type { DrawId } from '../value-objects/DrawId';

export interface DrawResult {
  readonly id: string;
  readonly drawId: DrawId;
  readonly drawName: string;
  readonly date: string;
  readonly isoDate: string;
  readonly numbers: readonly number[];
  readonly bonus: number | null;
  readonly status: 'Published';
}
