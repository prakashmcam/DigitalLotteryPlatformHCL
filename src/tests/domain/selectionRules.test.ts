import { describe, expect, it } from 'vitest';
import { validateSelection } from '../../domain/rules/selectionRules';
import { sampleDraws } from '../../infrastructure/in-memory/sampleData';

describe('validateSelection', () => {
  it('accepts a complete Grand Jackpot selection in range', () => {
    const draw = sampleDraws[0];
    expect(draw).toBeDefined();
    expect(validateSelection(draw!.rules, { main: [7, 16, 22, 31, 39], bonus: 12 })).toEqual([]);
  });

  it('rejects duplicate numbers, incomplete selections, and an out-of-range bonus', () => {
    const draw = sampleDraws[0];
    expect(draw).toBeDefined();
    expect(validateSelection(draw!.rules, { main: [4, 4], bonus: 19 })).toEqual([
      'Choose exactly 5 main numbers.',
      'Main numbers must be unique.',
      'Bonus number must be between 1 and 18.',
    ]);
  });

  it('does not allow bonus values on Daily Six', () => {
    const dailySix = sampleDraws[1];
    expect(dailySix).toBeDefined();
    expect(validateSelection(dailySix!.rules, { main: [4, 11, 19, 26, 33, 40], bonus: 1 })).toContain('This draw does not have a bonus number.');
  });
});
