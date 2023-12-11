export interface FootballApiModel<T> {
  errors: FootballApiErrorModel[];
  response: T[];
}

export interface FootballApiErrorModel {}
