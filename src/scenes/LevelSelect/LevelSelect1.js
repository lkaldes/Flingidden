class LevelSelect1 extends Phaser.Scene {
    constructor() {
        super("levelselect1Scene");
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

        this.lvl1 = this.add.image(180, 240, 'lvl1').setScale(0.125).setDepth(1).setInteractive();
        this.lvl2 = this.add.image(540, 240, 'lvl2').setScale(0.125).setDepth(1).setInteractive();
        this.lvl3 = this.add.image(120, 580, 'lvl3').setScale(0.125).setDepth(1).setInteractive();
        this.lvl4 = this.add.image(360, 580, 'lvl4').setScale(0.125).setDepth(1).setInteractive();
        this.lvl5 = this.add.image(600, 580, 'lvl5').setScale(0.125).setDepth(1).setInteractive();

        this.add.image(175, 250, 'popup').setScale(5, 2.3);
        this.add.image(535, 250, 'popup').setScale(5, 2.3);
        this.add.image(115, 590, 'popup').setScale(5.25, 2.3);
        this.add.image(355, 590, 'popup').setScale(5.25, 2.3);
        this.add.image(595, 590, 'popup').setScale(5.25, 2.3);

        this.rightarrow = this.add.image(690, 820, 'arrowp2').setScale(1.25).setInteractive();
        //this.leftarrow = this.add.image(30, 815, 'arrowp2').setScale(1.25).setAngle(180).setInteractive();

        this.menuButton = this.physics.add.sprite(353, 810, 'unselected').setInteractive().setAngle(90).setScale(1.5).setSize(130,40);
        this.add.text(360, 810, 'Menu', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        

        this.add.text(180, 120, 'The Basics', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(180, 360, '1-1', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(540, 120, 'Angles!', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(540, 360, '1-2', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(120, 460, "What's this Goop?", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(120, 700, '1-3', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 460, "Critical Bounce", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(360, 700, '1-4', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(600, 460, "All Signs Point Mid", { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        this.add.text(600, 700, '1-5', { font: '28px Impact', fill: '#1b2cc2'}).setOrigin(0.5);
        

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
            if (this.lvl1.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level1Scene");
            } else if (this.lvl2.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level2Scene");
            } else if (this.lvl3.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level3Scene");
            } else if (this.lvl4.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level4Scene");
            } else if (this.lvl5.scale > 0.125) {
                this.sound.play('Start');
                this.scene.start("level5Scene");
            } else if (this.rightarrow.scale > 1.25) {
                this.sound.play('Select');
                this.scene.start("levelselect2Scene");
            }/* else if (this.leftarrow.scale > 1.25) {
                this.scene.start("levelselect4Scene");
            }*/else if (this.menuButton.texture.key == 'selected') {
                this.sound.play('Select');
                this.scene.start("menuScene");
            } 
        }.bind(this));
    }

}
