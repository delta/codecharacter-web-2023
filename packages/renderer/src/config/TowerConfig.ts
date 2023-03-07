import TowerType from './TowerType.js';

export default class TowerConfig {
  // TODO: Fetch from network
  static readonly towers = [
    new TowerType(
      2,
      'tower1',
      'tower1.png',
      'tower1_thumbnail.png',
      100,
      4,
      100,
    ),
    new TowerType(
      3,
      'tower2',
      'tower2.png',
      'tower2_thumbnail.png',
      100,
      6,
      200,
    ),
    new TowerType(
      1,
      'tower2',
      'tower3.png',
      'tower3_thumbnail.png',
      100,
      4,
      100,
    ),
  ];
}
