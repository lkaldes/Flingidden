class LevelSelect2 extends Phaser.Scene {
    constructor() {
        super("levelselect2Scene");
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

        this.lvl6 = this.add.image(180, 240, 'lvl1').setScale(0.125).setDepth(1).setInteractive();
        this.lvl7 = this.add.image(540, 240, 'lvl2').setScale(0.125).setDepth(1).setInteractive();
        this.lvl8 = this.add.image(120, 580, 'lvl3').setScale(0.125).setDepth(1).setInteractive();
        this.lvl9 = this.add.image(360, 580, 'lvl4').setScale(0.125).setDepth(1).setInteractive();
        this.lvl10 = this.add.image(600, 580, 'lvl5').setScale(0.125).setDepth(1).setInteractive();

        this.add.image(175, 250, 'popup').setScale(5, 2.3);
        this.add.image(535, 250, 'popup').setScale(5, 2.3);
        this.add.image(115, 590, 'popup').setScale(5.25, 2.3);
        this.add.image(355, 590, 'popup').setScale(5.25, 2.3);
        this.add.image(595, 590, 'popup').setScale(5.25, 2.3);

        this.rightarrow = this.add.image(690, 820, 'arrowp2').setScale(1.25).setInteractive();
        this.leftarrow = this.add.image(30, 815, 'arrowp2').setScale(1.25).setAngle(180).setInteractive();

        this.menuButton = this.physics.add.sprite(353, 810, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 810, 'Menu', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        

        this.add.text(180, 120, 'The Basics', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(180, 360, '2-1', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(540, 120, 'Angles!', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(540, 360, '2-2', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(120, 460, "What's this goop?", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(120, 700, '2-3', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 460, "Critical Bounce", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 700, '2-4', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(600, 460, "All signs point mid", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(600, 700, '2-5', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        

        this.input.on('gameobjectover', function (pointer, gameObject) {
            if(gameObject.texture.key != 'arrowp1' && gameObject.texture.key != 'arrowp2' && gameObject.texture.key != 'unselected' && gameObject.texture.key != 'selected'){
                gameObject.setScale(0.2);
            } else if(gameObject.texture.key == 'unselected'){
                gameObject.setTexture('selected');
            } else{
                gameObject.setTexture('arrowp1');
                gameObject.setScale(1.5);
            }
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            if(gameObject.texture.key != 'arrowp1' && gameObject.texture.key != 'arrowp2' && gameObject.texture.key != 'unselected' && gameObject.texture.key != 'selected'){
                gameObject.setScale(0.125);
            }else if(gameObject.texture.key == 'selected'){
                gameObject.setTexture('unselected');
            }else{
                gameObject.setTexture('arrowp2');
                gameObject.setScale(1.25);
            }
        });
        this.input.on('pointerup', function (pointer) {
            if (this.lvl6.scale > 0.125) {
                this.scene.start("level6Scene");
            } else if (this.lvl7.scale > 0.125) {
                this.scene.start("level7Scene");
            } else if (this.lvl8.scale > 0.125) {
                this.scene.start("level8Scene");
            } else if (this.lvl9.scale > 0.125) {
                this.scene.start("level9Scene");
            } else if (this.lvl10.scale > 0.125) {
                this.scene.start("level10Scene");
            } else if (this.rightarrow.scale > 1.25) {
                this.scene.start("levelselect3Scene");
            } else if (this.leftarrow.scale > 1.25) {
                this.scene.start("levelselect1Scene");
            }else if (this.menuButton.texture.key == 'selected') {
                this.scene.start("menuScene");
            } 
        }.bind(this));
    }

}
