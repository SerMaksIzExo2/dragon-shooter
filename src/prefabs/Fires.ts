import { Physics } from "phaser";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Fire } from "./Fire";

export class Fires extends Phaser.Physics.Arcade.Group {
  private fire?: Fire;

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
  }

  createFire(player: Player) {
    this.fire = this.getFirstDead();
    if (!this.fire) {
      this.fire = Fire.generate(this.scene, player)
      this.add(this.fire);
    } else {
      this.fire.reset(player.x, player.y);
    }

    this.fire.move();
  }



}