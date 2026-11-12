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
// The brand ramp runs light to dark, so Fluent's dark theme would pick near-black
// navy for brand text, icons and the selected-tab underline. Use lighter blues instead.
const dark: Theme = {
  ...createDarkTheme(brandRamp),
  colorBrandForeground1: brandColors[4],
  colorBrandForeground2: brandColors[3],
  colorBrandForegroundLink: brandColors[4],
  colorCompoundBrandForeground1: brandColors[4],
  colorCompoundBrandForeground1Hover: brandColors[3],
  colorCompoundBrandForeground1Pressed: brandColors[5],
  colorCompoundBrandStroke: brandColors[4],
  colorCompoundBrandStrokeHover: brandColors[3],
  colorNeutralForeground2BrandSelected: brandColors[4],
  colorNeutralForeground2BrandHover: brandColors[3],
};

export function getAppTheme(mode: 'light' | 'dark'): Theme {
  return mode === 'dark' ? dark : light;
}
