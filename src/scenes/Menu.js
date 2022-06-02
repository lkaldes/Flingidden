class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload(){
        this.load.image('circle', './assets/circle.png');
        this.load.image('title', './assets/TitleScreen.png');
        this.load.image('levelselect', './assets/LevelScreen.png');
        this.load.image('tutorial', './assets/TutorialBackground.png');
        this.load.image('kitchen', './assets/KB.png');
        this.load.image('garden', './assets/gardenbackground.png');
        this.load.image('space', './assets/SpaceBackground.png');
        this.load.image('intersection', './assets/Intersection.png');
        this.load.image('obstacle', './assets/slimerectangle.png');
        this.load.image('header', './assets/obstacle.png');
        this.load.image('circleobstacle', './assets/slimecircle.png');
        this.load.image('square', './assets/slimesquare.png');
        this.load.image('triangle', './assets/slimetriangle.png');
        this.load.image('eqtriangle', './assets/slimeequaltriangle.png');
        this.load.image('windmill', './assets/windmill.png');
        this.load.image('stickywindmill', './assets/stickywindmill.png');
        this.load.image('sticky', './assets/stickyslime.png')
        this.load.image('goal1', './assets/bluegoal.png');
        this.load.image('goal2', './assets/redgoal.png');
        this.load.image('arrowp2', './assets/blueArrow.png');
        this.load.image('arrowp1', './assets/redArrow.png');
        this.load.audio('bounce', './assets/BallBounceSound.wav');
        this.load.image('unselected', './assets/obstacle.png');
        this.load.image('selected', './assets/slimerectangle.png');
        this.load.image('popup', './assets/obstacle.png');
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.lvl = this.physics.add.sprite(353, 450, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.tut = this.physics.add.sprite(353, 340, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.htp = this.physics.add.sprite(353, 560, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 450, 'Level Select', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 340, 'Tutorial', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 560, 'How to Play', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        });
        this.input.on('pointerup', function (pointer) {
            if (this.lvl.texture.key == 'selected') {
                this.scene.start("levelselect1Scene");
            } else if (this.tut.texture.key == 'selected') {
                this.scene.start("level0Scene");
            } else if (this.htp.texture.key == 'selected') {
                this.scene.start("level7Scene");
                //this.scene.start("howtoplay");
            }
        }.bind(this));
    } 

}
