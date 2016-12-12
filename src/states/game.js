var myMap;

class Game {
    constructor() {
        this.name = "game_state";
    }
    
    preload () {
        game.load.atlasJSONHash('bot', 'bin/imgs/mainChar.png', 'bin/imgs/mainChar.json');
        
        game.load.tilemap('ludmap', 'bin/imgs/ludMap37.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'bin/imgs/mapTile.png');
        game.load.image('bullet', 'bin/imgs/toilet32.png');
    }
    
    create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.graphics = game.add.graphics(0,0);
        game.stage.backgroundColor = '#000';
        
            // Background Map
        this.map = game.add.tilemap('ludmap');
        this.map.addTilesetImage('Main Map', 'tiles');
        this.ground_layer = this.map.createLayer('Ground');
        this.object_layer = this.map.createLayer('Objects');
        
        this.map.setLayer(this.object_layer);
        myMap = this.map;
        
        //collision on blockedLayer
        this.map.setCollisionBetween(1, 2000, true, 'Objects');

        this.object_layer.resizeWorld();
        this.ground_layer.resizeWorld();
        
        game.world.setBounds(0, 0, 2048, 1024);
        
        this.house = new Player();
    }
    
    update () {        
        // Collision with house and object layer
        game.physics.arcade.collide(this.house.spr, this.object_layer, collisionHandler);
        
        // Collision with bullets and object layer
        game.physics.arcade.collide(this.house.bullets, this.object_layer, collisionHandler);
        
        // collisiong with bullets and house sprite
        game.physics.arcade.collide(this.house.bullets, this.house.spr, collisionHandler);

        this.house.update();
    }
    
    render () {
        game.debug.text();
        game.debug.start(20, 20, 'white');
        game.debug.text("X: "+Math.round(this.house.spr.position.x)+" y: "+Math.round(this.house.spr.position.y), 32, 76);        
        game.debug.stop();        
//        game.debug.body(this.house.spr);

        game.debug.text('Active Bullets: ' + this.house.bullets.countLiving() + ' / ' + this.house.bullets.total, 32, 32);
    }
}

function move(object, speed) {
    object.f = new Phaser.Point(Math.cos(object.rotation-Math.PI/2), Math.sin(object.rotation-Math.PI/2));
    object.f = object.f.multiply(speed,speed); 
}

function collisionHandler (obj1, obj2) {
//    console.log(obj2);
    myMap.removeTile(obj2.x, obj2.y);
}