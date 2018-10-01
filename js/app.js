// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.moveX = 101; //distance between x-axis blocks
    this.x = x; 
    this.y = y + 55; //center tile
    this.speed = speed;
    this.boundary = this.moveX * 5; // boundary is set at 5 moves to the right
    this.resetPos = -this.moveX;
}

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x < this.boundary) {
            //If bug is within the boudary, move it
            this.x += this.speed * dt;
        } else {
            //If bug is outside of the boundary, reset it
            this.x = this.resetPos;
        }
    }//End Enemy Update

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}//End Enemy Class

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';//Oddly I can only use the boy character. TODO: Research canvas 2d png
        //distance between blocks on x-axis
        this.moveX = 101;
        //distance between blocks on y-axis
        this.moveY = 83;
        //start game with player in the middle block
        this.startX = this.moveX * 2; 
        this.startY = (this.moveY * 4) + 55;
        //align with enemy 
        this.x = this.startX;
        this.y = this.startY;
        this.playerWin = false;
    }//End Player Constructor

    handleInput(keyInput) {
        switch(keyInput) {
            case 'left':
                if (this.x > 0) {  
                    this.x -= this.moveX;
                }
                break;
            case 'up':
                if (this.y > 0) {  
                    this.y -= this.moveY;
                }
                break;
            case 'right':
                if (this.x < this.moveX * 4) {  
                    this.x += this.moveX;
                }
                break;
            case 'down':
                if (this.y < this.moveY * 4) {  
                    this.y += this.moveY;
                }
                break;
        }
    }//End handleInput  
      
    //Where is the position of the player & did we hit a bug?
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.moveX/1.4 > this.x && enemy.x < this.x + this.moveX/1.4)) {
                this.reset();//reset to starting point
            }
        }
        //Winner! 
        if (this.y === -28) {
            this.playerWin = true;
        }        
    }//End Player Update 

    //Drawing player spite on x and y cord
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }    

    //Reset Player
    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}//End Player Class    

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemyBug1 = new Enemy(-101, 0, 300);
const enemyBug2 = new Enemy(-101, 83, 200);
const enemyBug3 = new Enemy((-101 * 4), 83, 100);
const enemyBug4 = new Enemy(-101, 166, 50);
const enemyBug5 = new Enemy((-101 * 3.5), 166, 50);

const allEnemies = [];
allEnemies.push(enemyBug1, enemyBug2, enemyBug3, enemyBug4, enemyBug5);

const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
