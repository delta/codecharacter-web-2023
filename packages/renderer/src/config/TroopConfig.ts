import TroopType from './TroopType.js';

export default class TroopConfig {
  static readonly troops: Array<TroopType> = [
    new TroopType(10, 2, 'knight'),
    new TroopType(20, 4, 'knight2'),
    new TroopType(10, 6, 'knight'),
  ];
}
