/*
Group: Noah Hart, Leon Chen, Liam Kaldes
Game Title: Flingidden
Date Completed: 6/2/22
Small edits made prior to submit date
Creative tilt - point and click game trying to fling the slime to your own goal
                while gravity changes in different areas.
                Also utilizes the bouncing physics
*/

let config = {
    type: Phaser.CANVAS,
    width: 720,
    height: 860,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        },
        matter: {
            //debug: true
        }
    },
    scene: [ Menu, LevelSelect1, LevelSelect2, LevelSelect3, LevelSelect4, Level0, Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8, Level9, 
        Level10, Level11, Level12, Level13, Level14, Level15, Level16, Level17, Level18]
}

let game = new Phaser.Game(config);

// jump, restart, fire keys
let click, keyW;