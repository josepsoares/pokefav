import {
  IDescription,
  IFlavorText,
  IName,
  INamedAPIResource,
  IVersionEncounterDetail,
  IVersionGameIndex,
} from "~/types/poke-api/misc";
import {
  IPokemonSprites,
  IPokemonFormSprites,
} from "~/types/poke-api/pokemon-sprites";

/**
 * ## Pokemon
 * Pokémon are the creatures that inhabit the world of the Pokémon games.
 * They can be caught using Pokéballs and trained by battling with other Pokémon.
 * Each Pokémon belongs to a specific species but may take on a variant
 * which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings.
 * - See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
 */
export interface IPokemonListItemReq {
  count: number;
  next?: string;
  previous?: string;
  results: INamedAPIResource[];
}

/**
 * ## Pokemon Colors
 * Colors used for sorting Pokémon in a Pokédex.
 * The color listed in the Pokédex is usually the color most apparent or covering each Pokémon's body.
 * No orange category exists; Pokémon that are primarily orange are listed as red or brown.
 */
export interface IPokemonColor {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name:
    | "black"
    | "blue"
    | "brown"
    | "gray"
    | "green"
    | "pink"
    | "purple"
    | "red"
    | "white"
    | "yellow";
  /** The name of this resource listed in different languages */
  names: IName[];
  /** A list of the Pokémon species that have this color */
  pokemon_species: INamedAPIResource[];
}

/**
 * A Move along with learn methods and level details pertaining to specific version groups
 */
export interface IPokemonMove {
  /** The move the Pokémon can learn */
  move: INamedAPIResource;
  /** The details of the version in which the Pokémon can learn the move */
  version_group_details: {
    /** The method by which the move is learned */
    move_learn_method: INamedAPIResource;
    /** The version group in which the move is learned */
    version_group: INamedAPIResource;
    /** The minimum level to learn the move */
    level_learned_at: number;
  }[];
}

/**
 * Details showing types the given Pokémon has
 */
export interface IPokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The type the referenced Pokémon has */
  type: INamedAPIResource;
}

/**
 * ## Pokemon
 * Pokémon are the creatures that inhabit the world of the Pokémon games.
 * They can be caught using Pokéballs and trained by battling with other Pokémon.
 * Each Pokémon belongs to a specific species but may take on a variant
 * which makes it differ from other Pokémon of the same species, such as base stats, available abilities and typings.
 * - See [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(species)) for greater detail.
 */
export interface IPokemon {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The base experience gained for defeating this Pokémon */
  base_experience: number;
  /** The height of this Pokémon in decimetres */
  height: number;
  /** Set for exactly one Pokémon used as the default for each species */
  is_default: boolean;
  /** Order for sorting. Almost national order, except families are grouped together */
  order: number;
  /** The weight of this Pokémon in hectograms */
  weight: number;
  /** A list of abilities this Pokémon could potentially have */
  abilities: {
    /** Whether or not this is a hidden ability */
    is_hidden: boolean;
    /** The slot this ability occupies in this Pokémon species */
    slot: number;
    /** The ability the Pokémon may have */
    ability: INamedAPIResource;
  }[];
  /** A list of forms this Pokémon can take on */
  forms: INamedAPIResource[];
  /** A list of game indices relevent to Pokémon item by generation */
  game_indices: IVersionGameIndex[];
  /** A list of items this Pokémon may be holding when encountered */
  held_items: {
    /** The item the referenced Pokémon holds */
    item: INamedAPIResource;
    /** The details of the different versions in which the item is held */
    version_details: {
      /** The version in which the item is held */
      version: INamedAPIResource;
      /** How often the item is held */
      rarity: number;
    }[];
  }[];
  /** A link to a list of location areas, as well as encounter details pertaining to specific versions */
  location_area_encounters: string;
  /** A list of moves along with learn methods and level details pertaining to specific version groups */
  moves: IPokemonMove[];
  /** A set of sprites used to depict this Pokémon in the game.
   * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
   */
  sprites: IPokemonSprites;
  /** The species this Pokémon belongs to */
  species: INamedAPIResource;
  /** A list of base stat values for this Pokémon */
  stats: {
    /** The stat the Pokémon has */
    stat: INamedAPIResource;
    /** The effort points (EV) the Pokémon has in the stat */
    effort: number;
    /** The base value of the stat */
    base_stat: number;
  }[];
  /** A list of details showing types this Pokémon has */
  types: {
    /** The order the Pokémon's types are listed in */
    slot: number;
    /** The type the referenced Pokémon has */
    type: INamedAPIResource;
  }[];
  /** Data describing a Pokemon's types in a previous generation. */
  past_types: {
    /** The generation of this Pokémon Type. */
    generation: INamedAPIResource;
    /** Types this of this Pokémon in a previos generation. */
    types: {
      /** The order the Pokémon's types are listed in */
      slot: number;
      /** The type the referenced Pokémon has */
      type: INamedAPIResource;
    }[];
  }[];
}

/**
 * ## Location Area Encounter
 * Pokémon location areas where Pokémon can be found
 */
export interface ILocationAreaEncounter {
  /** The location area the referenced Pokémon can be encountered in */
  location_area: INamedAPIResource;
  /** A list of versions and encounters with the referenced Pokémon that might happen */
  version_details: IVersionEncounterDetail[];
}

