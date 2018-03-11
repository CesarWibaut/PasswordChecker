$('#analyser').click(function(event){
	if($('#textfield').val()!=""){
		console.log("Analyse");
		analyse($('#textfield').val());
	}
});


$('#masquer').click(event=>{
	if($('#textfield').attr("type")=="password"){
		$('#textfield').attr("type","text");
		$('#masquer').text("Masquer le mot de passe");
	}else{
		$('#textfield').attr("type","password");
		$('#masquer').text("Afficher le mot de passe");
	}
});

