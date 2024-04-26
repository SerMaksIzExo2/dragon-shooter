import { Physics } from "phaser";
import { Enemy } from "./Enemy";
import { Fires } from "./Fires";

export class Enemies extends Phaser.Physics.Arcade.Group {
  private enemy?: Enemy;
  private timer!: Phaser.Time.TimerEvent
  private countMax = 10;
  private countCreated = 0;
  private countKilled = 0;
  private currentWave = 0;
  private waves = [2, 3, 4, 5, 7];
  fires: Fires;



  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.fires = new Fires(this.scene);

    this.createTimer()
  }

  getCurrentWave() {
    return this.currentWave;
  }

  getWaves() {
    return this.waves;
  }




  onEnemyKilled() {
    this.countKilled += 1;

    if (this.countKilled >= this.waves[this.currentWave]) {
      this.currentWave += 1
      this.countKilled = 0;
      this.countCreated = 0
    }

    if (this.currentWave < this.waves.length) {
      this.createTimer();
    } else {
      this.scene.events.emit('enemies-killed');
    }
  }


  createEnemy() {
    this.enemy = this.getFirstDead();

    if (!this.enemy) {
      this.enemy = Enemy.generate(this.scene, this.fires);
      this.enemy.on('killed', this.onEnemyKilled, this);
      this.add(this.enemy);
    } else {
      this.enemy.reset();
    }

    this.enemy.move();
    this.countCreated += 1;
  }

  createTimer() {
    if (this.timer) {
      this.timer.remove();
    }

    this.timer = this.scene.time.addEvent({
      delay: 1000,
      callback: () => this.tick(),
      callbackScope: this,
      loop: true
    })
  }


  tick() {
    if (this.countCreated < this.waves[this.currentWave]) {
      this.createEnemy();
    }
    else {
      this.timer.remove();
    }
  }

}