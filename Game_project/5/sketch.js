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

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
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
	trees_x = [100, 300, 500, 900];
	clouds = [
		{x_pos: 50, y_pos: 50, size: 50},
		{x_pos: 350, y_pos: 110, size: 50},
		{x_pos: 850, y_pos: 70, size: 50}
	];
	mountains = [
		{x: 100, y: floorPos_y, height: 120, width: 130},
		{x: 600, y: floorPos_y, height: 220, width: 130}
	];
	canyons = [
		{x_pos: 100, width: 100},
		{x_pos: 700, width: 80},
		{x_pos: 900, width: 100},
		{x_pos: 1200, width: 80},
	];
	collectables = [
		{x_pos: 160, y_pos: 370, size: 50, isFound: false},
		{x_pos: 560, y_pos: 370, size: 50, isFound: false},
		{x_pos: 860, y_pos: 370, size: 50, isFound: false},
	];
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	push();
	translate(scrollPos,0);

	// Draw clouds.
	drawClouds();

	// Draw mountains.
	drawMountains();

	// Draw trees.
	drawTrees();

	// Draw canyons.
	for (var i = 0; i < canyons.length; i++)
	{
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
		// console.log(isPlummeting)
		// console.log(gameChar_world_x)
	};

	if (isPlummeting == true)
	{
		gameChar_y +=5;
	}

	// Draw collectable items.
	for (var i = 0; i < collectables.length; i++)
	{
		checkCollectable(collectables[i]);

		if(collectables[i].isFound == false)
		{
			drawCollectable(collectables[i]);
		}
	};

	pop();

	// Draw game character.
	drawGameChar();

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
		gameChar_y +=2;
		isFalling = true; 
	}
	else
	{
		isFalling = false; 
	}

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){

	//left arrow press
	if (keyCode == 37)
	{
		isLeft = true;
		// console.log('left '+isLeft);
	}

	//right arrow press
	else if (keyCode == 39)
	{
		isRight = true;
		// console.log('right '+isRight);
	}

	//spacebar pressed
	else if (keyCode == 32)
	{
		isFalling = true;
		// console.log('jumping  '+isFalling);
		if (isFalling && gameChar_y>=floorPos_y)
		{
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
	if (gameChar_world_x > t_canyon.x_pos && gameChar_world_x < t_canyon.x_pos+t_canyon.width)
	{
		isPlummeting = true;
	}
	else
	{
		isPlummeting = false;
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
	fill(0)
	text('$',t_collectable.x_pos-3,t_collectable.y_pos+4);
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
	//disappear the collectable
	if (dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos)<70)
	{
		t_collectable.isFound = true; 
	}
}
