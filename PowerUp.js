function PowerUp(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

PowerUp.prototype.halfWidth = 5;
PowerUp.prototype.halfHeight = 5;

PowerUp.prototype.update = function (du) {
    // Remember my previous position
    var x = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    var nextY = prevY + this.yVel * du;

    if (g_paddle1.collidesWith(x, prevY, x, nextY, this.halfWidth)) {
        this.isActive = true;
        handlePowerups(this.typeId);
    }

    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cy += this.yVel * du;
};


PowerUp.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    var color;
    if (this.typeId == 1) color = "green";
    else if (this.typeId == 2) color = "yellow";
    else color = "blue";
    ctx.fillStyle = color;
    fillCircle(ctx, this.cx - this.halfWidth,
        this.cy - this.halfHeight,
        this.halfWidth * 2,
        this.halfHeight * 2);
    ctx.fillStyle = "black";
};

PowerUp.prototype.collidesWith = function (prevX, prevY,
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

