import { config } from "~/main";
import { MovableObject } from "./MovebleObject";
import { Player } from "./Player";
import { Fires } from "./Fires";
import { Data } from "~/types";

export class Enemy extends MovableObject {
  fires!: Fires;
  bullet?: { delay: number; texture: string | Phaser.Textures.Texture; velocity: number; };
  initialLives?: number;


  static generateAttributes() {
    const x = Number(config.width) + 200;
    const y = Phaser.Math.Between(100, Number(config.height) - 100);
    const id = Phaser.Math.Between(1, 4);
    const lives = id === 1 ? 1 : id === 2 ? 2 : id === 3 ? 3 : 4;

    return { x, y, id, lives }

  }

  static generate(scene: Phaser.Scene, fires: Fires) {
    const data = Enemy.generateAttributes();

    return new Enemy({
      scene,
      fires,
      lives: data.lives,
      x: data.x,
      y: data.y,
      texture: 'enemy',
      frame: `enemy${data.id}`,
      velocity: -250,
      bullet: {
        delay: 2500,
        texture: 'bullet',
        velocity: 500,
      },
      origin: {
        x: 0, y: 0.5
      }
    });
  }

  init(data: Data) {
    super.init(data);
    this.setOrigin(data.origin?.x, data.origin?.y)
    this.fires = data.fires || new Fires(this.scene);
    this.initialLives = data.lives;

    this.timer = this.scene.time.addEvent({
      delay: data.bullet?.delay,
      callback: () => this.fire(),
      callbackScope: this,
      loop: true
    })
    this.bullet = data.bullet
  }

  fire() {
    this.fires.createFire(this);
  }

  reset() {
    const data = Enemy.generateAttributes()
    super.reset(data.x, data.y, data.lives)
    this.initialLives = data.lives;
    this.setFrame(`enemy${data.id}`);
  }

  isDead() {
    return this.x < -this.width;
  }

}

