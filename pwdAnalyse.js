var pwd="";

function analyse(mdp){
	var score=0;
	pwd=mdp;
	
	
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
	score = score/10;
	if(score >10) score = 10;
	if(score < 0) score = 0;
	draw((score));
	$('#score').html("<h1>"+score+"/10</h1>");
}

function nbChar(){
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
	return (pwd.length-upper)*2;
}

function isMin(){
	var lower=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if((letter >= "a" && letter <= "z") || (letter >= "A" && letter <="Z")){
			if(letter >= "a" && letter <="z") lower++;
		}
	}
	return (pwd.length-lower)*2;
}

function isNumber(){
	var number=0;
	for(var i = 0 ; i < pwd.length; i++){
		var letter = pwd.substring(i,i+1);
		if(letter >= "0" && letter <= "9"){
			number++;
			console.log(number);
		}
	}
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
	return res*6;
}

function lettresSeules(){
	if(isSymbol() >0 || isNumber()>0)
		return 0;
	return pwd.length;
}

function nombresSeuls(){
	if(isSymbol()>0 || isMaj()>0 || isMin()>0)
		return 0;
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
	return res*3;
}
