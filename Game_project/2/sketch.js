/*

The Game Project

2 - Game character

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the different states of your game character.

Write the code so that your character appears inside the box for each
state.

IMPORTANT: For each box the variables gameChar_x & gameChar_y are set to the bottom
center of the box. You must combine these variables with arithmetic to
determine the position of each shape that you draw. This will later allow
you to adjust the position of your game character.

Each state is worth two marks:

//standing front facing = 2
//jumping facing forwards = 2
//walking left = 2
//walking right = 2
//jumping left and jumping right = 2

0 marks = not a reasonable attempt
1 mark = attempted but it lacks detail and you didn't use gameChar_x and gameChar_y correctly
2 marks = you've used a selction of shape functions and made consistent use of gameChar_x and gameChar_y

WARNING: Do not get too carried away. If you're character takes more than 5 lines
of code to draw then you've probably over done it.

** Only submit your sketch.js **

*/

var gameChar_x = 0;
var gameChar_y = 0;

function setup()
{
	createCanvas(400, 600);
}

function draw()
{
	background(255);

	//Standing, facing frontwards

	stroke(100);
	noFill();
	rect(20, 60, 50, 80);
	noStroke();
	fill(0);
	text("1. standing front facing", 20, 160);

	gameChar_x = 45;
	gameChar_y = 137;
	//Add your code here ...
	//head
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


	//Jumping facing forwards
	stroke(100);
	noFill();
	rect(220, 60, 50, 80);
	noStroke();
	fill(0);
	text("2. jumping facing forwards", 220, 160);

	gameChar_x = 245;
	gameChar_y = 137;
	//Add your code here ...
	fill(108, 86, 61);
	ellipse(gameChar_x,gameChar_y-65,20,20)
	fill(108, 86, 95);
	rect(gameChar_x-15,gameChar_y-55,30,30)
	fill(120);
	rect(gameChar_x-15,gameChar_y-25,10,15)
	fill(120);
	rect(gameChar_x+5,gameChar_y-25,10,15)
	fill(150);
	rect(gameChar_x-20,gameChar_y-52,5,15)
	fill(150);
	rect(gameChar_x+15,gameChar_y-52,5,15)


	//Walking, turned left
	stroke(100);
	noFill();
	rect(20, 260, 50, 80);
	noStroke();
	fill(0);
	text("3. Walking left", 20, 360);

	gameChar_x = 45;
	gameChar_y = 337;
	//Add your code here ...
	//head
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,15,20)
		//body
		fill(108, 86, 95);
		rect(gameChar_x-10,gameChar_y-55,20,30)
		//leg
		fill(120);
		rect(gameChar_x-5,gameChar_y-25,10,20)
		fill(120);
		rect(gameChar_x-7.5,gameChar_y-25,10,15)
		//shoe
		fill(0);
		rect(gameChar_x-5,gameChar_y-5,10,5)
		fill(0);
		rect(gameChar_x-2.5,gameChar_y-5 ,10,5)
		//hand
		fill(150);
		rect(gameChar_x-2.5,gameChar_y-52,5,20)

	// fill(150);
	// rect(gameChar_x+15,gameChar_y-52,5,20)


	//Walking, turned right
	stroke(100);
	noFill();
	rect(220, 260, 50, 80);
	noStroke();
	fill(0);
	text("4. Walking right", 220, 360);

	gameChar_x = 245;
	gameChar_y = 337;
	//Add your code here ...
	//head
		fill(108, 86, 61);
		ellipse(gameChar_x,gameChar_y-65,15,20)
		//body
		fill(108, 86, 95);
		rect(gameChar_x-10,gameChar_y-55,20,30)
		//leg
		fill(120);
		rect(gameChar_x-5,gameChar_y-25,10,20)
		fill(120);
		rect(gameChar_x-2.5,gameChar_y-25,10,15)
		//shoe
		fill(0);
		rect(gameChar_x-5,gameChar_y-5,10,5)
		fill(0);
		rect(gameChar_x-2.5,gameChar_y-5 ,10,5)
		//hand
		fill(150);
		rect(gameChar_x-2.5,gameChar_y-52,5,20)
	// fill(150);
	// rect(gameChar_x+15,gameChar_y-52,5,20)


	//Jumping right
	stroke(100);
	noFill();
	rect(20, 460, 50, 80);
	noStroke();
	fill(0);
	text("5. Jumping to the right", 20, 560);

	gameChar_x = 45;
	gameChar_y = 537;
	//Add your code here ...
	fill(108, 86, 61);
	ellipse(gameChar_x,gameChar_y-65,15,20)
	fill(108, 86, 95);
	rect(gameChar_x-10,gameChar_y-55,20,30)
	fill(120);
	rect(gameChar_x-5,gameChar_y-25,10,15)
	fill(120);
	rect(gameChar_x-2.5,gameChar_y-25,10,10)
	fill(150);
	rect(gameChar_x-2.5,gameChar_y-52,5,15)
	// fill(150);
	// rect(gameChar_x+15,gameChar_y-52,5,20)



	//Jumping to the left
	stroke(100);
	noFill();
	rect(220, 460, 50, 80);
	noStroke();
	fill(0);
	text("6. Jumping to the left", 220, 560);

	gameChar_x = 245;
	gameChar_y = 537;
	//Add your code here ...
	fill(108, 86, 61);
	ellipse(gameChar_x,gameChar_y-65,15,20)
	fill(108, 86, 95);
	rect(gameChar_x-10,gameChar_y-55,20,30)
	fill(120);
	rect(gameChar_x-5,gameChar_y-25,10,15)
	fill(120);
	rect(gameChar_x-7.5,gameChar_y-25,10,10)
	fill(150);
	rect(gameChar_x-2.5,gameChar_y-52,5,15)
	// fill(150);
	// rect(gameChar_x+15,gameChar_y-52,5,20)

}