/**
 * ## Pokemon Form
 * Some Pokémon may appear in one of multiple, visually different forms.
 * These differences are purely cosmetic. For variations within a Pokémon species,
 * which do differ in more than just visuals, the 'Pokémon' entity is used to represent such a variety.
 */
export interface IPokemonForm {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The order in which forms should be sorted within all forms.
   * Multiple forms may have equal order, in which case they should fall back on sorting by name
   */
  order: number;
  /** The order in which forms should be sorted within a species' forms */
  form_order: number;
  /** True for exactly one form used as the default for each Pokémon */
  is_default: boolean;
  /** Whether or not this form can only happen during battle */
  is_battle_only: boolean;
  /** Whether or not this form requires mega evolution */
  is_mega: boolean;
  /** The name of this form */
  form_name: string;
  /** The Pokémon that can take on this form */
  pokemon: INamedAPIResource;
  /** A set of sprites used to depict this Pokémon form in the game */
  sprites: IPokemonFormSprites;
  /** The version group this Pokémon form was introduced in */
  version_group: INamedAPIResource;
  /** The form specific full name of this Pokémon form, or empty if the form does not have a specific name */
  names: IName[];
  /** The form specific form name of this Pokémon form, or empty if the form does not have a specific name */
  form_names: IName[];
  /** A list of details showing types this Pokémon has */
  types: IPokemonType[];
}

/**
 * ## Pokemon Habitat
 * Habitats are generally different terrain Pokémon can be found in
 * but can also be areas designated for rare or legendary Pokémon
 */
export interface IPokemonHabitat {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name:
    | "cave"
    | "forest"
    | "grassland"
    | "mountain"
    | "rare"
    | "rough-terrain"
    | "sea"
    | "urban"
    | "waters-edge";
  /** The name of this resource listed in different languages */
  names: IName[];
  /** A list of the Pokémon species that can be found in this habitat */
  pokemon_species: INamedAPIResource[];
}

/**
 * ## Pokemon Species
 * A Pokémon Species forms the basis for at least one Pokémon.
 * Attributes of a Pokémon species are shared across all varieties of Pokémon within the species.
 * A good example is Wormadam; Wormadam is the species which can be found in three different varieties,
 * Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant */
export interface IPokemonSpecies {
  /** The identifier for this resource */
  id: number;
  /** The name for this resource */
  name: string;
  /** The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage */
  order: number;
  /** The chance of this Pokémon being female, in eighths; or -1 for genderless */
  gender_rate: number;
  /** The base capture rate; up to 255. The higher the number, the easier the catch */
  capture_rate: number;
  /** The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon */
  base_happiness: number;
  /** Whether or not this is a baby Pokémon */
  is_baby: boolean;
  /** Whether or not this is a legendary Pokémon */
  is_legendary: boolean;
  /** Whether or not this is a mythical Pokémon */
  is_mythical: boolean;
  /** Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's */
  hatch_counter: number;
  /** Whether or not this Pokémon has visual gender differences */
  has_gender_differences: boolean;
  /** Whether or not this Pokémon has multiple forms and can switch between them */
  forms_switchable: boolean;
  /** The rate at which this Pokémon species gains levels */
  growth_rate: INamedAPIResource;
  /** A list of Pokedexes and the indexes reserved within them for this Pokémon species */
  pokedex_numbers: {
    /** The index number within the Pokédex */
    entry_number: number;
    /** The Pokédex the referenced Pokémon species can be found in */
    pokedex: INamedAPIResource;
  }[];
  /** A list of egg groups this Pokémon species is a member of */
  egg_groups: INamedAPIResource[];
  /** The color of this Pokémon for Pokédex search */
  color: INamedAPIResource;
  /** The shape of this Pokémon for Pokédex search */
  shape: INamedAPIResource;
  /** The Pokémon species that evolves into this Pokemon_species */
  evolves_from_species: INamedAPIResource;
  /** The evolution chain this Pokémon species is a member of */
  evolution_chain: { url: string };
  /** The habitat this Pokémon species can be encountered in */
  habitat: INamedAPIResource;
  /** The generation this Pokémon species was introduced in */
  generation: INamedAPIResource;
  /** The name of this resource listed in different languages */
  names: IName[];
  /** A list of encounters that can be had with this Pokémon species in pal park */
  pal_park_encounters: {
    /** The base score given to the player when the referenced Pokémon is caught during a pal park run */
    base_score: number;
    /** The base rate for encountering the referenced Pokémon in this pal park area */
    rate: number;
    /** The pal park area where this encounter happens */
    area: INamedAPIResource;
  }[];
  /** A list of flavor text entries for this Pokémon species */
  flavor_text_entries: IFlavorText[];
  /** Descriptions of different forms Pokémon take on within the Pokémon species */
  form_descriptions: IDescription[];
  /** The genus of this Pokémon species listed in multiple languages */
  genera: {
    /** The localized genus for the referenced Pokémon species */
    genus: string;
    /** The language this genus is in */
    language: INamedAPIResource;
  }[];
  /** A list of the Pokémon that exist within this Pokémon species */
  varieties: {
    /** Whether this variety is the default variety */
    is_default: boolean;
    /** The Pokémon variety */
    pokemon: INamedAPIResource;
  }[];
}
