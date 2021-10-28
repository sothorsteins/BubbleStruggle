// A generic constructor which accepts an arbitrary descriptor object
function Player(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Player.prototype.halfWidth = 50;
Player.prototype.halfHeight = 10;

var crabImage = new Image();
crabImage.src = "./img/cartoon-crab.svg";


Player.prototype.update = function (du) {

    if (g_keys[this.GO_RIGHT]) {
        if (this.cx < g_canvas.width - 5) this.cx += 5;
    } else if (g_keys[this.GO_LEFT]) {
        if (this.cx > 5) this.cx -= 5;
    }
};

Player.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.drawImage(crabImage, this.cx - this.halfWidth, this.cy-this.halfHeight, this.halfWidth * 2, this.halfHeight * 4);
};

Player.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
    r) {
    var paddleEdge = this.cx;

    // Check X coords
    if ((nextX - r < paddleEdge + this.halfWidth && prevX - r >= paddleEdge - this.halfWidth) ||
        (nextX + r > paddleEdge - this.halfWidth && prevX + r <= paddleEdge + this.halfWidth)) {
        // Check Y coords
        if (nextY + 2*r >= this.cy - this.halfHeight &&
            nextY - 2*r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};