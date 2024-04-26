import { Data } from "~/types";

export class MovableObject extends Phaser.Physics.Arcade.Sprite {
  protected velocity!: number;
  protected timer!: Phaser.Time.TimerEvent;
  lives?: number;

  constructor(data: Data) {
    super(data.scene, data.x, data.y, data.texture, data.frame);
    this.init(data);
  }

  init(data: Data) {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.enable = true;
    this.velocity = data.velocity;
    this.scene.events.on('update', this.update, this)
    this.lives = data.lives
  }


  reset(x: number, y: number, lives?: number) {
    this.x = x;
    this.y = y;
    this.lives = lives;

    this.setAlive(true);
  }

  isDead() {
    return false;
  }

  update() {
    if (this.active && this.isDead()) {
      this.setAlive(false)
    }
  }

  hit() {
    if (this.lives !== undefined) {
      this.lives -= 1;
      if (this.lives <= 0) {
        this.setAlive(false);
      }

    }
  }

  setAlive(status: boolean) {
    this.body.enable = status;

    this.setVisible(status);

    this.setActive(status);

    if (this.timer) {
      this.timer.paused = !status
    }

    if (!status) {
      this.emit('killed')
    }


  }


  move() {
    this.setVelocityX(this.velocity)
  }
}