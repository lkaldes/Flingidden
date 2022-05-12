class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.image('title', './assets/TitleScreen.png');
    }

    create(){
        this.hiscoreword = this.add.text(300, borderUISize + borderPadding - 16, 'High Score: ', { font: '28px Impact', fill: '#f73636'}).setOrigin(0.5);
        
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
          }
    }

}