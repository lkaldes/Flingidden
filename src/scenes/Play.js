class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('circle', './assets/circle.png');
        this.load.image('title', './assets/background.png');
        
        
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.player = this.physics.add.sprite(300, 400, 'circle');
        this.player.body.setCollideWorldBounds(true);
        this.player.setBounce(0.9);
        
    }

    update(){

        
    }
}
