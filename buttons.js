/* Lance l'analyse du mot de passe */

$('#analyser').click(function(event){
	if($('#textfield').val()!=""){
		analyse($('#textfield').val());
	}
});

/* Permet de masquer/afficher le mot de passe */

$('#masquer').click(event=>{
	$('#textfield').val("");
	if($('#textfield').attr("type")=="password"){
		$('#textfield').attr("type","text");
		$('#masquer').text("Masquer le mot de passe");
	}else{
		$('#textfield').attr("type","password");
		$('#masquer').text("Afficher le mot de passe");
	}
});

