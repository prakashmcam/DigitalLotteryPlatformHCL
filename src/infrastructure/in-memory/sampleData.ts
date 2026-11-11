import type { Draw } from '../../domain/entities/Draw';
import type { DrawResult } from '../../domain/entities/DrawResult';
import type { Ticket } from '../../domain/entities/Ticket';
import { drawId } from '../../domain/value-objects/DrawId';

export const sampleDraws: readonly Draw[] = [
  {
    id: drawId('grand-jackpot'),
    name: 'Grand Jackpot',
    jackpot: '$18.4M',
    schedule: 'Tonight · 9:00 PM',
    closesIn: '02:14:36',
    status: 'featured',
    summary: 'The week’s biggest moment',
    rules: { mainCount: 5, mainMax: 48, bonusMax: 18 },
    ticketPriceCents: 200,
  },
  {
    id: drawId('daily-six'),
    name: 'Daily Six',
    jackpot: '$640K',
    schedule: 'Today · 7:30 PM',
    closesIn: null,
    status: 'open',
    summary: 'A bright spot in your day',
    rules: { mainCount: 6, mainMax: 42, bonusMax: null },
    ticketPriceCents: 100,
  },
  {
    id: drawId('weekend-millions'),
    name: 'Weekend Millions',
    jackpot: '$5.2M',
    schedule: 'Saturday · 8:00 PM',
    closesIn: null,
    status: 'open',
    summary: 'Make Saturday feel special',
    rules: { mainCount: 5, mainMax: 50, bonusMax: 20 },
    ticketPriceCents: 300,
  },
];

export const sampleResults: readonly DrawResult[] = [
  {
    id: 'result-daily-six-2026-11-08',
    drawId: drawId('daily-six'),
    drawName: 'Daily Six',
    date: 'Nov 08, 2026',
    isoDate: '2026-11-08',
    numbers: [4, 11, 19, 26, 33, 40],
    bonus: null,
    status: 'Published',
  },
  {
    id: 'result-grand-jackpot-2026-11-07',
    drawId: drawId('grand-jackpot'),
    drawName: 'Grand Jackpot',
    date: 'Nov 07, 2026',
    isoDate: '2026-11-07',
    numbers: [7, 16, 22, 31, 39],
    bonus: 12,
    status: 'Published',
  },
  {
    id: 'result-weekend-millions-2026-11-01',
    drawId: drawId('weekend-millions'),
    drawName: 'Weekend Millions',
    date: 'Nov 01, 2026',
    isoDate: '2026-11-01',
    numbers: [3, 14, 27, 35, 46],
    bonus: 8,
    status: 'Published',
  },
];

export const sampleTickets: readonly Ticket[] = [
  {
    id: 'TK-2048',
    drawId: drawId('grand-jackpot'),
    drawName: 'Grand Jackpot',
    drawDate: 'Nov 10',
    numbers: [7, 16, 22, 31, 39],
    bonus: 12,
    status: 'Upcoming',
  },
  {
    id: 'TK-2031',
    drawId: drawId('daily-six'),
    drawName: 'Daily Six',
    drawDate: 'Nov 08',
    numbers: [4, 11, 19, 26, 33, 40],
    bonus: null,
    status: 'Drawn',
  },
  {
    id: 'TK-1994',
    drawId: drawId('weekend-millions'),
    drawName: 'Weekend Millions',
    drawDate: 'Nov 01',
    numbers: [3, 14, 27, 35, 46],
    bonus: 8,
    status: 'No prize',
  },
];
