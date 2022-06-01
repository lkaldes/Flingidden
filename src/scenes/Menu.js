class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload(){
        this.load.image('circle', './assets/circle.png');
        this.load.image('title', './assets/background.png');
        this.load.image('kitchen', './assets/KB.png');
        this.load.image('garden', './assets/gardenbackground.png');
        this.load.image('obstacle', './assets/woodRectangle.png');
        this.load.image('header', './assets/obstacle.png');
        this.load.image('circleobstacle', './assets/woodcircle.png');
        this.load.image('square', './assets/square.png');
        this.load.image('triangle', './assets/woodtriangle.png');
        this.load.image('eqtriangle', './assets/equaltriangle.png');
        this.load.image('windmill', './assets/windmill.png');
        this.load.image('stickywindmill', './assets/stickywindmill.png');
        this.load.image('sticky', './assets/horizontal_slime.png')
        this.load.image('goal1', './assets/bluegoal.png');
        this.load.image('goal2', './assets/redgoal.png');
        this.load.image('arrowp2', './assets/blueArrow.png');
        this.load.image('arrowp1', './assets/redArrow.png');
        this.load.audio('bounce', './assets/BallBounceSound.wav');
        this.load.image('unselected', './assets/obstacle.png');
        this.load.image('selected', './assets/woodrectangle.png');
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.lvl = this.physics.add.sprite(353, 340, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.tut = this.physics.add.sprite(353, 440, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.htp = this.physics.add.sprite(353, 540, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.idk = this.physics.add.sprite(353, 640, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 340, 'Level Select', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 440, 'Tutorial', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 540, 'How to Play', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 640, 'IDK', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        });
        this.input.on('pointerup', function (pointer) {
            if (this.lvl.texture.key == 'selected') {
                this.scene.start("level1Scene");
            } else if (this.tut.texture.key == 'selected') {
                this.scene.start("level0Scene");
            } else if (this.htp.texture.key == 'selected') {
                //this.scene.start("howtoplay");
            } else if (this.idk.texture.key == 'selected') {
                //this.scene.start("idk");
            }
        }.bind(this));
    }

    update(){
        
    }

}
