import TowerType from './TowerType.js';

export default class TowerConfig {
  // TODO: Fetch from network
  static readonly towers = [
    new TowerType(2, 'Ranger', 'tower1.png', 'tower1_thumbnail.png', 100),
    new TowerType(3, 'Aerial', 'tower2.png', 'tower2_thumbnail.png', 200),
    new TowerType(1, 'Common', 'tower3.png', 'tower3_thumbnail.png', 200),
  ];
}
