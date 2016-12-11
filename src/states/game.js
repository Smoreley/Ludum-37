
    var cursors;
    var player;
    var food;
    var speed = 150;
    var foodspeed = 300;
    var foodspeed2 = 300;
class Game {


    constructor() {
        this.name = "game_state";

    }


    

    preload () {
        game.stage.backgroundColor = '#fff';
        game.load.image('food', 'bin/imgs/human.png');
        game.load.image('player', 'bin/imgs/blue-square.png');

    }
    
    create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        player = game.add.sprite(GAME_WIDTH*0.5, GAME_HEIGHT*0.5, 'player');
        player.anchor.set(0.5);
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        

        food = game.add.group();

        food.enableBody = true;
        for (var i = 0; i < 10; i++) {
            var foodMany = food.create(game.world.randomX, game.world.randomY, 'food');
        }



        // food.create(GAME_WIDTH*0.1, GAME_HEIGHT*0.1, 'food');
            
        
        game.physics.enable(food, Phaser.Physics.ARCADE);
        

    }


    
    update () {

        if (cursors.up.isDown) {
            player.body.velocity.y = -speed;
            // food.body.velocity.y = foodspeed;
            
        }
        else if (cursors.down.isDown) {
                player.body.velocity.y = speed;
                // food.body.velocity.y = -foodspeed;
        }
        else {
                player.body.velocity.y = 0;
                // food.body.velocity.y = foodspeed;
                
        }

        if (cursors.left.isDown) {
            player.body.velocity.x = -speed;
            // food.body.velocity.x = foodspeed + 30;
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x = speed;
            // food.body.velocity.x = -foodspeed;
        }
        else {
            player.body.velocity.x = 0;
            // food.body.velocity.x = foodspeed;
        }

        game.physics.arcade.overlap(player, food, eatFood);

        function eatFood(player, food) { 
           food.kill();
        }
    
    }



    
    render () {



    }
}