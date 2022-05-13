class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('circle', './assets/circle.png');
        this.load.image('title', './assets/background.png');
        this.load.image('obstacle', './assets/obstacle.png')
        
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.obstacle = this.physics.add.sprite(720, 430, 'obstacle');
        this.player = this.physics.add.sprite(720/2, 430, 'circle');
        this.player.body.setCollideWorldBounds(true);
        this.player.setGravityY(0);
        this.player.setBounce(0.9);
        this.player.setInteractive();
        this.input.on('gameobjectdown', this.fling.bind(this));
    }

    update(){
       if (this.player.body.position.y > 400 && 460 < this.player.body.position.y) {
           this.player.setGravityY(0);
       } else if (this.player.body.position.y < 400) {
           this.player.setGravityY(-700);
       } else if (this.player.body.position.y > 460){
           this.player.setGravityY(700);
       }
        
    }

    fling(pointer, player) {
        this.player.setVelocityY(-360);
    }
}
