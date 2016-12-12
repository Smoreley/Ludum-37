class Player {
    constructor() {
        // Projectile
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        // Movement
        this.rotateLKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rotateRKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        this.speed = 30;
        this.dir = 1;
        this.rotationSpeed = 90;
        this.fireRate = 300;
        this.nextFire = 0;
         
        this.spr = game.add.sprite(145, 656, 'bot');
        this.spr.anchor.setTo(0.5, 0.5);
        this.spr.animations.add('run');
        this.spr.animations.play('run', 16, true);
        game.physics.enable(this.spr, Phaser.Physics.ARCADE);
        this.spr.f = new Phaser.Point(1,0);
        game.camera.follow(this.spr);
        this.spr.body.collideWorldBounds = true;
        
                // Set collision
        this.spr.body.setSize(32,32,16,16);
           
        this.bullets = game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
    }
    
    update() {
        var deltaTime = (game.time.elapsed/1000.0);
        
        if (this.rotateLKey.isDown) {
            this.spr.angle -= this.rotationSpeed * deltaTime + (0.01*(this.spr.body.speed));
        }
        else if (this.rotateRKey.isDown) {
            this.spr.angle += this.rotationSpeed * deltaTime + (0.01*(this.spr.body.speed));
        }
        
        // Push 
        if (this.upKey.isDown) { move(this.spr, 1); }
        else if (this.downKey.isDown) { move(this.spr, -1); }
        else { this.spr.f = new Phaser.Point(0,0); }
        
        // Projectile
        if (this.spaceKey.isDown) { this.fire(); }
        
        this.spr.body.velocity.x += this.spr.f.x * this.speed;
        this.spr.body.velocity.y += this.spr.f.y * this.speed;
        this.spr.body.velocity = this.spr.body.velocity.multiply(0.9,0.9);
    }
    
    fire() {
        if (game.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.spr.x - 8, this.spr.y - 8);

            //bullet.body.velocity.y = 300;
            game.physics.arcade.moveToPointer(bullet, 600);
        }
    }
    
}