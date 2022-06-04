class LevelSelect4 extends Phaser.Scene {
    constructor() {
        super("levelselect4Scene");
    }
    
    preload(){
        this.load.image('lvl16', './assets/LevelScreenshots/Level16.png');
        this.load.image('lvl17', './assets/LevelScreenshots/Level17.png');
        this.load.image('lvl18', './assets/LevelScreenshots/Level18.png');
        //this.load.image('lvl19', './assets/LevelScreenshots/Level19.png');
        //this.load.image('lvl20', './assets/LevelScreenshots/Level20.png');
    }

    create(){

        //audio
        this.loopingAudio = this.sound.add("TitleMusic").setVolume(0.1);
        if(isPlaying == false){
            this.loopingAudio.play({
                loop: true
            });
            isPlaying = true;
        }

        this.add.tileSprite(0, 0, 720, 860, 'levelselect').setOrigin(0, 0);

        this.lvl16 = this.add.image(180, 240, 'lvl16').setScale(0.125).setDepth(1).setInteractive();
        this.lvl17 = this.add.image(540, 240, 'lvl17').setScale(0.125).setDepth(1).setInteractive();
        this.lvl18 = this.add.image(365, 580, 'lvl18').setScale(0.125).setDepth(1).setInteractive();
        //this.lvl19 = this.add.image(360, 580, 'lvl19').setScale(0.125).setDepth(1).setInteractive();
        //this.lvl20 = this.add.image(600, 580, 'lvl20').setScale(0.125).setDepth(1).setInteractive();

        this.add.image(175, 250, 'popup').setScale(5, 2.3);
        this.add.image(535, 250, 'popup').setScale(5, 2.3);
        this.add.image(360, 590, 'popup').setScale(5.25, 2.3);
        //this.add.image(355, 590, 'popup').setScale(5.25, 2.3);
        //this.add.image(595, 590, 'popup').setScale(5.25, 2.3);

        //this.rightarrow = this.add.image(690, 820, 'arrowp2').setScale(1.25).setInteractive();
        this.leftarrow = this.add.image(30, 815, 'arrowp2').setScale(1.25).setAngle(180).setInteractive();

        this.menuButton = this.physics.add.sprite(353, 810, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 810, 'Menu', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        

        this.add.text(180, 120, 'No Where but UP', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(180, 360, '4-1', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(540, 120, 'O=E', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(540, 360, '4-2', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 460, "Hidden Truths", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 700, '4-3', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        //this.add.text(360, 460, "Fling and Zing", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        //this.add.text(360, 700, '4-4', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        //this.add.text(600, 460, "Signs of Life", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
       //this.add.text(600, 700, '4-5', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        

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
            if (this.lvl16.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level16Scene");
            } else if (this.lvl17.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level17Scene");
            } else if (this.lvl18.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level18Scene");
            }/* else if (this.lvl19.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level19Scene");
            } else if (this.lvl20.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level20Scene");
            } */ /*else if (this.rightarrow.scale > 1.25) {
                this.scene.start("levelselect1Scene");
            } */else if (this.leftarrow.scale > 1.25) {
                this.sound.play('Select');
                this.scene.start("levelselect3Scene");
            }else if (this.menuButton.texture.key == 'selected') {
                this.sound.play('Select');
                this.scene.start("menuScene");
            } 
        }.bind(this));
    }

}
