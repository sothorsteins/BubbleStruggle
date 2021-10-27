function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Brick.prototype.halfWidth = 35;
Brick.prototype.halfHeight = 10;


Brick.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx - this.halfWidth,
        this.cy - this.halfHeight,
        this.halfWidth * 2,
        this.halfHeight * 2);
    ctx.fillStyle = "black";
    
};

Brick.prototype.collidesWith = function (prevX, prevY,
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
};

Brick.prototype.collidesWithSide = function (prevX, prevY,
    nextX, nextY,
    r) {

    var brickEdge = this.cx;
    if ((nextX - r < brickEdge && prevX - r >= brickEdge) ||
        (nextX + r > brickEdge && prevX + r <= brickEdge)) {
        if (nextY + 2 * r >= this.cy - this.halfHeight &&
            nextY - 2 * r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    return false;

};

