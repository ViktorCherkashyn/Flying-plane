var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

var aircraft = new Image();
var mountainUp = new Image();
var mountainBottom = new Image();
var bg = new Image();
var fg = new Image();

var fly = new Audio();
var score_audio = new Audio();
var lose = new Audio();

fly.src = "music/fly.mp3";
score_audio.src = "music/score.mp3";
lose.src = "music/lose.mp3";

aircraft.src = "images/aircraft.png";	
bg.src = "images/clouds.png";	
mountainBottom.src = "images/mountain2.png";	
mountainUp.src = "images/mountian1.png";
fg.src = "images/fg.png";
var gap = 250; 

document.addEventListener("keydown", moveUp);
	function moveUp(){
		yPos -= 25;
		fly.play();
	}

	var mounth = [];
   
		mounth[0] = {
			x : cvs.width,
			y : 0
		} 
var score = 0;
var xPos = 80;
var yPos = 300;
var grav = 1.5;


function draw() {
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < mounth.length; i++){
		ctx.drawImage(mountainUp, mounth[i].x, mounth[i].y); 
		ctx.drawImage(mountainBottom, mounth[i].x, mounth[i].y + mountainUp.height + gap); 

		mounth[i].x--;
		if(mounth[i].x == 100){
			mounth.push({
				x : cvs.width,
				y : Math.floor(Math.random() * mountainUp.height) - mountainUp.height
			});
		}

		if(xPos + aircraft.width >= mounth[i].x
			&& xPos <= mounth[i].x + mountainUp.width
			&& (yPos <= mounth[i].y + mountainUp.height
				|| yPos + aircraft.height >= mounth[i].y + mountainUp.height + gap)
				|| yPos + aircraft.height >= cvs.height - fg.height){
			lose.play();

          function reload() {
           location.reload();
          }

           setTimeout(reload,1000);

		}

		if(mounth[i].x==5) {
			score++;
			score_audio.play();
		}
	}

	ctx.drawImage(fg, 0, cvs.height - fg. height, 960,150);
	ctx.drawImage(aircraft, xPos, yPos, ); 
	yPos += grav;
	ctx.fillStyle = "#000";
	ctx.font = "30px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);
	requestAnimationFrame(draw);
}

mountainBottom.onload = draw;
