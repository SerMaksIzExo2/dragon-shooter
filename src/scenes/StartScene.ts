import Phaser from 'phaser'
import { config } from '~/main';
export default class StartScene extends Phaser.Scene {

    constructor() {
        super('Start')
    }

    create(data: { score: number, completed: boolean }) {
        this.createBackground()
        if (data.score !== undefined) {
            this.createStats(data)
        }
        this.createText();
        this.setEvents();
    }

    createStats(data: { score: number, completed: boolean }) {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRoundedRect(Number(config.width) / 2 - 200, Number(config.height) / 2 - 200, 400, 400)

        const textTitle = data.completed ? 'Level completed' : 'Game Over';
        const textScore = `Score: ${data.score}`;
        const textStyle = {
            font: '40px Arial',
            color: '#fff',
        };

        this.add.text(Number(config.width) / 2, 250, textTitle, textStyle).setOrigin(0.5);
        this.add.text(Number(config.width) / 2, 350, textScore, textStyle).setOrigin(0.5);
    }

    createBackground() {
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
    }

    createText() {
        this.add.text(Number(config.width) / 2, 500, 'Tap to start', {
            font: '40px Arial',
            color: '#fff',
        }).setOrigin(0.5)
    }

    setEvents() {
        this.input.on('pointerdown', () => {
            this.scene.start('Game');
        })

    }
}
