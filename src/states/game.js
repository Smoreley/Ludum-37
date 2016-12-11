class Game {
    constructor() {
        this.name = "game_state";
        this.speed = 40;
        this.dir = 1;
        this.rotationSpeed = 90;
    }
    
    preload () {
        game.load.image('houseimage', 'bin/imgs/character64.png');
//        game.load.image('backdrop', 'bin/imgs/bg_map2.png');
        
        game.load.atlasJSONHash('bot', 'bin/imgs/mainChar.png', 'bin/imgs/mainChar.json');
        
        game.load.tilemap('mario', 'bin/imgs/ludMap37.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'bin/imgs/mapTile.png');
    }
    
    create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.graphics = game.add.graphics(0,0);
        
        game.stage.backgroundColor = '#787878';
        
            // Background Map
        this.map = game.add.tilemap('mario');
        this.map.addTilesetImage('Main Map', 'tiles');
        this.ground_layer = this.map.createLayer('Ground');
        this.object_layer = this.map.createLayer('Objects');
        
        this.ground_layer.resizeWorld();
        this.ground_layer.scale.setTo(2,2);
        this.object_layer.resizeWorld();
        this.object_layer.scale.setTo(2,2);
        
        game.world.setBounds(0, 0, 4096, 2048);
        
        this.house = game.add.sprite(0, 0, 'bot');
        this.house.anchor.setTo(0.5, 0.5);
        this.house.scale.setTo(2, 2);
        this.house.animations.add('run');
        this.house.animations.play('run', 16, true);
        game.physics.enable(this.house, Phaser.Physics.ARCADE);
        this.house.f = new Phaser.Point(1,0);
        this.newDirection = new Phaser.Point(0,0);
        game.camera.follow(this.house);
        
        
//        this.bot = game.add.sprite(512, 512, 'bot');
//        this.bot.scale.setTo(2, 2);
//        this.bot.animations.add('run');
//        this.bot.animations.play('run', 16, true);
    }
    
    update () {
        var deltaTime = (game.time.elapsed/1000.0);

        console.log(this.house.body.speed);
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.house.angle -= this.rotationSpeed * deltaTime + (0.01*(this.house.body.speed));
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.house.angle += this.rotationSpeed * deltaTime + (0.01*(this.house.body.speed));
        }
        
        // Push away
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            move(this.house, 1);
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            move(this.house, -1);            
        } else {
            this.house.f = new Phaser.Point(0,0);
        }
          
//        this.house.f = this.house.f.normalize();
//        console.log(this.house.f);
//        this.house.x += this.house.v.x * this.speed * deltaTime;
//        this.house.v.x += this.house.f.x * this.speed * deltaTime;
//        this.house.y += this.house.v.y * deltaTime;
//        this.house.v.y += this.house.f.y * deltaTime;
        
        this.house.body.velocity.x += this.house.f.x * this.speed;
        this.house.body.velocity.y += this.house.f.y * this.speed;
        this.house.body.velocity = this.house.body.velocity.multiply(0.9,0.9);
//        
//        var vTwo = new Phaser.Point(this.house.x, this.house.y);
//        var vOne = new Phaser.Point(10    ,20);
//        this.house.position = Phaser.Point.add(this.newDirection, this.house.position);
//        this.newDirection = Phaser.Point.add(vOne, vTwo.multiply(-1,-1)).normalize().setMagnitude(vDist/10);
//        this.newAngle = this.house.angle*(180.0/Math.PI)+90.0;
    }
    
    render () {
        game.debug.text();
        game.debug.start(20, 20, 'white');
        game.debug.text(this.house.position, 32, 76);        
        game.debug.stop();

    }
}

function move(object, speed) {
    object.f = new Phaser.Point(Math.cos(object.rotation-Math.PI/2), Math.sin(object.rotation-Math.PI/2));
    object.f = object.f.multiply(speed,speed); 
}