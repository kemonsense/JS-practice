/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {
		x_pos: 100,
		width: 100
	};

	collectable = {
		x_pos: 360, 
		y_pos: 370, 
		size: 50
	};

	mountain = {
		x: 600,
		y: floorPos_y,
		height: 320,
		width: 230
	};

	cloud = {
		x_pos: 50, 
		y_pos: 50, 
		size: 50
	};
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height-floorPos_y); //draw some green ground

	  
	//mountain
	fill(120);
	triangle(mountain.x, mountain.y,
		mountain.x + mountain.width, mountain.y,
		mountain.x + (mountain.width / 2), mountain.y - mountain.height);
	triangle(mountain.x+70, mountain.y,
		mountain.x + mountain.width+70, mountain.y,
		mountain.x + (mountain.width / 2)+70, mountain.y - mountain.height+50);

	//tree
	fill(80);
	rect(treePos_x,treePos_y,20,160);
	fill(70,200,0);
	ellipse(treePos_x+10,treePos_y,80,80);
	fill(70,200,0);
	ellipse(treePos_x+10,treePos_y-50,120,120);

	//character
	fill(108, 86, 61);
	ellipse(gameChar_x,gameChar_y-65,20,20);
	fill(108, 86, 95);
	rect(gameChar_x-15,gameChar_y-55,30,30);
	fill(50);
	rect(gameChar_x-15,gameChar_y-25,10,20);
	fill(50);
	rect(gameChar_x+5,gameChar_y-25,10,20);
	fill(150);
	rect(gameChar_x-20,gameChar_y-52,5,20);
	fill(150);
	rect(gameChar_x+15,gameChar_y-52,5,20);

	//canyon
	fill(0);
	rect(canyon.x_pos,floorPos_y,canyon.width,144);
	fill(100, 155, 255);
	rect(canyon.x_pos,floorPos_y+50,canyon.width,144);

	//collectable
	fill(255, 255, 0);
	ellipse(collectable.x_pos,collectable.y_pos,collectable.size);
	fill(255, 215, 0);
	ellipse(collectable.x_pos,collectable.y_pos,collectable.size-10);
	fill(0)
	text('$',collectable.x_pos-3,collectable.y_pos+4);

	//cloud
	fill(255,255,255,250)
	ellipse(cloud.x_pos,cloud.y_pos,cloud.size+10,cloud.size);
	ellipse(cloud.x_pos+30,cloud.y_pos-10,cloud.size+10,cloud.size);
	ellipse(cloud.x_pos+80,cloud.y_pos,cloud.size+10,cloud.size);
	ellipse(cloud.x_pos+20,cloud.y_pos+20,cloud.size+10,cloud.size);
	ellipse(cloud.x_pos+60,cloud.y_pos+15,cloud.size+10,cloud.size);

}

function mousePressed()
{
	gameChar_x = mouseX;
	gameChar_y = mouseY;


}
