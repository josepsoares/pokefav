export enum Legality {
  LEGAL = "Legal",
  BANNED = "Banned",
}

export interface ILegality {
  expanded: Legality | undefined;
  standard: Legality | undefined;
  unlimited: Legality | undefined;
}

export interface IPokemonTCGPrice {
  low: number | null;
  mid: number | null;
  high: number | null;
  market: number | null;
  directLow: number | null;
}

export interface IPokemonTCGCardmarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number | null;
    lowPrice: number | null;
    trendPrice: number | null;
    germanProLow: number | null;
    suggestedPrice: number | null;
    reverseHoloSell: number | null;
    reverseHoloLow: number | null;
    reverseHoloTrend: number | null;
    lowPriceExPlus: number | null;
    avg1: number | null;
    avg7: number | null;
    avg30: number | null;
    reverseHoloAvg1: number | null;
    reverseHoloAvg7: number | null;
    reverseHoloAvg30: number | null;
  };
}

export interface IPokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  ancientTrait?: {
    name: string;
    text: string;
  };
  abilities?: {
    name: string;
    text: string;
    type: string;
  }[];
  attacks?: {
    convertedEnergyCost: number;
    cost: string[];
    damage: string;
    name: string;
    text: string;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  resistances?: {
    type: string;
    value: string;
  }[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: {
    id: string;
    images: {
      symbol: string;
      logo: string;
    };
    legalities: ILegality;
    name: string;
    printedTotal: number;
    ptcgoCode: string;
    releaseDate: string;
    series: string;
    total: number;
    updatedAt: string;
  };
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: ILegality;
  regulationMark?: string;
  images: {
    small: string;
    large: string;
  };
  tcgplayer?: {
    url: string;
    updatedAt: string;
    prices: {
      normal: IPokemonTCGPrice | undefined;
      holofoil: IPokemonTCGPrice | undefined;
      reverseHolofoil: IPokemonTCGPrice | undefined;
      "1stEditionNormal": IPokemonTCGPrice | undefined;
      "1stEditionHolofoil": IPokemonTCGPrice | undefined;
    };
  };
  cardmarket?: IPokemonTCGCardmarket;
}
