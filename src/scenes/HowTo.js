class HowTo extends Phaser.Scene {
    constructor() {
        super({
            key: "HowToScene",     
            physics: {
                //default: 'arcade',
                arcade: {
                    //debug: false
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
                    //debug: false
                }
            }
        });
    }

    create(){
        //audio
        this.loopingAudio = this.sound.add("TitleMusic").setVolume(0.2);
        if(isPlaying == false){
            this.loopingAudio.play({
                loop: true
            });
            isPlaying = true;
        }
        // set background
        this.shapes = this.cache.json.get('shapes');
        this.add.tileSprite(0, 0, 720, 860, 'plain').setOrigin(0, 0);

        // create objects
        this.add.sprite(100, 400, 'triangle').setScale(2);
        this.add.sprite(570, 580, 'goal2').setScale(1);
        this.add.sprite(100, 750, 'sticky').setScale(2, 5).setAngle(90);
        this.obstacle1 = this.matter.add.sprite(530, 350, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(4).setAngle(90).setAlpha(0);
        this.obstacle1 = this.matter.add.sprite(400, 240, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(4).setAlpha(0);
        this.player = this.matter.add.sprite(630, 340, '', null, { shape: this.shapes.circle });
        this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp2').setSize(30, 30).setOrigin(-0.31,0.45);
        
        // slime properties
        this.slopey = 0.0;
        this.slopex = 0.0;
        this.player.setDepth(1);
        this.arrow.depth = 1;
        this.player.setScale(1.5);
        this.player.setBounce(0.8);
        this.player.setFriction(1);
        this.matter.world.setGravity(0, 0.5);

        // How to Play Text (configurable)
        this.add.sprite(350, 40, 'selected').setAngle(90).setScale(1.5, 2).setDepth(3);
        this.add.text(360, 40, 'HOW TO PLAY', { font: '40px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.add.text(250, 200, 'This is a 2 player turn based game.\n each player decides\nwhether they are red or blue.\nOn your turn click in the\ndirection you want to go.\nThe launch velocity is determined by\nhow far away you click from the Slime.', { font: '28px Impact', fill: '#1b2cc2'}).setDepth(3).setOrigin(0.5);
        this.add.text(450, 400, 'The Slime will bounce off\nof obstacles like these.', { font: '30px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.add.text(230, 580, 'The main goal is to fling the\nSlime to your colored goal.', { font: '30px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.add.text(450, 750, 'Purple slime may appear\nand the slime will stick to it.\nSome windmill obstacles have a special\nslime that turns off gravity for one turn.', { font: '30px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);

        // Menu and Practice Buttons
        this.menuSelect = this.physics.add.sprite(93, 40, 'unselected').setInteractive().setScale(1.5).setAngle(90).setDepth(3);
        this.tutorialSelect = this.physics.add.sprite(623, 40, 'unselected').setInteractive().setScale(1.5, 1.2).setAngle(90).setDepth(3);
        this.add.text(100, 40, 'Main Menu', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.add.text(630, 40, 'Tutorial', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        
        // animation create
        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNames('slime_atlas', {
                prefix: 'Idle_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 0
            }),
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: 'Fling',
            frames: this.anims.generateFrameNames('slime_atlas', {
                prefix: 'Fling_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 0
            }),
            frameRate: 5,
            repeat: -1,
        });


        // mouse functions
        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        });

        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            this.player.setTexture('slime_atlas', 'Bounce');
            this.sound.play('bounce');
        }.bind(this));

        this.pointer = this.input.activePointer;
        this.input.on('pointerup', this.fling.bind(this));

    }

    // slime fling mechanics
    update() {
        if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1) {
            this.player.anims.play('Idle', true);
            this.arrow.alpha = 100;
            var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.player.body.position.x, this.player.body.position.y, this.pointer.x, this.pointer.y);
            this.arrow.setAngle(angle);
        } else {
            if (Math.abs(this.player.body.velocity.x) < 5 && Math.abs(this.player.body.velocity.y) < 5) {
                this.player.setTexture('slime_atlas', 'Bounce');
            } else {
                this.player.anims.play('Fling', true);
            }
            this.arrow.alpha = 0;
        }
        this.arrow.body.position.x = this.player.body.position.x + 82;
        this.arrow.body.position.y = this.player.body.position.y - 12;
    }

    fling(pointer, player) {
        if (this.menuSelect.texture.key == 'selected') {
            this.sound.play('Select');
            this.scene.start("menuScene");
        } else if (this.tutorialSelect.texture.key == 'selected') {
            this.sound.play('Select');
            this.scene.start("level0Scene");
        } else if(!this.gameisPaused && Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1) {
            this.sound.play('Launch');
            this.slopey = 5 * (pointer.y - this.player.body.position.y);
            this.slopex = 5 * (pointer.x - this.player.body.position.x);
            this.player.setVelocity(this.slopex / 75, this.slopey / 75);
        }
    }
}