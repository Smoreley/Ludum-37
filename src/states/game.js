class Game {
    constructor() {
        this.name = "game_state";
        
        this.phys = new Physics();
        this.speed = 1;
        this.rotationSpeed = 3;
    }
    
    preload () {

    }
    
    create () {
        this.graphics = game.add.graphics(0,0);
        
        game.load.image('house_image', 'bin/imgs/spr_house.jpeg');
        
        this.house = game.add.sprite(0, 0, 'house_image');
        this.house.anchor.setTo(0.5, 0.5);
        
        this.house.v = new Phaser.Point(0,0);
        this.house.f = new Phaser.Point(0,0);
        
        console.log(this.house.v.x);
        
        this.newDirection = new Phaser.Point(0,0);
    }
    
    update () {

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
        {
            this.house.angle -= this.rotationSpeed;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
        {
            this.house.angle += this.rotationSpeed;
        }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
        {
            this.house.f = new Phaser.Point(this.speed * Math.cos(this.house.rotation), this.speed * Math.sin(this.house.rotation));
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
        {
            this.house.f = new Phaser.Point(-this.speed * Math.cos(this.house.rotation), -this.speed * Math.sin(this.house.rotation));
            
        } else {
            this.house.f = new Phaser.Point(0,0);
        }
        
        
        this.house.x += this.house.v.x * (game.time.elapsed/100.0);
        this.house.v.x += this.house.f.x * (game.time.elapsed/100.0);
//        
        this.house.y += this.house.v.y * (game.time.elapsed/100.0);
        this.house.v.y += this.house.f.y * (game.time.elapsed/100.0);
        
        
//        this.v.x = this.
//        this.house.x = this.v.x;
//        var vTwo = new Phaser.Point(this.house.x, this.house.y);
//        var vOne = new Phaser.Point(10,20);
//        this.house.position = Phaser.Point.add(this.newDirection, this.house.position);
//        this.newDirection = Phaser.Point.add(vOne, vTwo.multiply(-1,-1)).normalize().setMagnitude(vDist/10);
//        
//        this.newAngle = this.house.angle*(180.0/Math.PI)+90.0;
    }
    
    render () {
        
        this.graphics.beginFill(0xe74c3c); // Red
        this.graphics.drawRect(0,0,64,64);
        this.graphics.endFill();
        
        game.debug.text();
        game.debug.start(20, 20, 'white');
        
        game.debug.text(game.time, 32, 76);
        console.log(this.housePos);
        
        game.debug.stop();

    }
}

function move(object, distance) {
    
    
    
	object.x = object.x + distance * Math.cos(object.rotation);
	object.y = object.y + distance * Math.sin(object.rotation);
}

class Physics {
    constructor() {
        // Postion
        this.x = 0;
        this.y = 0;
        
        // Velocity
        this.velx = 0;
        this.vely = 0;
        
        this.mass = 1;
    }
    
    applyforce(frcx, frcy, dtime) {
        this.velx += (frcx / this.mass) * dtime;
        this.vely += (frcy / this.mass) * dtime;
    }
    
    applyForwardForce(object, force) {
        this.velx += force * Math.cos(object.rotation);
        this.velY += force * Math.sin(object.rotation);
    }
}