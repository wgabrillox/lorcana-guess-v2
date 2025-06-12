export interface Card {
  [key: string]: string | number | boolean | undefined;

  artist: string;
  abilities?: string;
  setName: string;
  setNum: number;
  color: string;
  image: string;
  cost: number;
  inkable: boolean;
  name: string;
  lore?: number;
  type: string;
  rarity: string;
  flavorText?: string;
  cardNum: number;
  bodyText?: string;
  willpower?: number;
  strength?: number;
  setId: string;
  classifications?: string;
  uniqueId?: string;
  franchise?: string;
  moveCost?: number;
}

export type Option = {
  value: string;
  label: string;
};

export interface CardOptions {
  [key: string]: Option[] | [];

  type: Option[];
  color: Option[];
  name: Option[];
  bodyText: Option[];
}

export interface Set {
  setNum: number;
  releaseDate: string;
  cards: number;
  name: string;
  setId: string;
  selected: boolean;
}

export interface Color {
  name: string;
  image: string;
  color: string;
  selected: boolean;
}

export interface Type {
  name: string;
  selected: boolean;
}

export type OptionsSliceState = {
  sets: { [key: string]: Set };
  colors: { [key: string]: Color };
  types: { [key: string]: Type };
  attributes: { [key: string]: boolean };
};

export type MainSliceState = {
  [key: string]: any;

  cards: Card[] | [];
  cardOptions: CardOptions;
  // Guess Values
  inkable: boolean;
  cost: number;
  type: string;
  strength?: number;
  willpower?: number;
  color: string[];
  name: string;
  bodyText: string;
  lore: number;
  moveCost: number;
};
