class LevelSelect extends Phaser.Scene {
    constructor() {
        super("levelselectScene");
    }
    
    preload(){
        this.load.image('lvl1', './assets/LevelScreenshots/Level1.png');
        this.load.image('lvl2', './assets/LevelScreenshots/Level2.png');
        this.load.image('lvl3', './assets/LevelScreenshots/Level3.png');
        this.load.image('lvl4', './assets/LevelScreenshots/Level4.png');
        this.load.image('lvl5', './assets/LevelScreenshots/Level5.png');
    }

    create(){
        this.add.tileSprite(0, 0, 720, 860, 'levelselect').setOrigin(0, 0);

        this.add.image(180, 240, 'lvl1').setScale(0.15);
        this.add.image(540, 240, 'lvl2').setScale(0.15);
        this.add.image(180, 240, 'lvl3').setScale(0.15);
        this.add.image(180, 240, 'lvl4').setScale(0.15);
        this.add.image(180, 240, 'lvl5').setScale(0.15);
        
        /*this.lvl = this.physics.add.sprite(353, 340, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.tut = this.physics.add.sprite(353, 450, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.htp = this.physics.add.sprite(353, 560, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 340, 'Level Select', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 450, 'Tutorial', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 560, 'How to Play', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        });
        this.input.on('pointerup', function (pointer) {
            if (this.lvl.texture.key == 'selected') {
                this.scene.start("level2Scene");
            } else if (this.tut.texture.key == 'selected') {
                this.scene.start("level0Scene");
            } else if (this.htp.texture.key == 'selected') {
                //this.scene.start("howtoplay");
            }
        }.bind(this));
        */
    }

}
