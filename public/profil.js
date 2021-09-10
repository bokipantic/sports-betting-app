var token = localStorage.getItem("token");
var polja = $("form input");

function izmeniLozinku() {
	var greska = 0;
	for(i=0; i<polja.length; i++) {
		var par = polja[i].parentNode;
		if(polja[i].value.length==0){
			greska++;
			par.classList.add("has-error");
		} else {
			par.classList.remove("has-error");
		}
	}
	if(greska>0) {
		return false;
	}
	var password = $("#nova_lozinka").val();
	var rpt_password = $("#potvrdi_lozinku").val();
	if(password != rpt_password){
		Swal.fire('Upozorenje', 'Lozinke se ne poklapaju', 'error');
		return false; 
	}
	var stara_lozinka = $("#stara_lozinka").val();
	var lozinka = new Lozinka(stara_lozinka, password);
	var json_lozinka = JSON.stringify(lozinka);
	$.post( "https://obrada.in.rs/kladionica/api/izmeniLozinku/"+token, json_lozinka, function(data) {
		if(data.sifra == 0) {
			Swal.fire('Upozorenje', data.poruka, 'error');
		} else {
			Swal.fire('Info', data.poruka, 'success');
			ocisti();
		}
	});
}

function Lozinka(password, rpt_password) {
	this.staralozinka = password;
	this.novalozinka = rpt_password;
}

function ocisti() {
	for(i=0; i<polja.length; i++) {
		polja[i].value = "";
	}
}
