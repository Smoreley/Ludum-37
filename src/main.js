//var game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update, render: render});
const GAME_WIDTH = 640, GAME_HEIGHT = 360;

var game;

function init() {
    console.log("Initialized")
    
    game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game-canvas', null, false, false);
    

    game.state.add('Menu', Menu);
    game.state.add('Game', Game);

    game.state.start('Menu');
}