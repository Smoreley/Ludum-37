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
        game.stage.smoothed = false;
        game.load.image('bg_image', IMGPATH+'bg_menu.png');

    }
    
    // create is called once preload has completed
    create () {
        
        this.add.button(0, 0, 'bg_image', this.startGame, this);   
//        this.bg = game.add.sprite(0, 0, 'bg_image');
        this.graphics = game.add.graphics(0,0);

    }
    
    // The update method is left empty for your own use. It is called during the core game loop
    update () {
        
    }
    
    // Nearly all display objects in Phaser render automatically, you don't need to tell them to render. However the render method is called AFTER the game renderer and plugins have rendered, 
    render () {        

    }
    
    // This method will be called when the State is shutdown
    shutdown() {
        
    }
    
    startGame() {
        this.state.start('Game');
    }
}