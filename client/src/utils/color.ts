// eslint-disable-next-line import/prefer-default-export
export function applyOpacity(hexColor: string, opacityPercentage: number): string {
  // Remove the '#' symbol if it's included
  const hexColorWithoutHash = hexColor.replace('#', '');

  // Convert the hex color to RGB
  const r = parseInt(hexColorWithoutHash.slice(0, 2), 16);
  const g = parseInt(hexColorWithoutHash.slice(2, 4), 16);
  const b = parseInt(hexColorWithoutHash.slice(4, 6), 16);

  // Convert the opacity percentage to a value between 0 and 1
  const opacity = opacityPercentage / 100;

  // Create the RGBA color
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
