export class Boom extends Phaser.GameObjects.Sprite {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'boom', 'boom1');

    this.scene.add.existing(this);

    const frames = this.scene.anims.generateFrameNames('boom', {
      prefix: 'boom',
      start: 1,
      end: 4,
    });

    this.scene.anims.create({
      key: 'explosion',
      frames,
      frameRate: 10,
      repeat: 0,
    })

    this.play('explosion');

    this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      this.destroy();
    })
  }

  static generate(scene: Phaser.Scene, x: number, y: number) {
    return new Boom(scene, x, y)
  }

}
