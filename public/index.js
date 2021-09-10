var token = localStorage.getItem("token");
var timovi = [];
var utakmice = [];
var ukupna_kvota;

$(document).ready(function () {
	ucitajTimove();
});

function ucitajTimove() {
	$.getJSON("https://obrada.in.rs/kladionica/api/ucitajTimove/" + token, function (json) {
		$.each(json, function (key, value) {
			timovi[value.id] = value.naziv_tima;
		});
		ucitajUtakmice();
	});
}

function ucitajUtakmice() {
	$.getJSON("https://obrada.in.rs/kladionica/api/ucitajUtakmice/" + token, function (json) {
		$("#dostupne_utakmice tbody").empty();
		$.each(json, function (key, value) {
			if (value.rezultat == null) {
				utakmice.push(value);
				$("#dostupne_utakmice tbody").append("<tr><td>" + timovi[value.tim1] + "</td><td>" + timovi[value.tim2] + "</td><td><button class='btn btn-xs btn-primary' onclick='igrajUtakmicu(" + value.id + ", 1)'> <span class='badge'>" + value.kvota1 + "</span></button></td><td><button class='btn btn-xs btn-primary' onclick='igrajUtakmicu(" + value.id + ", 3)'> <span class='badge'>" + value.kvotax + "</span></button></td><td><button class='btn btn-xs btn-primary' onclick='igrajUtakmicu(" + value.id + ", 2);'> <span class='badge'>" + value.kvota2 + "</span></button></td></tr>");
			}
		});
		ucitajTiket();
	});
}

function Par(utakmica_id, tip) {
	this.utakmica_id = utakmica_id;
	this.tip = tip;
}

function igrajUtakmicu(utakmica_id, tip) {
	var tiket = localStorage.getItem("tiket");
	var par = new Par(utakmica_id, tip);
	var izmena = 0;
	if (tiket == null) {
		var tiket_niz = [];
		tiket_niz.push(par);
		localStorage.setItem("tiket", JSON.stringify(tiket_niz));
	} else {
		var tiket_niz = JSON.parse(tiket);
		$.each(tiket_niz, function (key, value) {
			if (value.utakmica_id == utakmica_id) {
				tiket_niz.splice(key, 1, par);
				izmena++;
			}
		});
		if (izmena == 0) {
			tiket_niz.push(par);
		}
		localStorage.setItem("tiket", JSON.stringify(tiket_niz));
	}
	ucitajTiket();
}

function potencijalniDobitak(uplata) {
	var potencijalni_dobitak = Math.round((uplata * ukupna_kvota) * 100 / 100);
	$("#potencijalni_dobitak").html(potencijalni_dobitak + " rsd");
}

function ucitajTiket() {
	var tiket = localStorage.getItem("tiket");
	if (tiket == null) {
		$("#prazan_tiket").show();
		$("#tiket").hide();
		$("#prazan_tiket").html("<h4><b>Prazan tiket</b></h4>");
		return;
	}
		var tiket_niz = JSON.parse(tiket);
		if (tiket_niz.length == 0) {
			$("#prazan_tiket").show();
			$("#tiket").hide();
			$("#prazan_tiket").html("<h4><b>Prazan tiket</b></h4>");
		} else {
		$("#prazan_tiket").hide();
		$("#tiket").show();
		$("#odigrane_utakmice tbody").empty();
		ukupna_kvota = 1;
		$.each(tiket_niz, function (key, value) {
			var utakmica = utakmice.find(mec => mec.id == value.utakmica_id);
			if (value.tip == 3) {
				var tip_za_tabelu = "X";
			} else {
				var tip_za_tabelu = value.tip;
			}
			switch (value.tip) {
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
			$("#odigrane_utakmice tbody").append("<tr><td>" + timovi[utakmica.tim1] + "</td><td>" + timovi[utakmica.tim2] + "</td><td>" + tip_za_tabelu + "</td><td>" + kvota + "</td><td><button onclick='obrisiUtakmicuIzTiketa(" + utakmica.id + ");' class='btn btn-xs btn-danger'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></td></tr>");
		});
		$("#ukupna_kvota").html("Ukupna kvota: " + Math.round(ukupna_kvota * 100) / 100);
	}
}

function obrisiUtakmicuIzTiketa(id) {
	var tiket = localStorage.getItem("tiket");
	var tiket_niz = JSON.parse(tiket);
	var skraceni_tiket = tiket_niz.filter(obj => obj.utakmica_id != id);
	if (skraceni_tiket.length == 0) {
		localStorage.removeItem("tiket");
	} else {
		localStorage.setItem("tiket", JSON.stringify(skraceni_tiket));
	}
	ucitajTiket();	
}

function uplata() {
	var uplata = $("#uplata").val();
	var tiket = localStorage.getItem("tiket");
	if (uplata.length == 0) {
		Swal.fire("Upozorenje", "Unesite uplatu!", "error");
	} else {
		if (tiket == null) {
			Swal.fire("Upozorenje", "Nema parova!", "error");
		} else {
			var niz_za_slanje = {};
			niz_za_slanje['uplata'] = uplata;
			niz_za_slanje['utakmice'] = JSON.parse(tiket);
			var niz_za_slanje_json = JSON.stringify(niz_za_slanje);
			$.post("https://obrada.in.rs/kladionica/api/uplatiTiket/" + token, niz_za_slanje_json, function (json) {
				if (json.sifra == 1) {
					Swal.fire("Info", json.poruka, "success");
					localStorage.removeItem("tiket");
					$("#uplata").val("");
					$("#myModal").modal("hide");
					$("#potencijalni_dobitak").html("0 rsd");
					ucitajTiket();
				} else {
					Swal.fire("Upozorenje", json.poruka, "error");
				}
			});
		}
	}
}