/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

var game_score;
var flagpole;
var lives;

var platforms;
var enemies;

var JumpActive;

var jumpSound;
var winSound;
var dieSound;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);

	winSound = loadSound('assets/win.wav');
    winSound.setVolume(0.4);

	dieSound = loadSound('assets/die.wav');
    dieSound.setVolume(0.2);
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 3;
	JumpActive = false;

	startGame()
}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
	trees_x = [50, 350, 800, 1300, 1850];
	clouds = [
		{x_pos: 150, y_pos: 50, size: 50},
		{x_pos: 350, y_pos: 110, size: 50},
		{x_pos: 850, y_pos: 70, size: 50},
		{x_pos: 1150, y_pos: 110, size: 50},
		{x_pos: 1550, y_pos: 70, size: 50}
	];
	mountains = [
		{x: 100, y: floorPos_y, height: 120, width: 130},
		{x: 600, y: floorPos_y, height: 220, width: 130},
		{x: 900, y: floorPos_y, height: 120, width: 130},
		{x: 1500, y: floorPos_y, height: 220, width: 130}
	];
	canyons = [
		{x_pos: 100, width: 100},
		{x_pos: 680, width: 120},
		{x_pos: 900, width: 250},
		{x_pos: 1200, width: 80},
		{x_pos: 1500, width: 100},
	];
	collectables = [
		{x_pos: 160, y_pos: 370, size: 50, isFound: false},
		{x_pos: 530, y_pos: 200, size: 50, isFound: false},
		{x_pos: 890, y_pos: 370, size: 50, isFound: false},
	];

	platforms = [];

	platforms.push(createPlatform(580, floorPos_y-100, 80));
	platforms.push(createPlatform(720, 280, 80));
	platforms.push(createPlatform(920, floorPos_y-50, 120));

	enemies = [];

	enemies.push(new Enemy(300, floorPos_y - 10, 100))
	enemies.push(new Enemy(800, floorPos_y - 10, 100))

	game_score = 0;

	flagpole = {isReached: false, x_pos: 1680};
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	push();
	translate(scrollPos,0);
	drawClouds(); // Draw clouds.
	drawMountains(); // Draw mountains.
	drawTrees(); // Draw trees.

	for(var i = 0; i < platforms.length; i++)
	{
		platforms[i].draw();
	}

	// Draw canyons.
	for (var i = 0; i < canyons.length; i++)
	{
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
	};

	// Draw collectable items.
	for (var i = 0; i < collectables.length; i++)
	{
		if(collectables[i].isFound == false)
		{
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	};

	renderFlagpole(); //flagpole

	for (var i = 0; i < enemies.length; i++)
	{
		enemies[i].draw();

		var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

		if(isContact)
		{
			if(lives > 0)
			{
				dieSound.play();
				lives -= 1;
				startGame();
				break;
			}
		}
	};

	pop();

	drawGameChar(); // Draw game character.

	//score and lives details
	fill(0);
	noStroke();
	textSize(16);
	text("Score: "+ game_score, 20,20);
	text("Lives: "+ lives, 20,40);

	if(lives < 1)
	{
		fill(255);
		stroke(100);
		textSize(50);
		text("Game over!", width/2-textWidth("Game over!")/2, height/2);
		textSize(30);
		text("Refresh to start again", width/2-textWidth("Refresh to start again")/2, height/2+40);
	}

	if(flagpole.isReached)
	{
		fill(255);
		stroke(100);
		textSize(50);
		text("Level complete!",width/2-textWidth("Level complete!")/2,height/2);
		textSize(30);
		text("YOU WIN",width/2-textWidth("YOU WIN")/2,height/2+40);

	}

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
	//for jumping and falling
	if(floorPos_y > gameChar_y)
	{
		var isContact = false;
		for(var i = 0; i < platforms.length; i++)
		{
			if (platforms[i].checkContact(gameChar_world_x, gameChar_y) == true)
			{
				JumpActive = true;
				isContact = true;
				isFalling = false; //for showing standing face on platform
				break;
			}
		}
		if(!isContact)
		{
			gameChar_y +=4;
			isFalling = true; 
			JumpActive = false;
		}

	}
	else
	{
		isFalling = false; 
	}

	if (isPlummeting)
	{
		dieSound.play();
		gameChar_y += 5;
	}

	if (flagpole.isReached == false)
	{
		checkFlagpole()
	}

	checkPlayerDie();

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	if(gameChar_world_x < 0)
	{
		isLeft = false;
		isRight = false;
	}
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	if(flagpole.isReached)
	{
		nextLevel();
	}
	if(lives < 1)
	{
		returnToStart();
	}

	//left arrow press
	if (keyCode == 37 && gameChar_y<=floorPos_y )
	{
		isLeft = true;
	}

	//right arrow press
	else if (keyCode == 39 && gameChar_y<=floorPos_y)
	{
		isRight = true;
	}

	//spacebar pressed
	else if ((keyCode == 32 && gameChar_y==floorPos_y) || JumpActive == true)
	{
		isFalling = true;
		if (isFalling)
		{
			jumpSound.play();
			gameChar_y -=100; 
		}
	}
}

