import Phaser from 'phaser'

import HelloWorldScene from './scenes/StartScene'
import BootScene from './scenes/BootScene'
import PreloadScene from './scenes/PreloadScene'
import GameScene from './scenes/GameScene'
import StartScene from './scenes/StartScene'

export const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	scene: [BootScene, PreloadScene, StartScene, GameScene]

}

export default new Phaser.Game(config)
