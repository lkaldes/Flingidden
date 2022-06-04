class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload(){
        this.load.path = 'assets/';
        this.load.image('title', 'backgrounds/TitleScreen.png');
        this.load.image('plain', 'backgrounds/howtopage.png');
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
        this.load.image('unselected', 'obstacles/Border.png');
        this.load.image('selected', 'obstacles/slimerectangle.png');
        this.load.image('popup', 'obstacles/GreenBorder.png');
        this.load.image('header', 'obstacles/GreenBorder.png');
        this.load.image('goal1', 'bluegoal.png');
        this.load.image('goal2', 'redgoal.png');
        this.load.image('arrowp2', 'slime/blueArrow.png');
        this.load.image('arrowp1', 'slime/redArrow.png');
        this.load.audio('Select', 'sounds/LevelSelect.wav');
        this.load.audio('Complete', 'sounds/LevelComplete.wav');
        this.load.audio('Launch', 'sounds/SlimeLaunch.wav');
        this.load.audio('Start', 'sounds/LevelStart.wav');
        this.load.audio('bounce', 'sounds/SlimeCollide.wav');
        this.load.audio('TitleMusic','sounds/TitleMusic.mp3');
        this.load.audio('SpaceMusic','sounds/SpaceMusic.mp3');
        this.load.audio('KitchenMusic','sounds/KitchenMusic.mp3');
        this.load.audio('GardenMusic','sounds/GardenMusic.mp3');
        this.load.audio('IntersectionMusic','sounds/IntersectionMusic.mp3');
        this.load.json('shapes', 'obstacles/Shapes.json');

        //Level select Images
        this.load.image('lvl1', './assets/LevelScreenshots/Level1.png');
        this.load.image('lvl2', './assets/LevelScreenshots/Level2.png');
        this.load.image('lvl3', './assets/LevelScreenshots/Level3.png');
        this.load.image('lvl4', './assets/LevelScreenshots/Level4.png');
        this.load.image('lvl5', './assets/LevelScreenshots/Level5.png');
        this.load.image('lvl6', './assets/LevelScreenshots/Level6.png');
        this.load.image('lvl7', './assets/LevelScreenshots/Level7.png');
        this.load.image('lvl8', './assets/LevelScreenshots/Level8.png');
        this.load.image('lvl9', './assets/LevelScreenshots/Level9.png');
        this.load.image('lvl10', './assets/LevelScreenshots/Level10.png');
        this.load.image('lvl11', './assets/LevelScreenshots/Level11.png');
        this.load.image('lvl12', './assets/LevelScreenshots/Level12.png');
        this.load.image('lvl13', './assets/LevelScreenshots/Level13.png');
        this.load.image('lvl14', './assets/LevelScreenshots/Level14.png');
        this.load.image('lvl15', './assets/LevelScreenshots/Level15.png');
        this.load.image('lvl16', './assets/LevelScreenshots/Level16.png');
        this.load.image('lvl17', './assets/LevelScreenshots/Level17.png');
        this.load.image('lvl18', './assets/LevelScreenshots/Level18.png');
        //this.load.image('lvl19', './assets/LevelScreenshots/Level19.png');
        //this.load.image('lvl20', './assets/LevelScreenshots/Level20.png');

        //load slime animation
        this.load.atlas('slime_atlas', 'slime/slimeanimation.png', 'slime/slimemap.json');
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'title').setOrigin(0, 0);
        this.lvl = this.physics.add.sprite(353, 420, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.htp = this.physics.add.sprite(353, 530, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 420, 'Level Select', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 530, 'How to Play', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);


        //play music
        //this.game.sound.stopAll();
        this.loopingAudio = this.sound.add("TitleMusic").setVolume(0.1);
        if(isPlaying == false){
            this.loopingAudio.play({
                loop: true
            });
            isPlaying = true;
        }


        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        });
        this.input.on('pointerup', function (pointer) {
            if (this.lvl.texture.key == 'selected') {
                this.sound.play('Select');
                this.scene.start("levelselect1Scene");
            } else if (this.htp.texture.key == 'selected') {
                this.sound.play('Select');
                this.scene.start("HowToScene");
            }
        }.bind(this));
    } 

}
