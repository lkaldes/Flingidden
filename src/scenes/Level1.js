class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
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
        this.obstacle1 = this.physics.add.sprite(360, 200, 'obstacle').setScale(3).setSize(126, 40).setOffset(-8, 81);
        this.obstacle1.angle = 90;
        this.obstacle2 = this.physics.add.sprite(360, 660, 'obstacle').setScale(3).setSize(126, 40).setOffset(-8, 81);
        this.obstacle2.angle = 90;
        this.obstacle1.body.immovable = true;
        this.obstacle2.body.immovable = true;
        this.arrow = this.physics.add.sprite(720/2, 430, 'arrow').setSize(30, 30).setOrigin(-.31,.45);
        this.player = this.physics.add.sprite(720/2, 430, 'circle').setSize(30, 30);

        this.goal1 = this.physics.add.sprite(360, 85, 'goal').setScale(0.75).setSize(30, 30);
        this.goal2 = this.physics.add.sprite(360, 785, 'goal').setScale(0.75).setSize(30, 30);
       
        this.player.setGravityY(0);
        this.player.body.allowRotation = true;
        this.player.body.degubShowVelocity = true;
        this.player.setBounce(0.5);
        this.player.setFriction(2);
        this.slopey = 0.0;
        this.slopex = 0.0;
        this.player.body.maxVelocity.setTo(1500, 1500);
        
        //collision
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.obstacle1);
        this.physics.add.collider(this.player, this.obstacle2);

        this.physics.add.overlap(this.player, this.goal1, this.nextlevel, null, this);
        this.physics.add.overlap(this.player, this.goal2, this.nextlevel, null, this);
        this.input.on('pointerup', this.fling.bind(this));
        this.input.on('pointermove', this.point, this);
    }

    update(){
        if (this.player.body.velocity.x == 0 && Math.abs(this.player.body.velocity.y) < 5) {
            this.arrow.alpha = 100;
        } else {
            this.arrow.alpha = 0;
        }
        this.arrow.body.position.x = this.player.body.position.x + 98;
        this.arrow.body.position.y = this.player.body.position.y + 3;
        if (this.player.body.position.y > 400 && 460 > this.player.body.position.y) {
            this.player.setGravityY(0);
        } else if (this.player.body.position.y < 400) {
            this.player.setGravityY(-800);
        } else if (this.player.body.position.y > 460){
            this.player.setGravityY(800);
        }
        if ((this.player.body.blocked.down || this.player.body.blocked.left || this.player.body.blocked.right || this.player.body.blocked.up) && (this.player.body.velocity.x != 0 && Math.abs(this.player.body.velocity.y) >= 5)) {
            this.sound.play('bounce');
        }
        if (this.player.body.blocked.down || this.player.body.blocked.up) {
            this.player.setDragX(500);
        } else {
            this.player.setDragX(0);
        }
    }

    fling(pointer, player) {
        if (this.player.body.velocity.x == 0 && Math.abs(this.player.body.velocity.y) < 5) {
            this.slopey = 5 * (pointer.y - this.player.body.position.y);
            this.slopex = 5 * (pointer.x - this.player.body.position.x);
            this.player.setVelocityY(this.slopey);
            this.player.setVelocityX(this.slopex);
        }
    }

    point(pointer, player) {
        var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.body.position.x, this.player.body.position.y, pointer.x, pointer.y);
        this.arrow.setAngle(angle);
        //this.arrow.scaleX = Math.sqrt(Math.pow(pointer.x - this.player.body.position.x, 2) + Math.pow(pointer.y - this.player.body.position.y , 2))
    }

    nextlevel(){
        this.scene.start("level2Scene");
    }
}
