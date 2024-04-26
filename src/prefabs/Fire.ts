import { config } from "~/main";
import { Player } from "./Player";
import { MovableObject } from "./MovebleObject";
import { Data } from "~/types";

export class Fire extends MovableObject {


  static generate(scene: Phaser.Scene, player: Player) {
    const data: Data = {
      scene,
      x: player.x,
      y: player.y,
      texture: player.bullet!.texture,
      velocity: player.bullet!.velocity,
    }

    return new Fire(data);

  }


  isDead() {
    return (this.active && this.x < -this.width || this.x > Number(config.width) + this.width);
  }
}