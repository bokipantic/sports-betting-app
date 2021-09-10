var token = localStorage.getItem("token");
var timovi = [];
var utakmice = [];
var tiketi = [];

$(document).ready(function () {
	ucitajTimove();
});

function ucitajTimove() {
	$.getJSON("http://obrada.in.rs/kladionica/api/ucitajTimove/" + token, function (json) {
		$.each(json, function (key, value) {
			timovi[value.id] = value.naziv_tima;
		});
		ucitajUtakmice();
	});
}

function ucitajUtakmice() {
	$.getJSON("http://obrada.in.rs/kladionica/api/ucitajUtakmice/" + token, function (json) {
		$("#dostupne_utakmice tbody").empty();
		$.each(json, function (key, value) {
			utakmice.push(value);
			$("#dostupne_utakmice tbody").append("<tr><td>" + timovi[value.tim1] + "</td><td>" + timovi[value.tim2] + "</td><td><button class='btn btn-xs btn-primary' onclick='igrajUtakmicu(" + value.id + ", 1);'>Igraj  <span class='badge'>" + value.kvota1 + "</span></button></td><td><button class='btn btn-xs btn-primary' onclick='igrajUtakmicu(" + value.id + ", 2);'>Igraj  <span class='badge'>" + value.kvota2 + "</span></button></td><td><button class='btn btn-xs btn-primary' onclick='igrajUtakmicu(" + value.id + ", 3);'>Igraj  <span class='badge'>" + value.kvotax + "</span></button></td></tr>");
		});
		ucitajTikete();
	});
}

function ucitajTikete() {
	var zavrseni_tiketi = 0;
	var ukupan_dobitak = 0;
	var ukupna_uplata = 0;
	$.getJSON("http://obrada.in.rs/kladionica/api/ucitajTikete/" + token, function (response) {
		// console.log(response);
		$("#tiketi").empty();
		$.each(response, function (key, value) {
			tiketi.push(value);
			var utakmica_u_igri = 0;
			var promasaj = 0;
			var pogodak = 0;
			var ukupna_kvota = 1;
			$.each(value.parovi, function (key, val) {
				var utakmica = utakmice.find(u => u.id == val.utakmica_id);
				if (utakmica.rezultat == null) {
					utakmica_u_igri ++;
				} else if (utakmica.rezultat == val.igra) {
					pogodak ++;
				} else {
					promasaj ++;
				}
				switch (+val.igra) {
					case 1:
						var kvota = utakmica.kvota1;
						break;
					case 2:
						var kvota = utakmica.kvota2;
						break;
					case 3:
						var kvota = utakmica.kvotax;
						break;
					default:
						var kvota = "Greska";
				}
				ukupna_kvota *= +kvota;
			});
			if (utakmica_u_igri > 0) {
				var boja_tiketa = "alert alert-info";
				var status_tiketa = "Tiket je aktivan, nisu zavrsene sve utakmice.";
			} else if (promasaj > 0) {
				var boja_tiketa = "alert alert-danger";
				var status_tiketa = "Tiket je pao, zao nam je.";
				zavrseni_tiketi ++;
				ukupna_uplata += +value.uplata;
			} else {
				var boja_tiketa = "alert alert-success";
				var status_tiketa = "Tiket je prosao, cestitamo!";
				zavrseni_tiketi ++;
				var dobitak = Math.round(ukupna_kvota * value.uplata);
				ukupan_dobitak += dobitak;
				ukupna_uplata += +value.uplata;
			}
			$("#tiketi").append('<div class="well text-center"> <h3>Tiket ID: ' + value.tiket_id + '</h3> <br> <div class="row"> <div class="col-lg-6 col-xs-12"> <p>Broj odigranih utakmica: <span id="odigrane_utakmice">' + value.parovi.length + '</span></p> <p>Uplata: <span id="">' + value.uplata + ' RSD</span></p> <p>Datum i vreme uplate: <span id="datum_i_vreme_uplate">' + value.vreme_uplate + '</span></p> </div> <div class="col-lg-6 col-xs-12"> <div class="' + boja_tiketa + '">' + status_tiketa + '</div> <button class="btn btn-primary btn-block" onclick="otvoriModal(' + value.tiket_id + ')">Detalji</button> </div> </div> </div>');
		});
		$("#ukupno_tiketa").html(response.length);
		$("#ukupno_zavrsenih_tiketa").html(zavrseni_tiketi);
		$("#ukupna_uplata").html(ukupna_uplata);
		$("#ukupan_dobitak").html(ukupan_dobitak);
		var bilans = ukupan_dobitak - ukupna_uplata;
		$("#bilans").html(bilans);
		$("#bilans").css('color', bilans > 0 ? 'blue' : 'red');
	});
}

function otvoriModal(tiket_id) {
	$("#myModal").modal("show");
	var tiket = tiketi.find(t => t.tiket_id == tiket_id);
	$("#uplata").html(tiket.uplata + " rsd");
	$("table tbody").empty();
	var ukupna_kvota = 1;
	var utakmica_u_igri = 0;
	var promasaj = 0;
	var pogodak = 0;
	$.each(tiket.parovi, function (key, value) {
		var utakmica = utakmice.find(u => u.id == value.utakmica_id);
		if (utakmica.rezultat == null) {
			utakmica_u_igri ++;
			var boja = "info";
		} else if (utakmica.rezultat == value.igra) {
			pogodak ++;
			boja = "success";
		} else {
			promasaj ++;
			boja = "danger";;
		}
		if (value.igra == 3) {
			var tip_za_tabelu = "X";
		} else {
			var tip_za_tabelu = value.igra;
		}
		switch (+value.igra) {
			case 1:
				var kvota = utakmica.kvota1;
				break;
			case 2:
				var kvota = utakmica.kvota2;
				break;
			case 3:
				var kvota = utakmica.kvotax;
				break;
			default:
				var kvota = "Greska";
		}
		ukupna_kvota *= +kvota;
		$("#ukupna_kvota").html(Math.round(ukupna_kvota * 100) / 100);
		$("#potencijalna_isplata").html(Math.round(ukupna_kvota * tiket.uplata * 100) / 100 + " rsd");
		$("table tbody").append('<tr class="' + boja + '"><td>' + timovi[utakmica.tim1] + '</td><td>' + timovi[utakmica.tim2] + '</td><td>' + tip_za_tabelu + '</td><td>' + kvota + '</td></tr>');
	});
	if (utakmica_u_igri > 0) {
		$("#status_tiketa").html("AKTIVAN");
	} else if (promasaj > 0) {
		$("#status_tiketa").html("GUBITAN");
	} else {
		$("#status_tiketa").html("DOBITAN");
	}
}