function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

//Ball.prototype.cx = 500;
//Ball.prototype.cy = 540;
//Ball.prototype.radius = 10;
/*var g_ball = new Ball({
    xVel: 5,
    yVel: 4,
    nextX: null,
    nextY: null,
    savePrevY: null,
    savePrevX: null,

});*/

Ball.prototype.keepInbounds = function () {
    // Bounce off top and bottom edges
    if (this.nextY - this.radius < 0){    // top edge
        this.yVel *= -1;
    }                            
        if(this.nextY +this.radius> g_canvas.height) {               // bottom edge
        this.yVel *= -1;
    }
    // Bounce off left and right edges
    if (this.nextX-this.radius < 0 || // left edge
        this.nextX +this.radius> g_canvas.width) { // right edge
        this.xVel *= -1
    }
}

Ball.prototype.update = function (du) {
  
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
 
    // Compute my provisional new position (barring collisions)
    this.nextX = prevX + this.xVel * du;
    this.nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_player.collidesWith(prevX, prevY, this.nextX, this.nextY, this.radius)) {
        this.yVel *= -1;
    }
    this.keepInbounds(); 
   
    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.savePrevX = prevX;
    this.savePrevY = prevY;
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

Ball.prototype.reset = function () {
    this.cx = 300;
    this.cy = 100;
    this.xVel = -5;
    this.yVel = 4;
};

Ball.prototype.render = function (ctx) {
    ctx.fillStyle = "white"
    fillCircle(ctx, this.cx, this.cy, this.radius);
};