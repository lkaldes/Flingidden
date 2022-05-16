class Level0 extends Phaser.Scene {
    constructor() {
        super("level0Scene");
    }

    preload(){
        this.load.image('circle', './assets/circle.png');
        this.load.image('title', './assets/background.png');
        this.load.image('obstacle', './assets/obstacle.png');
        this.load.image('goal', './assets/tempgoal.png');
        
    }

    create(){

        //movement
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.obstacle1 = this.physics.add.sprite(100, 250, 'obstacle').setScale(4).setSize(136, 40).setOffset(-18, 81);
        this.obstacle1.angle = 90;
        this.obstacle2 = this.physics.add.sprite(600, 610, 'obstacle').setScale(4).setSize(115, 40).setOffset(-8, 81);
        this.obstacle2.angle = 90;
        this.obstacle1.body.immovable = true;
        this.obstacle2.body.immovable = true;
        this.player = this.physics.add.sprite(720/2, 430, 'circle').setSize(30, 30);

        this.goal1 = this.physics.add.sprite(85, 85, 'goal').setScale(0.75).setSize(30, 30);
        this.goal2 = this.physics.add.sprite(635, 785, 'goal').setScale(0.75).setSize(30, 30);
       
        this.player.setGravityY(0);
        this.player.body.allowRotation = true;
        this.player.body.degubShowVelocity = true;
        this.player.setBounce(0.5);
        this.player.setDragX(30);
        this.slopey = 0.0;
        this.slopex = 0.0;
        
        //collision
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.obstacle1);
        this.physics.add.collider(this.player, this.obstacle2);

        this.physics.add.overlap(this.player, this.goal1, this.nextlevel, null, this);
        this.physics.add.overlap(this.player, this.goal2, this.nextlevel, null, this);
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

    nextlevel(){
        this.scene.start("level1Scene");
    }
}
