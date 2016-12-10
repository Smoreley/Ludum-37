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
        velx += (frcx / this.mass) * dtime;
        vely += (frcy / this.mass) * dtime;
    }
    
}