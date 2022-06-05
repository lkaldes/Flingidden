class Credits extends Phaser.Scene {
    constructor() {
        super({
            key: "CreditsScene",     
            physics: {
                //default: 'arcade',
                arcade: {
                    //debug: false
                },
                matter: {
                    gravity: {
                        y: 0
                    },
                    setBounds: {
                        left: true,
                        right: true,
                        top: true,
                        bottom: true
                    },
                    //debug: false
                }
            }
        });
    }

    create(){
        // Audio and Background
        this.loopingAudio = this.sound.add("TitleMusic").setVolume(0.1);
        if(isPlaying == false){
            this.loopingAudio.play({
                loop: true
            });
            isPlaying = true;
        }
        this.shapes = this.cache.json.get('shapes');
        this.add.tileSprite(0, 0, 720, 860, 'plain').setOrigin(0, 0);

        // slime
        this.player = this.add.sprite(80, 240, '').setScale(2.5).setAngle(-15);
        this.anims.create({
            key: 'Fling',
            frames: this.anims.generateFrameNames('slime_atlas', {
                prefix: 'Fling_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 0
            }),
            frameRate: 5,
            repeat: -1,
        });
        this.player.anims.play('Fling');
        // Objects
        this.windmill = this.matter.add.sprite(80, 480, 'windmill', null, { isStatic: true, shape: this.shapes.windmill }).setScale(3);
        this.add.sprite(30, 730, 'sticky').setScale(2);
        this.circle = this.add.sprite(100, 680, 'circleobstacle').setScale(1.5);
        // Menu and Practice Buttons
        this.menuSelect = this.physics.add.sprite(93, 40, 'unselected').setInteractive().setScale(1.5).setAngle(90).setDepth(3);
        this.levelSelect = this.physics.add.sprite(603, 40, 'unselected').setInteractive().setScale(1.5, 1.5).setAngle(90).setDepth(3);
        this.add.text(100, 40, 'Main Menu', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);
        this.add.text(610, 40, 'Level Select', { font: '36px Impact', fill: '#1b2cc2'}).setOrigin(0.5).setDepth(3);

        //Credits
        this.add.text(280, 240, 'Liam Kaldes:', { font: '40px Impact', fill: '#1b2cc2', align: 'center'}).setOrigin(0.5).setDepth(3);
        this.add.text(425, 320, 'Slime/Player/Physics Mechanics,\nVictory Screen, Scoreboard,\nMouse Click Mechanics', { font: '36px Impact', fill: '#2195f3', align: 'left'}).setOrigin(0.5).setDepth(3);
        this.add.text(260, 480, 'Noah Hart:', { font: '40px Impact', fill: '#1b2cc2', align: 'center'}).setOrigin(0.5).setDepth(3);
        this.add.text(368, 560, 'Level Design, Pause Menu,\nMain Menu, Level Select,\nHow to Play', { font: '36px Impact', fill: '#2195f3', align: 'left'}).setOrigin(0.5).setDepth(3);
        this.add.text(265, 680, 'Leon Chen:', { font: '40px Impact', fill: '#1b2cc2', align: 'center'}).setOrigin(0.5).setDepth(3);
        this.add.text(307, 730, 'Art/Sound Design', { font: '36px Impact', fill: '#2195f3', align: 'left'}).setOrigin(0.5).setDepth(3);

        // mouse functions
        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.setTexture('selected');
        });
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setTexture('unselected');
        }); 
        this.input.on('pointerup', this.click.bind(this));
    }

    update() {
        this.windmill.angle--;
        this.circle.angle += 0.5;
    }

    click(pointer, player) {
        if (this.menuSelect.texture.key == 'selected') {
            this.sound.play('Select');
            this.scene.start("menuScene");
        } else if (this.levelSelect.texture.key == 'selected') {
            this.sound.play('Select');
            this.scene.start("levelselect1Scene");
        }
    }
}