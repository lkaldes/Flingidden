class Level11 extends Phaser.Scene {
    constructor() {
        super({
            key: "level11Scene",     
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

    create(){

        
        this.game.sound.stopAll();
        this.sound.play('Start');
        //play music
        this.loopingAudio = this.sound.add("GardenMusic").setVolume(0.2);
        this.loopingAudio.play({
            loop: true
        });

        this.shapes = this.cache.json.get('shapes');
        //movement and scene creation
        this.add.tileSprite(0, 0, 720, 860, 'garden').setOrigin(0, 0);

        this.obstacle1 = this.matter.add.sprite(660, 200, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);
        this.obstacle2 = this.matter.add.sprite(360, 680, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);
        this.obstacle1extend = this.matter.add.sprite(360, 200, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);
        this.obstacle2extend = this.matter.add.sprite(50, 680, 'obstacle', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(2.5).setAngle(90);

        this.windmill = this.matter.add.sprite(360, 440, 'windmill', null, { isStatic: true, shape: this.shapes.windmill }).setScale(8);

        
        this.playerturn = 0;
        this.player1score = 0;
        this.player2score = 0;
        // flip a coin to determine starting position
        if (Phaser.Math.Between(1,2) == 1) {
            this.player = this.matter.add.sprite(180, 40, '', null, { shape: this.shapes.circle }).setAngle(180);
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp2').setSize(30, 30).setOrigin(-0.31,0.45);
        } else {
            this.player = this.matter.add.sprite(540, 870, '', null, { shape: this.shapes.circle });
            this.arrow = this.physics.add.sprite(720/2, 430, 'arrowp1').setSize(30, 30).setOrigin(-0.31,0.45);
            this.playerturn++;
        }

        // create goals
        this.goal1 = this.matter.add.sprite(660, 105, 'goal1', null, { isStatic: true, shape: this.shapes.tempgoal}).setScale(0.75);
        this.goal2 = this.matter.add.sprite(60, 805, 'goal2', null, { isStatic: true, shape: this.shapes.tempgoal}).setScale(0.75);
        
        // UI properties
        this.scoreboard = this.matter.add.sprite(350, -80, 'header', null, { isStatic: true, shape: this.shapes.obstacle }).setScale(6).setAngle(90).setDepth(2);
        this.p1score = this.add.text(50, 20, '0', { font: '28px Impact', fill: '#d50000'}).setOrigin(0.5).setDepth(3);
        this.p2score = this.add.text(130, 20, '0', { font: '28px Impact', fill: '#2195f3'}).setOrigin(0.5).setDepth(3);
        this.add.text(90, 20, '-', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.add.text(360, 20, 'Spin to Win', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.menuSelect = this.physics.add.sprite(670, 20, 'unselected').setInteractive().setAngle(90).setScale(0.5, 1).setSize(50,40).setDepth(2);
        this.menu = this.add.text(670, 20, 'Menu', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);

        this.nextButton = this.physics.add.sprite(520, 520, 'unselected').setInteractive().setScale(1.5).setAngle(90).setDepth(3).setAlpha(0);
        this.menuButton = this.physics.add.sprite(220, 520, 'unselected').setInteractive().setScale(1.5).setAngle(90).setDepth(3).setAlpha(0);
        this.levelselectButton = this.physics.add.sprite(500, 450, 'unselected').setInteractive().setScale(1.5, 1.7).setAngle(90).setDepth(3).setAlpha(0);
        this.restartButton = this.physics.add.sprite(220, 450, 'unselected').setInteractive().setScale(1.5).setAngle(90).setDepth(3).setAlpha(0);

        // pause game
        this.gameisPaused = false;
        this.createPauseScreen();

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        });

        // ball/arrow properties
        this.slopey = 0.0;
        this.slopex = 0.0;
        this.player.setDepth(1);
        this.arrow.depth = 1;
        this.graphics = this.add.graphics();
        this.player.setScale(1.5);

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

        // movement properties (change for balance)
        this.player.setBounce(0.8);
        this.player.setFriction(1);
        this.gravity = 0.5;

        //collision
        this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
            if ((bodyA.gameObject && bodyA.gameObject.texture.key == 'goal1') || (bodyB.gameObject && bodyB.gameObject.texture.key == 'goal1')) {
                this.player2score++;
                this.player.setPosition(180, 40);
                this.player.setVelocity(0);
                this.player.setAngularVelocity(0);
                this.player.setAngle(180);
                this.playerturn = 0;
            } else if ((bodyA.gameObject && bodyA.gameObject.texture.key == 'goal2') || (bodyB.gameObject && bodyB.gameObject.texture.key == 'goal2')) {
                this.player1score++;
                this.player.setPosition(540, 870);
                this.player.setVelocity(0);
                this.player.setAngularVelocity(0);
                this.player.setAngle(0);
                this.playerturn = 1;
            } else if ((bodyA.gameObject && bodyA.gameObject.texture.key == 'sticky') || (bodyB.gameObject && bodyB.gameObject.texture.key == 'sticky')) {
                this.sticky = true;
                this.matter.world.setGravity(0, 0);
                this.player.setVelocity(0);
                this.player.setAngularVelocity(0);
            } else {
                this.player.setTexture('slime_atlas', 'Bounce');
                this.sound.play('bounce');
            }
        }.bind(this));
        
        // mouse functions
        this.pointer = this.input.activePointer;
        this.input.on('pointerup', this.fling.bind(this));
    }

    update(){
        // show/hide arrow whether ball is moving or not
        if (!this.gameisPaused){
            if (Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1) {
                this.player.anims.play('Idle', true);
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
                if (Math.abs(this.player.body.velocity.x) < 5 && Math.abs(this.player.body.velocity.y) < 5) {
                    this.player.setTexture('slime_atlas', 'Bounce');
                } else {
                    this.player.anims.play('Fling', true);
                }
                this.graphics.clear();
                this.arrow.alpha = 0;
            }
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
        
        this.windmill.angle += 1;
        //update score
        this.p1score.text = this.player1score;
        this.p2score.text = this.player2score;
        if (this.player1score == 3 && !this.gameisPaused) {
            this.gameisPaused = true;
            this.victory(1);
        } else if (this.player2score == 3 && !this.gameisPaused) {
            this.gameisPaused = true;
            this.victory(2);
        }
    }

    // launch mechanics when clicked
    fling(pointer, player) {
        if (this.menuSelect.texture.key == 'selected' && this.gameisPaused == false) {
            this.sound.play('Select');
            this.pauseGame(true);
            this.menuSelect.setDepth(0);
            this.gameisPaused = true;
        } else if (this.continueSelect.texture.key == 'selected') {
            this.sound.play('Select');
            this.unpauseGame(false);
            this.menuSelect.setDepth(3);
        } else if (this.restartButton.texture.key == 'selected' || this.resetlevelSelect.texture.key == 'selected') {
            this.sound.play('Select');
            this.scene.restart();
        } else if (this.nextButton.texture.key == 'selected') {
            this.sound.play('Select');
            this.scene.start("level12Scene");
        } else if (this.menuButton.texture.key == 'selected' || this.mainMenuSelect.texture.key == 'selected') {
            this.game.sound.stopAll();
            this.sound.play('Select');
            isPlaying = false;
            this.scene.start("menuScene");
        } else if (this.levelSelect.texture.key == 'selected' || this.levelselectButton.texture.key == 'selected') {
            this.game.sound.stopAll();
            this.sound.play('Select');
            isPlaying = false;
            this.scene.start("levelselect3Scene");
        } else if(!this.gameisPaused && Math.abs(this.player.body.velocity.x) < 0.1 && Math.abs(this.player.body.velocity.y) < 1 && pointer.y > 40) {
            this.graphics.clear();
            this.sound.play('Launch');
            this.sticky = false;
            this.slopey = 5 * (pointer.y - this.player.body.position.y);
            this.slopex = 5 * (pointer.x - this.player.body.position.x);
            this.player.setVelocity(this.slopex / 75, this.slopey / 75);
            this.playerturn++;
        }
    }

    createPauseScreen(){
        this.veil = this.add.graphics({ x: 0, y: 0 });
        this.veil.fillStyle('0x000000', 0.3);
        this.veil.fillRect(0, 0, game.config.width, game.config.height);
        this.veil.setDepth(2);
        this.veil.setScrollFactor(0);

        this.txt_pauseFlair = this.add.sprite(353, 360, 'selected').setScale(1.5).setAngle(90).setDepth(11);
        this.txt_pause = this.add.text(360, 360, 'PAUSE', { font: '48px Impact', fill: '#d50000'}).setOrigin(0.5).setDepth(12).setScrollFactor(0);
        this.continueSelect = this.physics.add.sprite(353, 420, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40).setDepth(10);
        this.continue = this.add.text(360, 420, 'Continue', { font: '30px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(12).setScrollFactor(0).setDepth(11);

        this.resetlevelSelect = this.physics.add.sprite(353, 500, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40).setDepth(10);
        this.resetlevel = this.add.text(360, 500, 'Restart', { font: '30px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(12).setScrollFactor(0).setDepth(11);

        this.mainMenuSelect = this.physics.add.sprite(353, 660, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40).setDepth(10);
        this.mainMenu = this.add.text(360, 660, 'Main Menu', { font: '30px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(12).setScrollFactor(0).setDepth(11);

        this.levelSelect = this.physics.add.sprite(360, 580, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40).setDepth(10);
        this.level = this.add.text(360, 580, 'Level Select', { font: '30px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(12).setScrollFactor(0).setDepth(11);

        this.menuBoarder = this.physics.add.sprite(360, 520, 'popup').setScale(12, 3).setSize(130,40).setDepth(9);

        this.pauseGame(false);
    }

    pauseGame(is_visible){
        this.veil.setVisible(is_visible);
        this.txt_pause.setVisible(is_visible);
        this.txt_pauseFlair.setVisible(is_visible);
        this.continue.setVisible(is_visible);
        this.continueSelect.setVisible(is_visible);
        this.mainMenuSelect.setVisible(is_visible);
        this.mainMenu.setVisible(is_visible);
        this.mainMenuSelect.setVisible(is_visible);
        this.mainMenu.setVisible(is_visible);
        this.levelSelect.setVisible(is_visible);
        this.level.setVisible(is_visible);
        this.resetlevelSelect.setVisible(is_visible);
        this.resetlevel.setVisible(is_visible);
        this.menuBoarder.setVisible(is_visible);
    }

    unpauseGame(is_visible){
        this.veil.setVisible(is_visible);
        this.txt_pause.setVisible(is_visible);
        this.txt_pauseFlair.setVisible(is_visible);
        this.continue.setVisible(is_visible);
        this.continueSelect.setVisible(is_visible);
        this.mainMenuSelect.setVisible(is_visible);
        this.mainMenu.setVisible(is_visible);
        this.levelSelect.setVisible(is_visible);
        this.level.setVisible(is_visible);
        this.menuBoarder.setVisible(is_visible);
        this.resetlevelSelect.setVisible(is_visible);
        this.resetlevel.setVisible(is_visible);
        this.time.addEvent({ delay: 500, callback: () => {this.gameisPaused = false}, callbackScope: this})
    }

    victory(player){
        this.veil.setVisible(true);
        this.game.sound.stopAll();
        this.sound.play('Complete');
        this.graphics.clear();
        this.arrow.alpha = 0;
        this.player.alpha = 0;
        this.p1score.text = this.player1score;
        this.p2score.text = this.player2score;
        this.add.sprite(353, 350, 'header').setScale(10,4).setAngle(90).setDepth(2);
        this.nextButton.setAlpha(1);
        this.add.text(527, 520, 'Next Level', { font: '40px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(4);
        this.menuButton.setAlpha(1);
        this.add.text(227, 520, 'Main Menu', { font: '40px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(4);
        this.restartButton.setAlpha(1);
        this.add.text(227, 450, 'Restart', { font: '40px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(4);
        this.levelselectButton.setAlpha(1);
        this.add.text(510, 450, 'Level Select', { font: '40px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(4);
        this.add.sprite(350, 220, 'selected').setScale(2,3.7).setAngle(90).setDepth(3);
        this.winplayer = this.add.sprite(180, 345, '').setScale(1.7).setDepth(3);
        if (player == 1) {
            this.add.text(360, 220, 'RED WINS!', { font: '70px Impact', fill: '#d50000'}).setOrigin(0.5).setDepth(3);
        } else {
            this.winplayer.setPosition(540, 345);
            this.winplayer.flipX = true;
            this.add.text(360, 220, 'BLUE WINS!', { font: '70px Impact', fill: '#2195f3'}).setOrigin(0.5).setDepth(3);
        }
        this.winplayer.anims.play('Idle');
        this.add.sprite(353, 340, 'selected').setScale(1.5).setAngle(90).setDepth(3);
        this.add.text(300, 340, this.player1score, { font: '60px Impact', fill: '#d50000'}).setOrigin(0.5).setDepth(3);
        this.add.text(420, 340, this.player2score, { font: '60px Impact', fill: '#2195f3'}).setOrigin(0.5).setDepth(3);
        this.add.text(360, 340, '-', { font: '60px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.menuSelect.setDepth(0);
    }
}