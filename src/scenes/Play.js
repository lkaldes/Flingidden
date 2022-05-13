class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        this.load.image('circle', './assets/circle.png');
        
        
    }

    create(){
        this.player = this.physics.add.sprite(300, 400, 'circle');
        
    }

    update(){

        
    }
}
