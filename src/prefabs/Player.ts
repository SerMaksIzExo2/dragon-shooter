import { config } from "~/main";
import { Enemy } from "./Enemy";

export class Player extends Enemy {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, cursors?: Phaser.Types.Input.Keyboard.CursorKeys) {
    super({
      scene,
      x: 150,
      y: Number(config.height) / 2,
      lives: 3,
      texture: 'dragon',
      frame: 'dragon1',
      velocity: 500,
      bullet: {
        delay: 300,
        texture: 'fire',
        velocity: 750,
      },
      origin: {
        x: 1,
        y: 0.5,
      },
    });
    this.cursors = cursors;

    const frames = this.scene.anims.generateFrameNames('dragon', {
      prefix: 'dragon',
      start: 1,
      end: 6,
    });

    this.scene.anims.create({
      key: 'fly',
      frames,
      frameRate: 10,
      repeat: -1,
    })

    this.play('fly');
  }

  move() {
    this.setVelocity(0)

    if (this.cursors!.left?.isDown) {
      this.setVelocityX(-this.velocity);
    }
    else if (this.cursors!.right?.isDown) {
      this.setVelocityX(this.velocity);
    }


    if (this.cursors!.up?.isDown) {
      this.setVelocityY(-this.velocity);
    }
    else if (this.cursors!.down?.isDown) {
      this.setVelocityY(this.velocity);
    }
  }
}
