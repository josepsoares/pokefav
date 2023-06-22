export interface INamedAPIResource {
  /** The name of the referenced resource */
  name: string;
  /** The URL of the referenced resource */
  url: string;
}

/**
 * The localized name for an API resource in a specific language
 */
export interface IName {
  /** The localized name for an API resource in a specific language */
  name: string;
  /** The language this name is in */
  language: INamedAPIResource;
}

/**
 * The localized description for an API resource in a specific language
 */
export interface IDescription {
  /** The localized description for an API resource in a specific language. */
  description: string;
  /** The language this name is in */
  language: INamedAPIResource;
}

/**
 * The localized flavor text for an API resource in a specific language
 */
export interface IFlavorText {
  /** The localized flavor text for an API resource in a specific language */
  flavor_text: string;
  /** The language this name is in */
  language: INamedAPIResource;
}

/** Information of a pokemon encounter */
export interface IEncounter {
  /** The lowest level the Pokémon could be encountered at */
  min_level: number;
  /** The highest level the Pokémon could be encountered at */
  max_level: number;
  /** A list of condition values that must be in effect for this encounter to occur */
  condition_values: INamedAPIResource[];
  /** Percent chance that this encounter will occur */
  chance: number;
  /** The method by which this encounter happens */
  method: INamedAPIResource;
}

/**
 * Encounters and their specifics details
 */
export interface IVersionEncounterDetail {
  /** The game version this encounter happens in */
  version: INamedAPIResource;
  /** The total percentage of all encounter potential */
  max_chance: number;
  /** A list of encounters and their specifics */
  encounter_details: IEncounter[];
}

/**
 * The internal id and version of an API resource
 */
export interface IVersionGameIndex {
  /** The internal id of an API resource within game data */
  game_index: number;
  /** The version relevent to this game index */
  version: INamedAPIResource;
}
