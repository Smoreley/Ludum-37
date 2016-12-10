var game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update, render: render});

var game;
game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameWindow');

game.state.add('Menu', Menu);
game.state.add('Game', Game);

game.state.start('Menu');