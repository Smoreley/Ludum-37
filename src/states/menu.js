class Menu {
    constructor() {
        this.name = "Menu_state";
        
//        this.graphics = new Graphics();

    }
    
    // init is the very first function called when your State starts up. It's called before preload
    init() {   
    }
    
    // preload is called first. Normally you'd use this to load your game asset
    preload () {
        game.load.image('bg_image', 'bin/imgs/bg_menu.jpeg');

    }
    
    // create is called once preload has completed
    create () {
        
        this.bg = game.add.sprite(0, 0, 'bg_image');
        this.graphics = game.add.graphics(0,0);

    }
    
    // The update method is left empty for your own use. It is called during the core game loop
    update () {

    }
    
    // Nearly all display objects in Phaser render automatically, you don't need to tell them to render. However the render method is called AFTER the game renderer and plugins have rendered, 
    render () {
    
    // Circle
    this.graphics.beginFill(0xff0000);
    this.graphics.drawCircle(GAME_WIDTH/2, GAME_HEIGHT/2, 25);
    this.graphics.endFill();
        
    this.graphics.beginFill(0xe74c3c); // Red
    this.graphics.drawRect(0,0,50,50);
    this.graphics.endFill();

    }
    
    // This method will be called when the State is shutdown
    shutdown() {
        
    }
}