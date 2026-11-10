import type { ApiClient } from './types';
import { getPreviewState, waitForPreviewStateChange } from './previewState';
import { GetDraw } from '../application/use-cases/GetDraw';
import { ListDraws } from '../application/use-cases/ListDraws';
import { ListResults } from '../application/use-cases/ListResults';
import { ListTickets } from '../application/use-cases/ListTickets';
import { PreviewSelection } from '../application/use-cases/PreviewSelection';
import { drawId } from '../domain/value-objects/DrawId';
import { InMemoryDrawRepository } from '../infrastructure/in-memory/InMemoryDrawRepository';
import { InMemoryResultRepository } from '../infrastructure/in-memory/InMemoryResultRepository';
import { InMemoryTicketRepository } from '../infrastructure/in-memory/InMemoryTicketRepository';
import { sampleDraws, sampleResults, sampleTickets } from '../infrastructure/in-memory/sampleData';

const drawRepository = new InMemoryDrawRepository(sampleDraws);
const resultRepository = new InMemoryResultRepository(sampleResults);
const ticketRepository = new InMemoryTicketRepository(sampleTickets);
const listDraws = new ListDraws(drawRepository);
const getDraw = new GetDraw(drawRepository);
const listResults = new ListResults(resultRepository);
const listTickets = new ListTickets(ticketRepository);
const previewSelection = new PreviewSelection(drawRepository);

async function respond<T>(load: () => Promise<T>, emptyValue: T): Promise<T> {
  const state = getPreviewState();
  if (state === 'loading') {
    await waitForPreviewStateChange();
    return respond(load, emptyValue);
  }
  if (state === 'error') throw new Error('The local demo could not load this information. Try again.');
  if (state === 'empty') return emptyValue;
  await new Promise((resolve) => window.setTimeout(resolve, 120));
  return load();
}

export const mockClient: ApiClient = {
  listDraws: () => respond(() => listDraws.execute(), []),
  getDraw: (id) => respond(() => getDraw.execute(id), null),
  listResults: () => respond(() => listResults.execute(), []),
  listTickets: () => respond(() => listTickets.execute(), []),
  previewSelection: (input) => respond(() => previewSelection.execute({ ...input, drawId: drawId(input.drawId) }), null),
};
