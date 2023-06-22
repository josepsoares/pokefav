/** Other Pokemon Sprites (Dream World and Official Artwork sprites) */
export interface IOtherPokemonSprites {
  /** Dream World Sprites of this Pokémon */
  dream_world: {
    /** The default depiction of this Pokémon from the front in battle */
    front_default: string | null;
    /** The female depiction of this Pokémon from the front in battle */
    front_female: string | null;
  };
  /** Official Artwork Sprites of this Pokémon */
  "official-artwork": {
    /** The default depiction of this Pokémon from the front in battle */
    front_default: string | null;
  };
  /** Home Artwork Sprites of this Pokémon */
  home: {
    /** The default depiction of this Pokémon from the front in battle */
    front_default: string | null;
    /** The female depiction of this Pokémon from the front in battle */
    front_female: string | null;
    /** The shiny depiction of this Pokémon from the front in battle */
    front_shiny: string | null;
    /** The shiny female depiction of this Pokémon from the back in battle */
    front_shiny_female: string | null;
  };
}

/** Red/Blue Sprites */
export interface IRedBlue {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The gray depiction of this Pokémon from the back in battle */
  back_gray: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The gray depiction of this Pokémon from the front in battle */
  front_gray: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Yellow sprites */
export interface IYellow {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The gray depiction of this Pokémon from the back in battle */
  back_gray: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The gray depiction of this Pokémon from the front in battle */
  front_gray: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Generation-I Srites */
export interface IGenerationISprites {
  /** Red-blue sprites of this Pokémon */
  "red-blue": IRedBlue;
  /** Yellow sprites of this Pokémon  */
  yellow: IYellow;
}

/** Crystal sprites */
export interface ICrystal {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The back shiny transparent depiction of this Pokémon from the back in battle */
  back_shiny_transparent: string | null;
  /** The transparent depiction of this Pokémon from the back in battle */
  back_transparent: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The front shiny transparent depiction of this Pokémon from the front in battle */
  front_shiny_transparent: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

export interface IGold {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Silver sprites */
interface ISilver {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The transparent depiction of this Pokémon from the front in battle */
  front_transparent: string | null;
}

/** Generation-II Sprites */
export interface IGenerationIISprites {
  /** Crystal sprites of this Pokémon */
  crystal: ICrystal;
  /** Gold sprites of this Pokémon */
  gold: IGold;
  /** Silver sprites of this Pokémon */
  silver: ISilver;
}

/** Emerald sprites */
export interface IEmerald {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** FireRead LeafGreen sprites  */
export interface IFireredLeafgreen {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** Ruby/Sapphire sprites */
export interface IRubySapphire {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}

/** Generation-III Sprites */
export interface IGenerationIIISprites {
  /** Emerald sprites of this Pokémon */
  emerald: IEmerald;
  /** Firered-Leafgreen sprites of this Pokémon */
  "firered-leafgreen": IFireredLeafgreen;
  /** Ruby-Sapphire sprites of this Pokémon */
  "ruby-sapphire": IRubySapphire;
}

export interface IDiamondPearl {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

export interface IHeartgoldSoulsilver {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

export interface IPlatinum {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-IV Sprites */
export interface IGenerationIVSprites {
  /** Diamond-pearl Generation sprites of this Pokémon */
  "diamond-pearl": IDiamondPearl;
  /** Heartgold-Soulsilver sprites of this Pokémon */
  "heartgold-soulsilver": IHeartgoldSoulsilver;
  /** Platinum sprites of this Pokémon */
  platinum: IPlatinum;
}

export interface IAnimated {
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Black/White sprites */
export interface IBlackWhite {
  /** The animated sprite of this pokémon */
  animated: IAnimated;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-V Sprites */
export interface IGenerationVSprites {
  /** Black-white sprites of this Pokémon */
  "black-white": IBlackWhite;
}

/** Omega/Ruby Alpha/Sapphire sprites */
export interface IOmegarubyAlphasapphire {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** XY sprites */
export interface IXY {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation-VI Sprites */
export interface IGenerationVISprites {
  /** Omegaruby-Alphasapphire sprites of this Pokémon */
  "omegaruby-alphasapphire": IOmegarubyAlphasapphire;
  /** X-Y sprites of this Pokémon */
  "x-y": IXY;
}

/** Ultra Sun Ultra Moon sprites */
export interface IUltraSunUltraMoon {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  front_shiny_female: string | null;
}

/** Generation VII icons */
export interface IGenerationViiIcons {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/** Generation-VII Sprites */
export interface IGenerationVIISprites {
  /** Icon sprites of this Pokémon */
  icons: IGenerationViiIcons;
  /** Ultra-sun-ultra-moon sprites of this Pokémon */
  "ultra-sun-ultra-moon": IUltraSunUltraMoon;
}

/** Generation VIII icons */
export interface IGenerationViiiIcons {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}

/** Generation-VIII Sprites */
export interface IGenerationVIIISprites {
  /** Icon sprites of this Pokémon */
  icons: IGenerationViiiIcons;
}

/** Version Sprites */
export interface IVersionSprites {
  /** Generation-I Sprites of this Pokémon */
  "generation-i": IGenerationISprites;
  /** Generation-II Sprites of this Pokémon */
  "generation-ii": IGenerationIISprites;
  /** Generation-III Sprites of this Pokémon */
  "generation-iii": IGenerationIIISprites;
  /** Generation-IV Sprites of this Pokémon */
  "generation-iv": IGenerationIVSprites;
  /** Generation-V Sprites of this Pokémon */
  "generation-v": IGenerationVSprites;
  /** Generation-VI Sprites of this Pokémon */
  "generation-vi": IGenerationVISprites;
  /** Generation-VII Sprites of this Pokémon */
  "generation-vii": IGenerationVIISprites;
  /** Generation-VIII Sprites of this Pokémon */
  "generation-viii": IGenerationVIIISprites;
}

/**
 * A set of sprites used to depict this Pokémon in the game.
 * A visual representation of the various sprites can be found at [PokeAPI/sprites](https://github.com/PokeAPI/sprites#sprites)
 */
export interface IPokemonSprites {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** Dream World, Official Artwork and Home sprites */
  other?: IOtherPokemonSprites;
  /** Version Sprites of this Pokémon */
  versions: IVersionSprites;
}

/**
 * Sprites used to depict this Pokémon form in the game
 */
export interface IPokemonFormSprites {
  /** The default depiction of this Pokémon form from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon form from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon form from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon form from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon form from the back in battle */
  back_default: string | null;
  /** The female depiction of this Pokémon form from the back in battle */
  back_female: string | null;
  /** The shiny depiction of this Pokémon form from the back in battle */
  back_shiny: string | null;
  /** The shiny female depiction of this Pokémon form from the back in battle */
  back_shiny_female: string | null;
}
