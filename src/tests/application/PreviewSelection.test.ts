import { describe, expect, it } from 'vitest';
import { PreviewSelection } from '../../application/use-cases/PreviewSelection';
import { drawId } from '../../domain/value-objects/DrawId';
import { InMemoryDrawRepository } from '../../infrastructure/in-memory/InMemoryDrawRepository';
import { sampleDraws } from '../../infrastructure/in-memory/sampleData';

describe('PreviewSelection', () => {
  const useCase = new PreviewSelection(new InMemoryDrawRepository(sampleDraws));

  it('returns a sorted, clearly non-transactional preview without persisting it', async () => {
    const result = await useCase.execute({
      drawId: drawId('grand-jackpot'),
      numbers: [39, 7, 31, 16, 22],
      bonus: 12,
    });
    expect(result.numbers).toEqual([7, 16, 22, 31, 39]);
    expect(result.priceCents).toBe(200);
    expect(result.notice).toContain('no ticket is created');
  });

  it('rejects invalid numbers and unknown draws', async () => {
    await expect(useCase.execute({ drawId: drawId('daily-six'), numbers: [3], bonus: null })).rejects.toThrow('Choose exactly 6 main numbers.');
    await expect(useCase.execute({ drawId: drawId('missing'), numbers: [], bonus: null })).rejects.toThrow('not available');
  });
});
