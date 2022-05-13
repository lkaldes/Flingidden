class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('title', './assets/background.png');
    }

    create(){
        this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0, 0);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.scene.start('playScene');    
        }
    }

}