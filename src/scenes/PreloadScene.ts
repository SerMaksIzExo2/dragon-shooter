import Phaser from 'phaser'
import dragonImage from '../../assets/dragonImage.png'
import dragon from '../../assets/dragon.json'
import enemyImage from '../../assets/enemyImage.png'
import enemy from '../../assets/enemy.json'
import boomImage from '../../assets/boomImage.png'
import boom from '../../assets/boom.json'
import fire from '../../assets/fire.png'
import bullet from '../../assets/bullet.png'
import boomSound from '../../assets/sounds/boomSound.mp3'
import theme from '../../assets/sounds/theme.mp3'
import { LoadingBar } from '~/classes/LoadingBar'
import { config } from '~/main'

export default class PreloadScene extends Phaser.Scene {

  constructor() {
    super('Preload')
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);

    const loadingBar = new LoadingBar(this)
    this.preloadAssets();

  }

  preloadAssets() {
    this.load.image('fire', fire);
    this.load.image('bullet', bullet);
    this.load.atlas('dragon', dragonImage, dragon);
    this.load.atlas('enemy', enemyImage, enemy);
    this.load.atlas('boom', boomImage, boom);

    this.load.audio('theme', theme);
    this.load.audio('boomSound', boomSound);
  }

  create() {
    this.scene.start('Start');
  }

  update() {

  }


}
