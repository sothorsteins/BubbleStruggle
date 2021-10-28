// ==========
// BALL STUFF
// ==========

// BALL STUFF

var ballImage = new Image();
ballImage.src = "./img/misc-beachball.svg";

var boingSound = new Audio('boingSound.mp3');
var errorSound = new Audio('error.ogg');

var g_ball = {
    cx: 50,
    cy: 400,
    radius: 24,

    xVel: 16,
    yVel: 1
};

g_ball.update = function (du) {
    
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    for (let i = 0; i < g_bricks.length; i++) {
        for (let j = 0; j < g_bricks[i].length; j++) {
                if (!g_superPower) this.yVel *= -1;
                g_bricks[i].splice(j, 1);
                g_score += 10;
                if (Math.random() < 0.15) {
                    
                }
        }
    }
    debugger;
    // Bounce off the paddles
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius))
    {
        this.yVel *= -1;
    }
    
    // Bounce off top and bottom edges
    if (nextY > g_canvas.height) {               // bottom edge
        this.yVel *= -1;
        g_score -= 5;
        errorSound.play();
    }
    if (nextY < 0) { // top edge
        this.yVel *= -1;
    }

    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;

    // Left and right wall
    if (nextX < 0 || nextX > g_canvas.width) {
        this.xVel *= -1;
    }

    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

g_ball.reset = function () {
    this.cx = 50;
    this.cy = 400;
    this.xVel = 3;
    this.yVel = 7;
};

g_ball.render = function (ctx) {
    
    //fillCircle(ctx, this.cx, this.cy, this.radius);
    if (g_superPower) {
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 15;
    } else ctx.shadowColor = 'transparent';
    
    ctx.drawImage(ballImage, this.cx, this.cy, this.radius * 3, this.radius * 3);
    
};