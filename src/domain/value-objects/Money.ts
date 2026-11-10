export interface Money {
  readonly cents: number;
  readonly currency: 'USD';
}

export function money(cents: number): Money {
  if (!Number.isInteger(cents) || cents < 0) {
    throw new Error('Money must be a non-negative whole number of cents.');
  }
  return { cents, currency: 'USD' };
}

export function formatMoney(value: Money): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: value.currency,
    minimumFractionDigits: 2,
  }).format(value.cents / 100);
}