function keyReleased()
{

	if (keyCode == 37)
	{
		isLeft = false;
		// console.log('left '+isLeft);
	}
	else if (keyCode == 39)
	{
		isRight = false;
		// console.log('right '+isRight);
	}
	else if (keyCode == 32)
	{
		isFalling = false;
		// console.log('jumping  '+isFalling);
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,15,20)
		fill(108, 86, 95);
		rect(gameChar_x-10,gameChar_y-55,20,30)
		fill(200);
		rect(gameChar_x-5,gameChar_y-25,10,15)
		fill(200);
		rect(gameChar_x-7.5,gameChar_y-25,10,10)
		fill(150);
		rect(gameChar_x-2.5,gameChar_y-52,5,15)
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,15,20)
		fill(108, 86, 95);
		rect(gameChar_x-10,gameChar_y-55,20,30)
		fill(200);
		rect(gameChar_x-5,gameChar_y-25,10,15)
		fill(200);
		rect(gameChar_x-2.5,gameChar_y-25,10,10)
		fill(150);
		rect(gameChar_x-2.5,gameChar_y-52,5,15)
	}
	else if(isLeft)
	{
		// add your walking left code
		//head
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,15,20)
		//body
		fill(108, 86, 95);
		rect(gameChar_x-10,gameChar_y-55,20,30)
		//leg
		fill(200);
		rect(gameChar_x-5,gameChar_y-25,10,20)
		fill(200);
		rect(gameChar_x-7.5,gameChar_y-25,10,15)
		//shoe
		fill(0);
		rect(gameChar_x-5,gameChar_y-5,10,5)
		fill(0);
		rect(gameChar_x-2.5,gameChar_y-5 ,10,5)
		//hand
		fill(150);
		rect(gameChar_x-2.5,gameChar_y-52,5,20)
	}
	else if(isRight)
	{
		// add your walking right code
		//head
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,15,20)
		//body
		fill(108, 86, 95);
		rect(gameChar_x-10,gameChar_y-55,20,30)
		//leg
		fill(200);
		rect(gameChar_x-5,gameChar_y-25,10,20)
		fill(200);
		rect(gameChar_x-2.5,gameChar_y-25,10,15)
		//shoe
		fill(0);
		rect(gameChar_x-5,gameChar_y-5,10,5)
		fill(0);
		rect(gameChar_x-2.5,gameChar_y-5 ,10,5)
		//hand
		fill(150);
		rect(gameChar_x-2.5,gameChar_y-52,5,20)

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,20,20)
		fill(108, 86, 95);
		rect(gameChar_x-15,gameChar_y-55,30,30)
		fill(200);
		rect(gameChar_x-15,gameChar_y-25,10,15)
		fill(200);
		rect(gameChar_x+5,gameChar_y-25,10,15)
		fill(150);
		rect(gameChar_x-20,gameChar_y-52,5,15)
		fill(150);
		rect(gameChar_x+15,gameChar_y-52,5,15)

	}
	else
	{
		// add your standing front facing code
		//head
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,20,20)
		//body
		fill(108, 86, 95);
		rect(gameChar_x-15,gameChar_y-55,30,30)
		//leg
		fill(200);
		rect(gameChar_x-15,gameChar_y-25,10,20)
		fill(200);
		rect(gameChar_x+5,gameChar_y-25,10,20)
		//shoe
		fill(0);
		rect(gameChar_x-15,gameChar_y-5,10,5)
		fill(0);
		rect(gameChar_x+5,gameChar_y-5 ,10,5)
		//hand
		fill(150);
		rect(gameChar_x-20,gameChar_y-52,5,20)
		fill(150); 
		rect(gameChar_x+15,gameChar_y-52,5,20)

	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds(){
	for (var i = 0; i < clouds.length; i++)
	{
		fill(255,255,255,250)
		ellipse(clouds[i].x_pos,clouds[i].y_pos,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+30,clouds[i].y_pos-10,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+80,clouds[i].y_pos,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+20,clouds[i].y_pos+20,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+60,clouds[i].y_pos+15,clouds[i].size+10,clouds[i].size);
	}
}

