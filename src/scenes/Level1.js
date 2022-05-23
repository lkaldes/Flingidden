class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload(){
        this.load.image('circle', './assets/circle.png');
        this.load.image('title', './assets/background.png');
        this.load.image('obstacle', './assets/obstacle.png');
        this.load.image('goal', './assets/tempgoal.png');
        this.load.image('arrowp2', './assets/blueArrow.png');
        this.load.image('arrowp1', './assets/redArrow.png');
        this.load.audio('bounce', './assets/BallBounceSound.wav');
        
    }

    create(){

        //movement and scene creation
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.obstacle1 = this.physics.add.sprite(360, 200, 'obstacle').setScale(3).setSize(126, 40).setOffset(-8, 81);
        this.obstacle1.angle = 90;
        this.obstacle2 = this.physics.add.sprite(360, 660, 'obstacle').setScale(3).setSize(126, 40).setOffset(-8, 81);
        this.obstacle2.angle = 90;
        this.obstacle1.body.immovable = true;
        this.obstacle2.body.immovable = true;
        this.playerturn = 0;
        // flip a coin to determine starting position
        if (Phaser.Math.Between(1,2) == 1) {
            this.player = this.physics.add.sprite(100, 10, 'circle').setSize(30, 30).setOrigin(.5);
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp2').setSize(30, 30).setOrigin(-.31,.45);
        } else {
            this.player = this.physics.add.sprite(620, 870, 'circle').setSize(30, 30).setOrigin(.5);
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp1').setSize(30, 30).setOrigin(-.31,.45);
            this.playerturn++;
        }

        // create goals
        this.goal1 = this.physics.add.sprite(360, 85, 'goal').setScale(0.75).setSize(30, 30);
        this.goal2 = this.physics.add.sprite(360, 785, 'goal').setScale(0.75).setSize(30, 30);
        this.graphics = this.add.graphics();
       
        // ball/arrow properties
        this.player.setGravityY(0);
        this.player.body.allowRotation = true;
        this.player.body.degubShowVelocity = true;
        this.player.setBounce(0.5);
        this.player.setFriction(2);
        this.slopey = 0.0;
        this.slopex = 0.0;
        this.player.depth = 100;
        this.arrow.depth = 90;
        
        // movement properties (change for balance)
        this.player.body.maxVelocity.setTo(1500, 1500);
        this.gravity = 800;
        this.drag = 500;

        //collision
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.obstacle1);
        this.physics.add.collider(this.player, this.obstacle2);

        this.physics.add.overlap(this.player, this.goal1, this.nextlevel, null, this);
        this.physics.add.overlap(this.player, this.goal2, this.nextlevel, null, this);
        // mouse functions
        this.input.on('pointerup', this.fling.bind(this));
        this.input.on('pointermove', this.point, this);
    }

    update(){
        // show/hide arrow whether ball is moving or not
        if (this.player.body.velocity.x == 0 && Math.abs(this.player.body.velocity.y) < 5) {
            this.arrow.alpha = 100;
        } else {
            this.graphics.clear();
            this.arrow.alpha = 0;
        }
        // change arrow color based on player turn
        if (this.playerturn % 2 == 0) {
            this.arrow.setTexture('arrowp1');
        } else {
            this.arrow.setTexture('arrowp2');
        }
        // set offset of arrow
        this.arrow.body.position.x = this.player.body.position.x + 98;
        this.arrow.body.position.y = this.player.body.position.y + 3;
        // set gravity of ball based on side of screen
        if (this.player.body.position.y < 430) {
            this.player.setGravityY(-this.gravity);
        } else if (this.player.body.position.y > 430){
            this.player.setGravityY(this.gravity);
        }
        // bounce sound
        if ((this.player.body.blocked.down || this.player.body.blocked.left || this.player.body.blocked.right || this.player.body.blocked.up) && (this.player.body.velocity.x != 0 && Math.abs(this.player.body.velocity.y) >= 5)) {
            this.sound.play('bounce');
        }
        // prevent sliding when touching surface
        if (this.player.body.blocked.down || this.player.body.blocked.up) {
            this.player.setDragX(this.drag);
        } else {
            this.player.setDragX(0);
        }
    }

    // launch mechanics chen clicked
    fling(pointer, player) {
        if (this.player.body.velocity.x == 0 && Math.abs(this.player.body.velocity.y) < 5) {
            this.graphics.clear();
            this.slopey = 5 * (pointer.y - this.player.body.position.y);
            this.slopex = 5 * (pointer.x - this.player.body.position.x);
            this.player.setVelocityY(this.slopey);
            this.player.setVelocityX(this.slopex);
            this.playerturn++;
        }
    }

    // arrow pointing when mouse moves
    point(pointer, player) {
        if (this.player.body.velocity.x == 0 && Math.abs(this.player.body.velocity.y) < 5) {
            this.graphics.clear();
            if (this.playerturn % 2 == 0) {
                this.graphics.lineStyle(1, 0xd50000);
            } else {
                this.graphics.lineStyle(1, 0x2195f3);
            }
            this.graphics.lineBetween(this.player.body.position.x + 15, this.player.body.position.y + 15, pointer.x + 16, pointer.y + 16);
            var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.body.position.x, this.player.body.position.y, pointer.x, pointer.y);
            this.arrow.setAngle(angle);
        }
    }

    nextlevel(){
        this.scene.start("level2Scene");
    }
}
