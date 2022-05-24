/*
Group: Noah Hart, Leon Chen, Liam Kaldes
Game Title: Ghost Hunter
Date Completed: 5/2/22
Small edits made prior to submit date
Creative tilt - spooky theme where you can shoot ghost!
*/

let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 860,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Level0, Level1, Level3 ]
}

let game = new Phaser.Game(config);

// jump, restart, fire keys
let click, keyW;