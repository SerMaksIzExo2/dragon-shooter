import { Fires } from "./prefabs/Fires";

export type Data = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  velocity: number;
  texture: string | Phaser.Textures.Texture;
  type?: ObjectTypes,
  frame?: string | number;
  bullet?: {
    delay: number;
    texture: string | Phaser.Textures.Texture;
    velocity: number;
  };
  origin?: {
    x: number,
    y: number,
  }
  fires?: Fires,
  lives?: number,
}

export enum ObjectTypes {
  Enemy,
  Player,
  Bullet,
}

export type Sound = {
  theme: Phaser.Sound.BaseSound,
  boomSound: Phaser.Sound.BaseSound,
}