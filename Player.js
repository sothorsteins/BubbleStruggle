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

var GRAVITY = 2;

Player.prototype.update = function (du) {
    var nextX = this.cx;
    var nextY = this.cy;
    if (this.cy + this.halfWidth < 600) {
        nextY += GRAVITY;
        //this.cx += du * intervalVelX;
        //this.cy += du * intervalVelY;
    }

    if (g_keys[this.GO_RIGHT]) {
        if (this.cx + this.halfWidth < g_canvas.width - 5) {
            nextX += 5 * du;
        }
    } else if (g_keys[this.GO_LEFT]) {
        if (this.cx - this.halfWidth > 5) {
            nextX -= 5 * du;
        }
    } else if (eatKey(this.JUMP)) {
        console.log(g_keys[this.JUMP]);
        nextY -= 100 * du;
        //console.log("Gravity: ", this.computeGravity());
    }
    this.cx = nextX
    this.cy = nextY;


};

Player.prototype.collidesWith = function (prevX, prevY,
    nextX, nextY,
    r) {


    // TODO útfæra death frá contact við bolta
    var paddleEdge = this.cy;
    var paddleEdgeLeft = this.cx - this.halfHeight;
    var paddleEdgeRight = this.cx + this.halfHeight;
    // Check Y coords
    if ((nextY - r <= paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r >= paddleEdge && prevY + r <= paddleEdge)) {
        // Check X coords
        if (nextX + r >= paddleEdgeLeft &&
            nextX - r <= paddleEdgeRight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};

Player.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.drawImage(crabImage, this.cx - this.halfWidth, this.cy - this.halfHeight, this.halfWidth * 2, this.halfHeight * 4);
};