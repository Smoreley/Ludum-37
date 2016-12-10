class Game {
    constructor() {
        this.name = "game_state";
        this.speed = 4;
        this.dir = 1;
        this.rotationSpeed = 75;
    }
    
    preload () {
        game.load.image('houseimage', 'bin/imgs/character64.png');
        game.load.image('backdrop', 'bin/imgs/bg_map.png');
    }
    
    create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.graphics = game.add.graphics(0,0);
        
        
        game.world.setBounds(0, 0, 2048, 2048);
        game.add.sprite(0, 0, 'backdrop');
        
        this.house = game.add.sprite(0, 0, 'houseimage');
        this.house.anchor.setTo(0.5, 0.5);
        
        game.physics.enable(this.house, Phaser.Physics.ARCADE);
        this.house.f = new Phaser.Point(1,0);
        
        this.newDirection = new Phaser.Point(0,0);
        
        game.camera.follow(this.house);
    }
    
    update () {
        var deltaTime = (game.time.elapsed/1000.0);

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.house.angle -= this.rotationSpeed * deltaTime;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.house.angle += this.rotationSpeed * deltaTime;
        }
        
        // Push away
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            move(this.house, this.speed);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            move(this.house, -this.speed);            
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
        this.house.body.velocity = this.house.body.velocity.multiply(0.95,0.95);
//        
//        var vTwo = new Phaser.Point(this.house.x, this.house.y);
//        var vOne = new Phaser.Point(10,20);
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
    object.f = new Phaser.Point(Math.cos(object.rotation), Math.sin(object.rotation));
    object.f = object.f.multiply(speed,speed);    
}