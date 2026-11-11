import { describe, expect, it } from 'vitest';
import { sampleDraws, sampleResults, sampleTickets } from '../../infrastructure/in-memory/sampleData';

describe('demo repositories data contract', () => {
  it('keeps the approved draw, result, and ticket records available', () => {
    expect(sampleDraws.map(({ name, jackpot, schedule }) => [name, jackpot, schedule])).toEqual([
      ['Grand Jackpot', '$18.4M', 'Tonight · 9:00 PM'],
      ['Daily Six', '$640K', 'Today · 7:30 PM'],
      ['Weekend Millions', '$5.2M', 'Saturday · 8:00 PM'],
    ]);
    expect(sampleResults[0]?.numbers).toEqual([4, 11, 19, 26, 33, 40]);
    expect(sampleTickets.map(({ id }) => id)).toEqual(['TK-2048', 'TK-2031', 'TK-1994']);
  });
});
