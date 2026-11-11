import type { DrawRepository } from '../ports/DrawRepository';
import type { DemoSelection } from '../../domain/entities/Ticket';
import { validateSelection } from '../../domain/rules/selectionRules';
import type { DrawId } from '../../domain/value-objects/DrawId';

export interface PreviewSelectionInput {
  readonly drawId: DrawId;
  readonly numbers: readonly number[];
  readonly bonus: number | null;
}

export class PreviewSelection {
  constructor(private readonly draws: DrawRepository) {}

  async execute(input: PreviewSelectionInput): Promise<DemoSelection> {
    const draw = await this.draws.getById(input.drawId);
    if (!draw) throw new Error('That draw is not available in this demo.');
    const errors = validateSelection(draw.rules, { main: input.numbers, bonus: input.bonus });
    if (errors.length > 0) throw new Error(errors.join(' '));
    return {
      drawId: draw.id,
      numbers: [...input.numbers].sort((a, b) => a - b),
      bonus: input.bonus,
      priceCents: draw.ticketPriceCents,
      notice: 'Demo only — no ticket is created, purchased, or reserved.',
    };
  }
}
