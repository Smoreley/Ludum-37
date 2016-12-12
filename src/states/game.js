class Game {
    constructor() {
        this.name = "game_state";
    }

    preload () {
        game.load.image('houseimage', 'bin/imgs/character64.png');
        game.load.atlasJSONHash('bot', 'bin/imgs/mainChar.png', 'bin/imgs/mainChar.json');

        game.load.tilemap('ludmap', 'raw/ludMapMike.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'raw/mapTile2.png');

        game.load.image('bullet', 'bin/imgs/toilet32.png');
    }

    create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.graphics = game.add.graphics(0,0);
        game.stage.backgroundColor = '#000';

            // Background Map
        this.map = game.add.tilemap('ludmap');
        this.map.addTilesetImage('mapTile2','tiles');
        this.ground_layer = this.map.createLayer('Ground');
        this.object_layer = this.map.createLayer('Objects');

        //collision on blockedLayer
        this.map.setCollisionBetween(1, 20000, true, 'Objects');

        this.ground_layer.resizeWorld();
        this.object_layer.resizeWorld();

        game.world.setBounds(0, 0, 4096, 1024);

        this.house = new Player();

        this.mockSprite = game.add.sprite(700, 220, 'houseimage');
        this.mockSprite.name = 'houseimage'
        game.physics.enable(this.mockSprite, Phaser.Physics.ARCADE);
    }

    update () {
        game.physics.arcade.collide(this.house.spr, this.mockSprite, collisionHandler, null, this);
        game.physics.arcade.collide(this.house.spr, this.object_layer, collisionHandler);

        this.house.update();
    }

    render () {
        game.debug.text();
        game.debug.start(20, 20, 'white');
        game.debug.text(this.house.spr.position, 32, 76);
        game.debug.stop();
        game.debug.body(this.house.spr);
        game.debug.body(this.mockSprite);

        game.debug.text('Active Bullets: ' + this.house.bullets.countLiving() + ' / ' + this.house.bullets.total, 32, 32);

    }
}

function move(object, speed) {
    object.f = new Phaser.Point(Math.cos(object.rotation-Math.PI/2), Math.sin(object.rotation-Math.PI/2));
    object.f = object.f.multiply(speed,speed);
}

function collisionHandler (obj1, obj2) {

}
