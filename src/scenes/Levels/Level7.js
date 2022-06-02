class Level7 extends Phaser.Scene {
    constructor() {
        super({
            key: "level7Scene",     
            physics: {
                //default: 'arcade',
                arcade: {
                    //debug: true
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
                    //debug: true
                }
            }
        });
    }

    preload(){
        this.load.json('shapes', 'assets/Shapes.json');
    }

    create(){

        this.shapes = this.cache.json.get('shapes');

        //movement and scene creation
        this.add.tileSprite(0, 0, 720, 860, 'intersection').setOrigin(0, 0);
        
        this.obstacle1 = this.matter.add.sprite(100, 175, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);
        this.obstacle1extend = this.matter.add.sprite(350, 175, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);
        this.obstacle2 = this.matter.add.sprite(600, 725, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);
        this.obstacle2extend = this.matter.add.sprite(350, 725, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);
        this.obstacle3 = this.matter.add.sprite(100, 545, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);
        this.obstacle3extend = this.matter.add.sprite(350, 545, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);
        this.obstacle4 = this.matter.add.sprite(600, 355, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);
        this.obstacle4extend = this.matter.add.sprite(350, 355, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2).setAngle(90);

        
        this.playerturn = 0;
        this.player1score = 0;
        this.player2score = 0;
        // flip a coin to determine starting position
        if (Phaser.Math.Between(1,2) == 1) {
            this.player = this.matter.add.sprite(670, 40, 'circle', null, { shape: this.shapes.circle });
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp2').setSize(30, 30).setOrigin(-0.31,0.45);
        } else {
            this.player = this.matter.add.sprite(50, 870, 'circle', null, { shape: this.shapes.circle });
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp1').setSize(30, 30).setOrigin(-0.31,0.45);
            this.playerturn++;
        }

        // create goals
        this.goal1 = this.matter.add.sprite(60, 85, 'goal1', null, { isStatic: true, shape: this.shapes.tempgoal}).setScale(0.75);
        this.goal2 = this.matter.add.sprite(660, 815, 'goal2', null, { isStatic: true, shape: this.shapes.tempgoal}).setScale(0.75);
        
        // UI properties
        this.scoreboard = this.matter.add.sprite(350, -80, 'header', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(6).setAngle(90);
        this.p1score = this.add.text(50, 20, '0', { font: '28px Impact', fill: '#d50000'}).setOrigin(0.5);
        this.p2score = this.add.text(130, 20, '0', { font: '28px Impact', fill: '#2195f3'}).setOrigin(0.5);
        this.add.text(90, 20, '-', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 20, 'Tutorial', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.menu = this.add.text(670, 20, 'Menu', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        
        // ball/arrow properties
        this.slopey = 0.0;
        this.slopex = 0.0;
        this.player.depth = 100;
        this.arrow.depth = 90;
        this.graphics = this.add.graphics();

        // movement properties (change for balance)
        this.player.setBounce(0.8);
        this.player.setFriction(1);
        this.gravity = 0.5;

        //collision
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if ((bodyA.gameObject && bodyA.gameObject.texture.key == 'goal1') || (bodyB.gameObject && bodyB.gameObject.texture.key == 'goal1')) {
                this.player2score++;
                this.player.setPosition(670, 40);
                this.player.setVelocity(0);
                this.playerturn = 0;
            } else if ((bodyA.gameObject && bodyA.gameObject.texture.key == 'goal2') || (bodyB.gameObject && bodyB.gameObject.texture.key == 'goal2')) {
                this.player1score++;
                this.player.setPosition(50, 870);
                this.player.setVelocity(0);
                this.playerturn = 1;
            } else {
                this.sound.play('bounce');
            }
        }.bind(this));
        
        // mouse functions
        this.pointer = this.input.activePointer;
        this.input.on('pointerup', this.fling.bind(this));
    }

    update(){
        // show/hide arrow whether ball is moving or not
        if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1) {
            this.arrow.alpha = 100;
            this.graphics.clear();
            if (this.playerturn % 2 == 0) {
                this.graphics.lineStyle(10, 0xd50000);
            } else {
                this.graphics.lineStyle(10, 0x2195f3);
            }
            this.graphics.lineBetween(this.player.body.position.x, this.player.body.position.y, this.pointer.x, this.pointer.y);
            var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.body.position.x, this.player.body.position.y, this.pointer.x, this.pointer.y);
            this.arrow.setAngle(angle);
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
        this.arrow.body.position.x = this.player.body.position.x + 82;
        this.arrow.body.position.y = this.player.body.position.y - 12;
        // set gravity of ball based on side of screen
        //this.matter.world.setGravity(0, this.gravity);
        //update score
        this.p1score.text = this.player1score;
        this.p2score.text = this.player2score;
    }

    // launch mechanics chen clicked
    fling(pointer, player) {
        if (pointer.y < 40 && pointer.x > 630) {
            // ENTER MENU FUNCTION HERE
        } else if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1 && pointer.y > 40) {
            this.graphics.clear();
            this.slopey = 5 * (pointer.y - this.player.body.position.y);
            this.slopex = 5 * (pointer.x - this.player.body.position.x);
            this.player.setVelocity(this.slopex / 75, this.slopey / 75);
            this.playerturn++;
        }
    }

    nextlevel(){
        this.scene.start("level8Scene");
    }
}
