/*
Group: Noah Hart, Leon Chen, Liam Kaldes
Game Title: Ghost Hunter
Date Completed: 5/2/22
Small edits made prior to submit date
Creative tilt - spooky theme where you can shoot ghost!
*/

let config = {
    type: Phaser.CANVAS,
    width: 480,
    height: 550,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 700},
            //debug: true
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// jump, restart, fire keys
let keyW, keyR, keyF, keyM;