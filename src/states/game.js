
    var cursors;
    var player;
    var food;
    var speed = 150;
    var foodspeed = 300;
    var score = 0;
    var scoreText;
    var person1;
    var person2;

    Person = function(game){
  
      this.game = game;
      this.person = game.add.sprite(game.world.randomX, game.world.randomY, 'person')
      game.physics.arcade.enable(this.person);
      this.person.scale.setTo(1.2,1.2)
      this.person.enableBody = true;
      this.person.body.collideWorldBounds = true;

      }




class Game {



    constructor() {
        this.name = "game_state";

    }
    

    preload () {
        game.stage.backgroundColor = '#fff';
        game.load.image('food', 'bin/imgs/human.png');
        game.load.image('player', 'bin/imgs/blue-square.png');
        game.load.image('person', 'bin/imgs/person.png');

    }
    
    create () {


        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        player = game.add.sprite(GAME_WIDTH*0.5, GAME_HEIGHT*0.5, 'player');
        player.anchor.set(0.5);
        
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;

        scoreText = game.add.text(5, 3, score);
        

        food = game.add.group();
        food.enableBody = true;
                        
            for (var i = 0; i < 10; i++) {
                
                var foodMany = food.create(game.world.randomX, game.world.randomY, 'food');
                foodMany.body.collideWorldBounds = true;
                foodMany.anchor.set(0.5);
            }

            
        
        game.physics.enable(food, Phaser.Physics.ARCADE);
        
        person1 = new Person(game);   
        person2 = new Person(game);   
        

    }


    
    update () {

        if (cursors.up.isDown) {
            player.body.velocity.y = -speed;
            // person1.body.velocity.y = foodspeed;
            
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
        game.physics.arcade.overlap(player, this.person, eatPerson);

        function eatFood(player, food) { 
           food.kill();
           score+=10;
           scoreText.text = score;
        }
        
        function eatPerson(player, person) { 
           this.person.kill();
           score+=20;
           scoreText.text = score;
        }
        


    }



    
    render () {



    }
}

