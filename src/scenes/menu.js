class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('title', './assets/background.png');
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.add.text(360, 230, 'Push (W) to Play', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 400, 'Rules:', { font: '24px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 430, 'Click on (mouse) the screen in direction you want to fling the ball', { font: '24px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 460, 'The farther you click away from the ball the more power you will fling it', { font: '24px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 530, 'This is a two player game where the players take turns', { font: '24px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 560, 'flinging the ball into the others goal', { font: '24px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.scene.start('level0Scene');    
        }
    }

}