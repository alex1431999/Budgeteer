// eslint-disable-next-line import/prefer-default-export
export function copy(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
