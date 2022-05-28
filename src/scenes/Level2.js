class Level2 extends Phaser.Scene {
    constructor() {
        super({
            key: "level2Scene",     
            physics: {
                //default: 'arcade',
                arcade: {
                    debug: true
                },
                matter: {
                    gravity: {
                        y: 0
                    },
                    setBounds: {
                        left: true,
                        right: true,
                        top: true,
                        bottom: true
                    },
                    debug: true
                }
            }
        });
    }

    preload(){
        this.load.image('circle', './assets/circle.png');
        this.load.image('title', './assets/background.png');
        this.load.image('square', './assets/square.png');
        this.load.image('triangle', './assets/triangle.png');
        this.load.image('goal', './assets/tempgoal.png');
        this.load.image('arrowp2', './assets/blueArrow.png');
        this.load.image('arrowp1', './assets/redArrow.png');
        this.load.audio('bounce', './assets/BallBounceSound.wav');

        this.load.json('shapes', 'assets/Shapes.json');
        
    }

    create(){

        //this.matter.world.disableGravity();
        this.shapes = this.cache.json.get('shapes');
        //movement and scene creation
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.obstacle1 = this.matter.add.sprite(360, 200, 'square', null, { isStatic: true, shape: this.shapes.square }).setScale(2).setAngle(45);
        this.obstacle2 = this.matter.add.sprite(360, 660, 'square', null, { isStatic: true, shape: this.shapes.square }).setScale(2).setAngle(45);
        this.obstacle3 = this.matter.add.sprite(45, 420, 'triangle', null, { isStatic: true, shape: this.shapes.triangle }).setScale(2);
        this.obstacle4 = this.matter.add.sprite(675, 420, 'triangle', null, { isStatic: true, shape: this.shapes.triangle }).setScale(2).setAngle(180);

        this.playerturn = 0;
        // flip a coin to determine starting position
        if (Phaser.Math.Between(1,2) == 1) {
            this.player = this.matter.add.sprite(100, 10, 'circle', null, { shape: this.shapes.circle });
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp2').setSize(30, 30).setOrigin(-.31,.45);
        } else {
            this.player = this.matter.add.sprite(620, 870, 'circle', null, { shape: this.shapes.circle });
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp1').setSize(30, 30).setOrigin(-.31,.45);
            this.playerturn++;
        }

        // create goals
        this.goal1 = this.matter.add.sprite(360, 85, 'goal', null, { isStatic: true, shape: this.shapes.tempgoal}).setScale(0.75);
        this.goal2 = this.matter.add.sprite(360, 785, 'goal', null, { isStatic: true, shape: this.shapes.tempgoal }).setScale(0.75);
       
        // ball/arrow properties
        this.slopey = 0.0;
        this.slopex = 0.0;
        this.player.depth = 100;
        this.arrow.depth = 90;
        this.graphics = this.add.graphics();
        
        // movement properties (change for balance)
        this.player.setBounce(0.8);
        this.player.setFriction(1);
        this.gravity = 0.3;

        //collision
        this.matter.world.on('collisionstart', this.collision.bind(this));
        
        // mouse functions
        this.input.on('pointerup', this.fling.bind(this));
        this.input.on('pointermove', this.point, this);
    }

    update(){
        // show/hide arrow whether ball is moving or not
        if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 0.1) {
            this.arrow.alpha = 100;
        } else {
            this.graphics.clear();
            this.arrow.alpha = 0;
        }
        // change arrow color based on player turn
        if (this.playerturn % 2 < 0.1) {
            this.arrow.setTexture('arrowp1');
        } else {
            this.arrow.setTexture('arrowp2');
        }
        // set offset of arrow
        this.arrow.body.position.x = this.player.body.position.x + 82;
        this.arrow.body.position.y = this.player.body.position.y - 12;
        // set gravity of ball based on side of screen
        if (this.player.body.position.y < 430) {
            this.matter.world.setGravity(0, -this.gravity);
        } else if (this.player.body.position.y > 430){
            this.matter.world.setGravity(0, this.gravity);
        }
        /*
        // bounce sound
        if ((this.player.body.blocked.down || this.player.body.blocked.left || this.player.body.blocked.right || this.player.body.blocked.up) && (Math.abs(this.player.body.velocity.x) != 0 && Math.abs(this.player.body.velocity.y) >= 5)) {
            this.sound.play('bounce');
        }
        // prevent sliding when touching surface
        if (this.player.body.blocked.down || this.player.body.blocked.up) {
            this.player.frictionAirX(this.drag);
        } else {
            this.player.frictionAirX(0);
        }*/
    }

    // launch mechanics chen clicked
    fling(pointer, player) {
        //this.player.setVelocity(10,10);
        if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 0.1) {
            this.graphics.clear();
            this.slopey = 5 * (pointer.y - this.player.body.position.y);
            this.slopex = 5 * (pointer.x - this.player.body.position.x);
            this.player.setVelocity(this.slopex / 75, this.slopey / 75);
            this.playerturn++;
        }
    }

    // arrow pointing when mouse moves
    point(pointer, player) {
        if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 0.1) {
            this.graphics.clear();
            if (this.playerturn % 2 == 0) {
                this.graphics.lineStyle(1, 0xd50000);
            } else {
                this.graphics.lineStyle(1, 0x2195f3);
            }
            this.graphics.lineBetween(this.player.body.position.x, this.player.body.position.y, pointer.x, pointer.y);
            var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.body.position.x, this.player.body.position.y, pointer.x, pointer.y);
            this.arrow.setAngle(angle);
        }
    }

    collision(bodyA, bodyB) {
        this.sound.play('bounce');
    }

    nextlevel(){
        this.scene.start("level3Scene");
    }
}