class Level20 extends Phaser.Scene {
    constructor() {
        super({
            key: "level20Scene",     
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

        //this.matter.world.disableGravity();
        this.shapes = this.cache.json.get('shapes');
        //movement and scene creation
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);

        this.obstacle1 = this.matter.add.sprite(660, 180, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);
        this.obstacle2 = this.matter.add.sprite(60, 180, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);
        this.obstacle3 = this.matter.add.sprite(660, 680, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);
        this.obstacle4 = this.matter.add.sprite(60, 680, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);

        this.obstacle5 = this.matter.add.sprite(40, 440, 'eqtriangle', null, { isStatic: true, shape: this.shapes.equaltriangle }).setScale(4).setAngle(90);
        this.obstacle6 = this.matter.add.sprite(680, 440, 'eqtriangle', null, { isStatic: true, shape: this.shapes.equaltriangle }).setScale(4).setAngle(270);

        this.obstacle7 = this.matter.add.sprite(260, 440, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle });
        this.obstacle8 = this.matter.add.sprite(460, 440, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle });

        this.obstacle9 = this.matter.add.sprite(360, 300, 'square', null, { isStatic: true, shape: this.shapes.square }).setScale(0.75).setAngle(45);
        this.obstacle10 = this.matter.add.sprite(360, 600, 'square', null, { isStatic: true, shape: this.shapes.square }).setScale(0.75).setAngle(45);

        this.sticky1 = this.matter.add.sprite(110, 630, 'sticky', null, { isStatic: true, shape: this.shapes.horizontal_slime }).setScale(2.5).setOrigin(0.5, 0.47);
        this.sticky2 = this.matter.add.sprite(110, 230, 'sticky', null, { isStatic: true, shape: this.shapes.horizontal_slime }).setScale(2.5).setOrigin(0.5, 0.53);
        this.sticky3 = this.matter.add.sprite(610, 630, 'sticky', null, { isStatic: true, shape: this.shapes.horizontal_slime }).setScale(2.5).setOrigin(0.5, 0.47);
        this.sticky4 = this.matter.add.sprite(610, 230, 'sticky', null, { isStatic: true, shape: this.shapes.horizontal_slime }).setScale(2.5).setOrigin(0.5, 0.53);

        this.obstacle1.alpha = 0;
        this.obstacle2.alpha = 0;
        this.obstacle3.alpha = 0;
        this.obstacle4.alpha = 0;
        this.obstacle5.alpha = 0;
        this.obstacle6.alpha = 0;
        this.obstacle7.alpha = 0;
        this.obstacle8.alpha = 0;
        this.obstacle9.alpha = 0;
        this.obstacle10.alpha = 0;
        this.sticky1.alpha = 0;
        this.sticky2.alpha = 0;
        this.sticky3.alpha = 0;
        this.sticky4.alpha = 0;


        this.scoreboard = this.matter.add.sprite(350, -80, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(6).setAngle(90);
        this.playerturn = 0;
        this.player1score = 0;
        this.player2score = 0;
        // flip a coin to determine starting position
        if (Phaser.Math.Between(1,2) == 1) {
            this.player = this.matter.add.sprite(360, 60, 'circle', null, { shape: this.shapes.circle });
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp2').setSize(30, 30).setOrigin(-0.31,0.45);
        } else {
            this.player = this.matter.add.sprite(360, 840, 'circle', null, { shape: this.shapes.circle });
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp1').setSize(30, 30).setOrigin(-0.31,0.45);
            this.playerturn++;
        }

        // create goals
        this.goal1 = this.matter.add.sprite(720/2, 400, 'goal1', null, { isStatic: true, shape: this.shapes.tempgoal}).setScale(0.75);
        this.goal2 = this.matter.add.sprite(720/2, 480, 'goal2', null, { isStatic: true, shape: this.shapes.tempgoal}).setScale(0.75);
        
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
                       this.player1score++;
                       this.nextlevel();
                   } else if ((bodyA.gameObject && bodyA.gameObject.texture.key == 'goal2') || (bodyB.gameObject && bodyB.gameObject.texture.key == 'goal2')) {
                       this.player2score++;
                       this.nextlevel();
                   } else if ((bodyA.gameObject && bodyA.gameObject.texture.key == 'sticky') || (bodyB.gameObject && bodyB.gameObject.texture.key == 'sticky')) {
                       this.sticky = true;
                       this.matter.world.setGravity(0, 0);
                       this.player.setVelocity(0);
                   } else {
                       this.sound.play('bounce');
                   }
               }.bind(this));
               
               // mouse functions
               this.input.on('pointerup', this.fling.bind(this));
               this.input.on('pointermove', this.point, this);
           }
       
           update(){
               // show/hide arrow whether ball is moving or not
               if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1) {
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
               this.arrow.body.position.x = this.player.body.position.x + 82;
               this.arrow.body.position.y = this.player.body.position.y - 12;
               // set gravity of ball based on side of screen
               if (!this.sticky) {
                   this.player.setFriction(1);
                   if (this.player.body.position.y < 430) {
                       this.matter.world.setGravity(0, -this.gravity);
                   } else if (this.player.body.position.y > 430){
                       this.matter.world.setGravity(0, this.gravity);
                   }
               } else {
                   this.matter.world.setGravity(0, 0);
                   this.player.setVelocity(0);
               }
       
           }
       
           // launch mechanics chen clicked
           fling(pointer, player) {
               if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1) {
                   this.graphics.clear();
                   this.sticky = false;
                   this.slopey = 5 * (pointer.y - this.player.body.position.y);
                   this.slopex = 5 * (pointer.x - this.player.body.position.x);
                   this.player.setVelocity(this.slopex / 75, this.slopey / 75);
                   this.playerturn++;
               }
           }
       
           // arrow pointing when mouse moves
           point(pointer, player) {
               if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1) {
                   this.graphics.clear();
                   if (this.playerturn % 2 == 0) {
                       this.graphics.lineStyle(10, 0xd50000);
                   } else {
                       this.graphics.lineStyle(10, 0x2195f3);
                   }
                   this.graphics.lineBetween(this.player.body.position.x, this.player.body.position.y, pointer.x, pointer.y);
                   var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.body.position.x, this.player.body.position.y, pointer.x, pointer.y);
                   this.arrow.setAngle(angle);
               }
           }
       
           nextlevel(){
               this.scene.start("level0Scene");
           }
       }