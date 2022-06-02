class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload(){
        this.load.path = 'assets/';
        this.load.image('title', 'backgrounds/TitleScreen.png');
        this.load.image('levelselect', 'backgrounds/LevelScreen.png');
        this.load.image('tutorial', 'backgrounds/TutorialBackground.png');
        this.load.image('kitchen', 'backgrounds/KB.png');
        this.load.image('garden', 'backgrounds/gardenbackground.png');
        this.load.image('space', 'backgrounds/SpaceBackground.png');
        this.load.image('intersection', 'backgrounds/Intersection.png');
        this.load.image('obstacle', 'obstacles/slimerectangle.png');
        this.load.image('circleobstacle', 'obstacles/slimecircle.png');
        this.load.image('square', 'obstacles/slimesquare.png');
        this.load.image('triangle', 'obstacles/slimetriangle.png');
        this.load.image('eqtriangle', 'obstacles/slimeequaltriangle.png');
        this.load.image('windmill', 'obstacles/windmill.png');
        this.load.image('stickywindmill', 'obstacles/stickywindmill.png');
        this.load.image('sticky', 'obstacles/stickyslime.png');
        this.load.image('unselected', 'obstacles/obstacle.png');
        this.load.image('selected', 'obstacles/slimerectangle.png');
        this.load.image('popup', 'obstacles/obstacle.png');
        this.load.image('header', 'obstacles/obstacle.png');
        this.load.image('goal1', 'bluegoal.png');
        this.load.image('goal2', 'redgoal.png');
        this.load.image('arrowp2', 'slime/blueArrow.png');
        this.load.image('arrowp1', 'slime/redArrow.png');
        this.load.audio('Select', 'sounds/LevelSelect.wav');
        this.load.audio('Complete', 'sounds/LevelComplete.wav');
        this.load.audio('Launch', 'sounds/SlimeLaunch.wav');
        this.load.audio('Start', 'sounds/LevelStart.wav');
        this.load.audio('bounce', 'sounds/SlimeCollide.wav');
        this.load.audio('Music1','sounds/Music1.mp3');
        this.load.audio('Music2','sounds/Music2.mp3');
        this.load.audio('Music3','sounds/Music3.mp3');
        this.load.audio('Music4','sounds/Music4.mp3');
        this.load.audio('Music5','sounds/Music5.mp3');
        this.load.json('shapes', 'obstacles/Shapes.json');

        //load slime animation
        this.load.atlas('slime_atlas', 'slime/slimeanimation.png', 'slime/slimemap.json');
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.lvl = this.physics.add.sprite(353, 450, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.tut = this.physics.add.sprite(353, 340, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.htp = this.physics.add.sprite(353, 560, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 450, 'Level Select', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 340, 'Tutorial', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 560, 'How to Play', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);


        this.game.sound.stopAll();
        //play music
        //this.sound.play('Music1');
        this.loopingAudio = this.sound.add("Music1");
        this.loopingAudio.play({
            loop: true
        });


        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        });
        this.input.on('pointerup', function (pointer) {
            if (this.lvl.texture.key == 'selected') {
                this.scene.start("levelselect1Scene");
                this.sound.play('Select');
            } else if (this.tut.texture.key == 'selected') {
                this.scene.start("level0Scene");
                this.sound.play('Select');
            } else if (this.htp.texture.key == 'selected') {
                this.scene.start("level7Scene");
                this.sound.play('Select');
                //this.scene.start("howtoplay");
            }
        }.bind(this));
    } 

}