// Function to draw mountains objects.
function drawMountains(){
	for (var i = 0; i < mountains.length; i++)
	{ 
		fill(120);
		triangle(mountains[i].x, mountains[i].y,
			mountains[i].x + mountains[i].width, mountains[i].y,
			mountains[i].x + (mountains[i].width / 2), mountains[i].y - mountains[i].height);
		triangle(mountains[i].x+70, mountains[i].y,
			mountains[i].x + mountains[i].width+70, mountains[i].y,
			mountains[i].x + (mountains[i].width / 2)+70, mountains[i].y - mountains[i].height+50);
	}
}

// Function to draw trees objects.
function drawTrees(){
	for (var i = 0; i < trees_x.length; i++)
	{
		fill(80);
		rect(trees_x[i],floorPos_y-150,20,160);
		fill(70,200,0);
		ellipse(trees_x[i]+10,floorPos_y-150,80,80);
		fill(70,200,0);
		ellipse(trees_x[i]+10,floorPos_y-200,120,120);
	}
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
	fill(0);
	rect(t_canyon.x_pos,floorPos_y,t_canyon.width,144);
	fill(100, 155, 255);
	rect(t_canyon.x_pos,floorPos_y+50,t_canyon.width,144);

}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
	if (gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos+t_canyon.width && gameChar_y >= floorPos_y)
	{
		isPlummeting = true;
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
	fill(255, 255, 0);
	ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size);
	fill(255, 215, 0);
	ellipse(t_collectable.x_pos,t_collectable.y_pos,t_collectable.size-10);
	fill(0);
	textSize(12);
	text('$',t_collectable.x_pos-3,t_collectable.y_pos+4);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
	//disappear the collectable
	if (dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size+20)
	{
		t_collectable.isFound = true;
		game_score +=1; 
	}
}

function renderFlagpole()
{
	push()
	strokeWeight(5);
	stroke(180);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	noStroke()
	fill(255, 0, 255);

	if(flagpole.isReached)
	{
		rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
	}
	else
	{
		rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
	}
	
	pop()
}

function checkFlagpole()
{
	var d = abs(gameChar_world_x - flagpole.x_pos);
	if(d < 15 && gameChar_y==floorPos_y)
	{
		flagpole.isReached = true;
		isLeft = false;
		isRight = false;
		winSound.play();
	}
}

function checkPlayerDie()
{
	if(gameChar_y-(height-floorPos_y) > floorPos_y)
	{
		lives -= 1;
		startGame()
	}

}

function createPlatform(x, y, length)
{
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function()
		{
			fill(255, 0, 255);
			rect(this.x, this.y, this.length, 20);
		},
		checkContact: function(gc_x, gc_y)
		{
			if(gc_x > this.x && gc_x < this.x + this.length)
			{
				var d = this.y - gc_y;
				if(d >= 0 && d < 5)
				{
					return true;
				}
			}
			return false;
		}
	}
	return p;
}

function Enemy(x, y, range)
{
	this.x = x;
	this.y = y;
	this.range = range;

	this.currentX = x;
	this.inc = 1;

	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
		}

		else if(this.currentX < this.x)
		{
			this.inc = 1;
		}
	}

	this.draw = function()
	{
		this.update();
		fill(255, 0, 0);
		ellipse(this.currentX, this.y, 20, 20);
	}

	this.checkContact = function(gc_x, gc_y)
	{
			var d = dist(gc_x, gc_y, this.currentX, this.y)

			if(d < 20)
			{
				return true;
			}
		return false;
	}
}

/*
NEXT LEVEL
*/

nextLevel()
{
	
}