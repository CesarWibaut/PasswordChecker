var pwd="";

var scoreAjax=0;
var advice = new Array();

advice.push("Mot de passe trop court !");
advice.push("Pas assez de majuscule !");
advice.push("Pas assez de minuscule !");
advice.push("Pas assez de nombre !");
advice.push("Pas assez de symbole !");
advice.push("Uniquement des lettres !");
advice.push("Uniquement des nombres !");
advice.push("Trop de répétition !");
advice.push("Trop de majuscules consécutives !");
advice.push("Trop de minuscules consécutives !");
advice.push("Trop de nombres consécutifs !");
advice.push("<strong>Votre mot de passe est souvent utilisé !</strong>");

var problems = new Array();

function analyse(mdp){
	var score=0;
	pwd=mdp;
	scoreAjax=0;
	
	score+=nbChar();
	score+=isMaj();
	score+=isMin();
	score+=isNumber();
	score+=isSymbol();
	score-=lettresSeules();
	score-=nombresSeuls();
	score-=repetitionChar();
	score-=consecutiveMaj();
	score-=consecutiveMin();
	score-=consecutiveNumber()
	doRequest(score);
	// $.when(doRequest()).done(function(){
		// score -= scoreAjax;
	// });
	
}

function nbChar(){
	if(pwd.length < 5)
		problems.push(0);
	return pwd.length*5;
}

function isMaj(){
	var upper=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if((letter >= "a" && letter <= "z") || (letter >= "A" && letter <="Z")){
			if(letter >= "A" && letter <="Z") upper++;
		}
	}
	if(upper < 1)
		problems.push(1);
	return (pwd.length-upper)*3;
}

function isMin(){
	var lower=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if((letter >= "a" && letter <= "z") || (letter >= "A" && letter <="Z")){
			if(letter >= "a" && letter <="z") lower++;
		}
	}
	if(lower < 3)
		problems.push(2);
	return (pwd.length-lower)*2;
}

function isNumber(){
	var number=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if(letter >= "0" && letter <= "9"){
			number++;
		}
	}
	if(number < 1)
		problems.push(3);
	return number*4;
}

function isSymbol(){
	var res=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if(!(letter >= "0" && letter <= "9")){
			if(!(letter >= "a" && letter <= "z") && !(letter >= "A" && letter <="Z")){
				res++;
			}
		}
	}
	if(res < 1)
		problems.push(4);
	return res*7;
}

function lettresSeules(){
	if(isSymbol() >0 || isNumber()>0)
		return 0;
	problems.push(5);
	return pwd.length;
}

function nombresSeuls(){
	if(isSymbol()>0 || isMaj()>0 || isMin()>0){
		return 0;
	}
	problems.push(6);
	return pwd.length;
}

function repetitionChar(){
	var map = new Map();
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if(!(letter >= "a" && letter <= "z") || !(letter >= "A" && letter <="Z")){
			if(map.get(letter)==null) map.set(letter,1);
			else map.set(letter, map.get(letter)+1);
		}
	}
	var res = 0;
	for(var v of map.values()){
		if(v!=1){
			res+=v;
		}
	}
	if(res > 3)
		problems.push(7);
	return res*3;
}


function consecutiveMaj(){
	var res=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if((letter >= "a" && letter <= "z") || (letter >= "A" && letter <="Z")){
			if(letter >= "A" && letter <="Z"){
				while(letter >="A" && letter <="Z" && i < pwd.length){
					res++;
					i++;
					var letter = pwd.substring(i,i+1);
				}
			}
		}
	}
	if(res > 2)
		problems.push(8);
	return res*3;
}

function consecutiveMin(){
	var res=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if((letter >= "a" && letter <= "z") || (letter >= "A" && letter <="Z")){
			if(letter >= "a" && letter <="z"){
				while(letter >="a" && letter <="z" && i < pwd.length){
					res++;
					i++;
					var letter = pwd.substring(i,i+1);
				}
			}
		}
	}
	if(res > 3)
		problems.push(9);
	return res*3;
}

function consecutiveNumber(){
	var res=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if(letter >= "0" && letter <="9"){
			while(letter >="0" && letter <="9" && i < pwd.length){
				res++;
				i++;
				var letter = pwd.substring(i,i+1);
			}
		}
	}
	if(res > 3)
		problems.push(10);
	return res*3;
}

function doRequest(score){
	$.ajax({
		url: "https://api.pwnedpasswords.com/pwnedpassword/"+pwd,
		timeout: 2000,
		success :function(data){
			problems.push(11);
			score =0;
			finAnalyse(score);
		},
		error : function(one, two, three){
			finAnalyse(score);
		}
	});

}


function finAnalyse(score){
	score = score/10;
	if(score >10) score = 10;
	if(score < 0) score = 0;
	draw((score));
	$('#score').html("<h1><strong>"+score+"/10</strong></h1>");
	problems=new Array();
}
