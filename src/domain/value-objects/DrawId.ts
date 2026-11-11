export type DrawId = string & { readonly __brand: 'DrawId' };

export function drawId(value: string): DrawId {
  if (!/^[a-z0-9-]+$/.test(value)) {
    throw new Error('Draw ID must contain lowercase letters, numbers, and hyphens only.');
  }
  return value as DrawId;
}
