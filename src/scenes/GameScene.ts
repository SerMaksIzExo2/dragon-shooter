import Phaser from 'phaser'
import { config } from '~/main';
import { Boom } from '~/prefabs/Boom';
import { Enemies } from '~/prefabs/Enemies';
import { Enemy } from '~/prefabs/Enemy';
import { Fire } from '~/prefabs/Fire';
import { Player } from '~/prefabs/Player';
import { Sound } from '~/types';

const findPlayer = (gameObjects: Phaser.GameObjects.GameObject[]): Player | undefined => {
  return gameObjects.find(item => item instanceof Player) as Player | undefined;
}
const findFire = (gameObjects: Phaser.GameObjects.GameObject[]): Fire | undefined => {
  return gameObjects.find(item => item instanceof Fire) as Fire | undefined;
}
export default class GameScene extends Phaser.Scene {

  private player!: Player;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private bg!: Phaser.GameObjects.TileSprite;
  private enemies!: Enemies
  private score = 0;
  private scoreText?: Phaser.GameObjects.Text;
  private sounds?: Sound;
  private gameOver = false;


  constructor() {
    super('Game')
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  create() {
    this.createBackground();
    if (!this.sounds) {
      this.createSounds();
    }
    this.player = new Player(this, this.cursors);
    this.player.setCollideWorldBounds(true);
    this.enemies = new Enemies(this);
    this.createCompleteEvents();
    this.addOverlap();
    this.createText();


  }

  createSounds() {
    this.sounds = {
      theme: this.sound.add('theme', { volume: 0.2, loop: true }),
      boomSound: this.sound.add('boomSound', { volume: 0.1 }),
    };

    this.sounds?.theme.play();

  }

  createText() {
    this.scoreText = this.add.text(50, 50, `Score: ${this.score}`, {
      font: '40px Arial',
      color: '#fff',
    })
  }

  addOverlap() {
    this.physics.add.overlap(this.player.fires, this.enemies, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.player, this.enemies, this.onOverlap, undefined, this);
    this.physics.add.overlap(this.enemies.fires, this.player, this.handleHitPlayer, undefined, this);
  }

  onOverlap(source, target) {
    const enemy = [source, target].find(item => item.texture.key === 'enemy');

    const initialLives = enemy.initialLives;

    target.hit();

    if (enemy.lives <= 0) {

      this.score += initialLives;
      this.scoreText?.setText(`Score: ${this.score}`);
      Boom.generate(this, enemy.x, enemy.y)
      this.sounds?.boomSound.play();

      const anyEnemiesAlive = this.enemies.getChildren().some(enemy => enemy.active);
      const currentWave = this.enemies.getCurrentWave();
      const waves = this.enemies.getWaves();

      if (!anyEnemiesAlive && currentWave >= waves.length) {
        this.onComplete();
      }
    }



    source.setAlive(false)

  }

  handleHitPlayer(source: Phaser.GameObjects.GameObject, target: Phaser.GameObjects.GameObject) {
    const player = findPlayer([source, target]);

    if (player) {
      player.hit();
    }

    const fire = findFire([source, target]);

    if (fire) {
      fire.setAlive(false);

    }

  }

  createCompleteEvents() {
    this.player.once('killed', this.onComplete, this);
    this.events.once('enemies-killed', this.onComplete, this);
  }

  onComplete() {
    if (!this.gameOver) {
      this.gameOver = true;
    }

    this.scene.start('Start', {
      score: this.score,
      completed: this.player.active,
    });

    if (!this.player.active) {
      this.score = 0;
    }

  }


  update() {
    this.player?.move()
    this.bg.tilePositionX += 1;

  }

  createBackground() {
    this.bg = this.add.tileSprite(0, 0, Number(config.width), Number(config.height), 'bg').setOrigin(0, 0);

  }

}
