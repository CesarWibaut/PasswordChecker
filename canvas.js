var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
ctx.strokeRect(50,50, 600,50);


/* Remplit la jauge en fonction du score et affiche les conseils pour un meilleur
mot de passe */

function draw(score){
	if(problems.length >1){
		problems.sort();
		var problemsSolved = new Array();
		for(var r = 0; r<problems.length; r++){
			if(!problemsSolved.includes(problems[r])) problemsSolved.push(problems[r]);
		}
		var allAdvice = "<h3><strong>Conseils :</strong></h3><br>";
		for(var r = 0 ; r<problemsSolved.length; r++){
			allAdvice += "<h4>"+advice[problemsSolved[r]] + "<h4>";
		}
		$("#problems").html(allAdvice);
	}
	
	reset();
	ctx.fillStyle="#FF0000";
	if(score > 2.5)
		ctx.fillStyle="#F47200";
	if(score >= 6)
		ctx.fillStyle="#5AE37F";
	if(score >=8)
		ctx.fillStyle="#00FF00";
		
	x=(score/10)*600;
	ctx.fillRect(50,50,x,50);
	ctx.strokeRect(50,50, 600,50);
}

/* Remet la jauge à 0 */

function reset(){
	ctx.fillStyle="white";
	ctx.fillRect(50,50,600,50);
}
