var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
ctx.strokeRect(50,50, 600,50);

function draw(score){
	reset();
	console.log(score);
	ctx.fillStyle="#FF0000";
	if(score > 2.5)
		ctx.fillStyle="#F47200";
	if(score >= 6)
		ctx.fillStyle="#5AE37F";
	if(score >=8)
		ctx.fillStyle="#00FF00";
		
	console.log(ctx.fillStyle);
	x=(score/10)*600;
	ctx.fillRect(50,50,x,50);
	ctx.strokeRect(50,50, 600,50);
}

function reset(){
	ctx.fillStyle="white";
	ctx.fillRect(50,50,600,50);
}