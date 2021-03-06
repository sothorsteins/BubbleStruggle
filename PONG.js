// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var replayBtn = document.getElementById("replayBtn");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// PADDLE STUFF
// ============

// PADDLE 1

var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);
var KEY_W = 'W'.charCodeAt(0);


var g_player = new Player({
    cx : g_canvas.width/2,
    cy : g_canvas.height - 50,
    
    GO_RIGHT   : KEY_D,
    GO_LEFT : KEY_A,
    JUMP: KEY_W
});

// POWERUP STUFF

var g_balls=[];
var g_powerUps = [];
var g_activePowerUps = [];
var g_highScores = [];
var g_speedMode = false;
var g_superPower = false;
var g_score;
var gameStarted;


function init() {
    g_balls = [];
    g_score = 0;
    gameStarted = false;
    createBalls();
    g_main.init();
}

/*function createBricks(numLines, numColumns) {
    var lineSpace = 0;
    var columnSpace = 0;
    var widthSpacing = (g_canvas.width - 200) / numColumns;
    var heightSpacing = (g_canvas.height - 320) / numLines;
    
    var colors = ["yellow", "red", "blue", "orange", "lime"]
    for (let i = 0; i <= numLines; i++) {
        lineSpace += heightSpacing;
        var bricks = [];
        for (let j = 0; j <= numColumns; j++) {
            bricks[j] = new Ball({ cx: 80 + columnSpace, cy: 20 + lineSpace, color: colors[i%colors.length]})
            columnSpace += widthSpacing;
        }
        g_bricks[i] = bricks;
        columnSpace = 0;
    }
    gameStarted = true;

}*/
function createBalls(){
    //console.log("balls created");
    g_balls.push(new Ball({cx:80,cy:400,radius:48,xVel:4,yVel:8}));
}

// 1 = speedMode, 2 = super power, 3 = Extra points
function handlePowerups(id) {
    // 4 second speed mode
    if (id == 1) {
        g_ball.xVel *= 2;
        g_ball.yVel *= 2;
        setTimeout(function () {
            g_ball.xVel /= 2;
            g_ball.yVel /= 2;
        }, 3000)
    }
    if (id == 2) {
        g_superPower = true;
        setTimeout(function () {
            g_superPower = false;
        }, 3000)
    }
    if (id == 3) {
        g_score += 50;
    }
}

/*function areBricksCleared() {
    for (let i = 0; i < g_bricks.length; i++) {
        if (g_bricks[i].length > 0) return false;
    }
    return true;
}*/

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    for(var i=0;i<g_balls.length;i++){
        g_balls[i].update(du);
    }
    
    g_player.update(du);

    if (g_powerUps.length > 0) {
        for (let i = 0; i < g_powerUps.length; i++) {
            var power = g_powerUps[i];
            if (power.cy < g_canvas.height && !power.isActive) power.update(du);
            else g_powerUps.splice(i, 1);
        }
    }


}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    var background = new Image();
    background.src = "./img/beach.png";
  
    ctx.drawImage(background, 0, 0, g_canvas.width, g_canvas.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(g_score, 20, 40);

     for(var i=0;i<g_balls.length;i++){
        g_balls[i].render(ctx);
    }

    g_player.render(ctx);

    if (g_powerUps.length > 0) {
        g_powerUps.forEach(power => power.render(ctx));
    }

}

init();