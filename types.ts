export enum GameState {
  SELECTION = 'SELECTION',
  INTRO = 'INTRO',
  WALKING = 'WALKING',
  PAIN_ASSESSMENT = 'PAIN_ASSESSMENT',
  WATER_SELECTION = 'WATER_SELECTION',
  ATTACK_ANIMATION = 'ATTACK_ANIMATION',
  VICTORY = 'VICTORY',
}

export enum CharacterType {
  BOY = 'BOY',
  GIRL = 'GIRL',
}

export interface GameContextType {
  state: GameState;
  character: CharacterType | null;
  waterCollected: number;
  painLevel: number | null;
  setCharacter: (char: CharacterType) => void;
  setGameState: (state: GameState) => void;
  addWater: () => void;
  setPainLevel: (level: number) => void;
  resetGame: () => void;
}