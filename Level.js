// Container object for different balls
function Level(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

Level.prototype.render = function (ctx) {
    // Render background, balls and platforms?
};


