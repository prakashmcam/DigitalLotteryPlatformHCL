import { createDarkTheme, createLightTheme, type BrandVariants, type Theme } from '@fluentui/react-components';

const brandColors = [
  '#f3f6fa', '#e7edf5', '#d2deeb', '#b5c9dd', '#93aecb', '#6f91b5', '#4e759d', '#315a83',
  '#17365d', '#132f52', '#102948', '#0d233d', '#0a1d33', '#071728', '#04101d', '#02080f',
] as const;

export const brandRamp: BrandVariants = {
  10: brandColors[0], 20: brandColors[1], 30: brandColors[2], 40: brandColors[3],
  50: brandColors[4], 60: brandColors[5], 70: brandColors[6], 80: brandColors[8],
  90: brandColors[9], 100: brandColors[10], 110: brandColors[11], 120: brandColors[12],
  130: brandColors[13], 140: brandColors[14], 150: brandColors[15], 160: '#01050a',
};

const light = createLightTheme(brandRamp);
const dark = createDarkTheme(brandRamp);

export function getAppTheme(mode: 'light' | 'dark'): Theme {
  return mode === 'dark' ? dark : light;
}
