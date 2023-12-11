export enum CountryEnum {
  ENGLAND = 'england',
  SPAIN = 'spain',
  GERMANY = 'germany',
  FRANCE = 'france',
  ITALY = 'italy',
}

export function isCountry(value: string): value is CountryEnum {
  return Object.values(CountryEnum).includes(value as CountryEnum);
}
