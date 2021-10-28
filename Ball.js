function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Ball.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx - this.halfWidth,
        this.cy - this.halfHeight,
        this.halfWidth * 2,
        this.halfHeight * 2);
    ctx.fillStyle = "black";
};

/*Ball.prototype.collidesWith = function (prevX, prevY,
    nextX, nextY,
    r) {
    var brickEdge = this.cx;

    // Check X coords
    if ((nextX - r < brickEdge + this.halfWidth && prevX - r >= brickEdge - this.halfWidth) ||
        (nextX + r > brickEdge - this.halfWidth && prevX + r <= brickEdge + this.halfWidth)) {
        // Check Y coords
        if (nextY + 2 * r >= this.cy - this.halfHeight &&
            nextY - 2 * r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};*/

Ball.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius)) {
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

Ball.prototype.reset = function () {
    this.cx = 50;
    this.cy = 400;
    this.xVel = -5;
    this.yVel = 4;
};

Ball.prototype.render = function (ctx) {

    //fillCircle(ctx, this.cx, this.cy, this.radius);
    if (g_superPower) {
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 15;
    } else ctx.shadowColor = 'transparent';

    ctx.drawImage(ballImage, this.cx, this.cy, this.radius * 3, this.radius * 3);

};

