import Phaser from 'phaser'
import background from '../../assets/background.png'

export default class BootScene extends Phaser.Scene {

  constructor() {
    super('Boot')
  }

  preload() {
    this.load.image('bg', background)
  }

  create() {
    this.scene.start('Preload')
  }

  update() {

  }


}
