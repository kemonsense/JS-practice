/*

The Game Project 4 - Side scrolling

Week 6

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;

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

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;

	// Variable to control the background scrolling.
	scrollPos = 0;

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
		{x_pos: 900, width: 80},
	];
	collectables = [
		{x_pos: 160, y_pos: 370, size: 50},
		{x_pos: 560, y_pos: 370, size: 50},
	];
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

	push();
	translate(scrollPos,0);

	// Draw clouds.
	for (var i = 0; i < clouds.length; i++)
	{
		fill(255,255,255,250)
		ellipse(clouds[i].x_pos,clouds[i].y_pos,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+30,clouds[i].y_pos-10,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+80,clouds[i].y_pos,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+20,clouds[i].y_pos+20,clouds[i].size+10,clouds[i].size);
		ellipse(clouds[i].x_pos+60,clouds[i].y_pos+15,clouds[i].size+10,clouds[i].size);
	}

	// Draw mountains.
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
	

	// Draw trees.
	for (var i = 0; i < trees_x.length; i++)
	{
		fill(80);
		rect(trees_x[i],floorPos_y-150,20,160);
		fill(70,200,0);
		ellipse(trees_x[i]+10,floorPos_y-150,80,80);
		fill(70,200,0);
		ellipse(trees_x[i]+10,floorPos_y-200,120,120);
	}
	

	// Draw canyons
	for (var i = 0; i < canyons.length; i++)
	{
		fill(0);
		rect(canyons[i].x_pos,floorPos_y,canyons[i].width,144);
		fill(100, 155, 255);
		rect(canyons[i].x_pos,floorPos_y+50,canyons[i].width,144);

	}
	

	// Draw collectable items
	for (var i = 0; i < collectables.length; i++)
	{
		fill(255, 255, 0);
		ellipse(collectables[i].x_pos,collectables[i].y_pos,collectables[i].size);
		fill(255, 215, 0);
		ellipse(collectables[i].x_pos,collectables[i].y_pos,collectables[i].size-10);
		fill(0)
		text('$',collectables[i].x_pos-3,collectables[i].y_pos+4);

	}

	pop();
	
	// Draw the game character - this must be last
	//head
	fill(108, 86, 61);
	ellipse(gameChar_x,gameChar_y-65,20,20)
	//body
	fill(108, 86, 95);
	rect(gameChar_x-15,gameChar_y-55,30,30)
	//leg
	fill(120);
	rect(gameChar_x-15,gameChar_y-25,10,20)
	fill(120);
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
	

	//////// Game character logic ///////
	// Logic to move

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
}

function keyPressed()
{

	if(key == 'A' || keyCode == 37)
	{
		isLeft = true;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = true;
	}

}

function keyReleased()
{
	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}
}
