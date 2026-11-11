import type { DrawRules } from '../entities/Draw';
import type { LotteryNumbers } from '../value-objects/LotteryNumbers';

export function validateSelection(rules: DrawRules, selection: LotteryNumbers): string[] {
  const errors: string[] = [];
  if (selection.main.length !== rules.mainCount) {
    errors.push(`Choose exactly ${rules.mainCount} main numbers.`);
  }
  if (new Set(selection.main).size !== selection.main.length) {
    errors.push('Main numbers must be unique.');
  }
  if (selection.main.some((number) => !Number.isInteger(number) || number < 1 || number > rules.mainMax)) {
    errors.push(`Main numbers must be between 1 and ${rules.mainMax}.`);
  }
  if (rules.bonusMax === null && selection.bonus !== null) {
    errors.push('This draw does not have a bonus number.');
  } else if (rules.bonusMax !== null && selection.bonus === null) {
    errors.push('Choose a bonus number.');
  } else if (rules.bonusMax !== null && selection.bonus !== null && (!Number.isInteger(selection.bonus) || selection.bonus < 1 || selection.bonus > rules.bonusMax)) {
    errors.push(`Bonus number must be between 1 and ${rules.bonusMax}.`);
  }
  return errors;
}
