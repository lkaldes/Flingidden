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
        this.obstacle = this.physics.add.sprite(720/2, 860, 'obstacle');
        this.obstacle.body.immovable = true;
        this.player = this.physics.add.sprite(720/2, 430, 'circle');
        this.player.body.setCollideWorldBounds(true);
        this.player.setGravityY(0);
        this.player.body.allowRotation = true;
        this.player.body.degubShowVelocity = true;
        this.player.setBounce(0.75);
        this.player.setDragX(30);
        this.slopey = 0.0;
        this.slopex = 0.0;
        this.physics.add.collider(this.player, this.obstacle);
    }

    update(){
        if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) this.input.on('pointerup', this.fling.bind(this));
        if (this.player.body.position.y > 400 && 460 > this.player.body.position.y) {
            this.player.setGravityY(0);
        } else if (this.player.body.position.y < 400) {
            this.player.setGravityY(-700);
        } else if (this.player.body.position.y > 460){
            this.player.setGravityY(700);
        }
    }

    fling(pointer, player) {
        this.slopey = 5 * (pointer.y - this.player.body.position.y);
        this.slopex = 5 * (pointer.x - this.player.body.position.x);
        //if (this.slopey > 200) this.slopey = 200;                     // speed limiter WIP
        //else if (this.slopex < -200) this.slopex = -200;
        this.player.setVelocityY(this.slopey);
        this.player.setVelocityX(this.slopex);
    }
}
