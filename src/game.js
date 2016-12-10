$(function () {
    
//    setInterval(() => { alert("Hey"); }, 1000);
    
    
//   $("root").css("--windowWidth", "250px");
});

var game = new Phaser.Game(640, 360, Phaser.AUTO, 'gameWindow', { preload: preload, create: create, update: update, render: render});

function preload() {
    game.load.image('logo', 'bin/logo.png');	
}

// Called once preload has completed 
function create() {
    game.stage.backgroundColor = '#440e62';
//    logo = game.add.sprite(width, 0, 'logo');
}

function update() {
    
}

// Called after the game renderer has rendered so you are able to do any final post-processing effects (or debug messages you want on top)

function render() {
    var x = 32;
    var y = 32;
    game.debug.text('Testing All The Things', x,y);
}